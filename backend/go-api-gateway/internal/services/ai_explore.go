package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	m "github.com/sharukat/swanlake/internal/models"
)

type response struct {
	Output []byte
	Error  error
}

func assistant(data m.InputData) ([]byte, error) {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal input data: %v", err)
	}

	req, err := http.NewRequest("POST", os.Getenv("AI_SERVER_URL")+"/ai/generate", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}
	return body, nil
}

func AIExplore(collection, item string, dbMaped map[string]string, context string) response {
	ch := make(chan response)

	go func(ch chan<- response) {
		generated_response, err := assistant(m.InputData{
			Collection: collection,
			Item:       item,
			DBData:     dbMaped,
			Context:    context,
		})
		if err != nil {
			ch <- response{
				Output: nil,
				Error:  fmt.Errorf("error fetching from AI service: %v", err),
			}
			return
		}
		ch <- response{
			Output: generated_response,
			Error:  nil,
		}
	}(ch)
	response := <-ch
	return response
}
