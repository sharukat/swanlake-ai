package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

type HealthStatus string

const (
	StatusHealthy   HealthStatus = "healthy"
	StatusUnhealthy HealthStatus = "unhealthy"
	StatusUnknown   HealthStatus = "unknown"
)

type HealthResponse struct {
	Timestamp       time.Time              `json:"timestamp"`
	GoServerStatus  HealthStatus           `json:"go_server_status"`
	AIServiceStatus HealthStatus           `json:"ai_service_status"`
	RedisStatus     HealthStatus           `json:"redis_status"`
	Details         map[string]interface{} `json:"details,omitempty"`
}

type HealthChecker struct {
	redisClient *redis.Client
	httpClient  *http.Client
}

func (hc *HealthChecker) checkGoServer() HealthStatus {
	return StatusHealthy
}

func (hc *HealthChecker) checkRedis(ctx context.Context) (HealthStatus, error) {
	if hc.redisClient == nil {
		return StatusUnknown, fmt.Errorf("redis client not configured")
	}

	_, err := hc.redisClient.Ping(ctx).Result()
	if err != nil {
		return StatusUnhealthy, fmt.Errorf("redis ping failed: %w", err)
	}
	return StatusHealthy, nil
}

func (hc *HealthChecker) checkAIService(ctx context.Context) (HealthStatus, error) {
	baseUrl := os.Getenv("AI_SERVER_URL")
	if baseUrl == "" {
		return StatusUnknown, fmt.Errorf("AI_SERVER_URL not configured")
	}

	url := baseUrl + "/healthcheck"
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return StatusUnhealthy, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Accept", "application/json")
	req.Header.Set("User-Agent", "health-checker/1.0")
	resp, err := hc.httpClient.Do(req)
	if err != nil {
		return StatusUnhealthy, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		return StatusHealthy, nil
	}

	return StatusUnhealthy, fmt.Errorf("AI service returned status code: %d", resp.StatusCode)
}

func (hc *HealthChecker) healthCheck(ctx context.Context) HealthResponse {
	response := HealthResponse{
		Timestamp: time.Now().UTC(),
		Details:   make(map[string]interface{}),
	}

	// Check Go server
	response.GoServerStatus = hc.checkGoServer()

	// Check AI service
	status, err := hc.checkAIService(ctx)
	response.AIServiceStatus = status
	if err != nil {
		response.Details["ai_service_error"] = err.Error()
	}

	// Check redis
	redisStatus, redisErr := hc.checkRedis(ctx)
	response.RedisStatus = redisStatus
	if redisErr != nil {
		response.Details["redis_error"] = redisErr.Error()
	}

	return response
}

func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")

	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	redisClient := redis.NewClient(&redis.Options{
		Addr:        "http://localhost:6379",
		Password:    "",
		DB:          0,
		DialTimeout: 5 * time.Second,
		ReadTimeout: 3 * time.Second,
	})
	defer redisClient.Close()

	hc := &HealthChecker{
		redisClient: redisClient,
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
	response := hc.healthCheck(ctx)

	statusCode := http.StatusOK
	if response.GoServerStatus == StatusUnhealthy || response.AIServiceStatus == StatusUnhealthy || response.RedisStatus == StatusUnhealthy {
		statusCode = http.StatusServiceUnavailable
	}

	w.WriteHeader(statusCode)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, fmt.Sprintf("Error encoding response: %v", err), http.StatusInternalServerError)
	}
}
