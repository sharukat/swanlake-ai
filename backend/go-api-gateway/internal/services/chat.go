package services

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	m "github.com/sharukat/swanlake/internal/models"
	u "github.com/sharukat/swanlake/internal/utilities"
)

func Chat(data m.Input, w http.ResponseWriter) (m.ResponseStruct, error) {
	ch := make(chan m.ResponseStruct)

	go func(ch chan<- m.ResponseStruct) {
		result, err := u.SendAPIRequest(
			"POST",
			os.Getenv("AI_SERVER_URL")+"/ai/chatbot",
			data)
		ch <- m.ResponseStruct{
			Response: result,
			Error:    err}
	}(ch)

	response := <-ch
	if response.Error != nil {
		http.Error(w, fmt.Sprintf("Error: %v", response.Error), http.StatusInternalServerError)
		return m.ResponseStruct{}, errors.New("Error: " + response.Error.Error())
	}
	return response, nil
}
