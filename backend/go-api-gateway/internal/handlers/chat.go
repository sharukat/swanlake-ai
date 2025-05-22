package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	m "github.com/sharukat/swanlake/internal/models"
	s "github.com/sharukat/swanlake/internal/services"
)

func ChatHandlerFunc(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()

	var data m.Input
	if err := decoder.Decode(&data); err != nil {
		fmt.Println("Error decoding request body:", err)
		http.Error(w, fmt.Sprintf("Error decoding request body: %v", err), http.StatusBadRequest)
		return
	}

	response, errChat := s.Chat(data, w)
	if errChat != nil {
		http.Error(w, fmt.Sprintf("Error: %v", errChat), http.StatusInternalServerError)
	}

	var responseStr string
	err := json.Unmarshal(response.Response, &responseStr)
	if err != nil {
		responseStr = strings.Trim(string(response.Response), "\"")
	}

	fmt.Println("Response from AI service:", string(response.Response))
	finalResponse := struct {
		Response string `json:"response"`
	}{
		Response: responseStr,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(finalResponse); err != nil {
		http.Error(w, fmt.Sprintf("Error encoding response: %v", err), http.StatusInternalServerError)
	}

}
