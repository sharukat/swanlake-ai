package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/sharukat/swanlake/internal/routes"
)

type SwanLakeApp struct {
	router http.Handler
	// rdb    *redis.Client
}

func NewApp() *SwanLakeApp {
	router := routes.LoadRoutes()

	// Configure CORS
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("FRONTEND_ADDRESS")},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            false, // Set to false in production
	})

	app := &SwanLakeApp{
		router: corsMiddleware.Handler(router),
		// rdb:    redis.NewClient(&redis.Options{}),
	}
	return app
}

func (app *SwanLakeApp) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:         ":8080",
		Handler:      app.router,
		IdleTimeout:  60 * time.Second,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 15 * time.Second,
	}

	// if err := app.rdb.Ping(ctx).Err(); err != nil {
	// 	return fmt.Errorf("failed to connect to redis: %w", err)
	// }
	fmt.Println("Starting server on : 8080")

	// Channel to capture server startup errors
	ch := make(chan error, 1)
	go func() {
		err := server.ListenAndServe()
		if err != nil {
			ch <- fmt.Errorf("failed to start server: %w", err)
		}
		close(ch)
	}()

	select {
	case err := <-ch:
		return err
	case <-ctx.Done():
		fmt.Println("Shutdown signal received, starting graceful shutdown...")

		if err := server.Shutdown(context.Background()); err != nil {
			fmt.Printf("Server forced to shutdown: %v\n", err)
			return fmt.Errorf("server shutdown failed: %w", err)
		}
		fmt.Println("Server gracefully stopped")
		return nil
	}
}

func main() {
	if err := godotenv.Load("../.env"); err != nil {
		fmt.Printf("Warning: Error loading .env file: %v\n", err)
	}

	app := NewApp()

	ctx, cancel := signal.NotifyContext(
		context.Background(),
		syscall.SIGTERM,
		syscall.SIGINT,
		syscall.SIGQUIT,
	)
	defer cancel()

	if err := app.Start(ctx); err != nil {
		fmt.Println("Failed to start server: ", err)
		os.Exit(1)
	}
	fmt.Println("Application shutdown complete.")
}
