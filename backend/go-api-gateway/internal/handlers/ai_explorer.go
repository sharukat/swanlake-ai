package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	m "github.com/sharukat/swanlake/internal/models"
	s "github.com/sharukat/swanlake/internal/services"
	u "github.com/sharukat/swanlake/internal/utilities"
)

func AIExplorerHandlerFunc(w http.ResponseWriter, r *http.Request) {
	collectionName := chi.URLParam(r, "collection")
	itemName := chi.URLParam(r, "name")
	generate(w, r, collectionName, itemName)
}

func generate(w http.ResponseWriter, r *http.Request, collection string, item string) {

	// go routine to fetch images
	imageResult := s.GetImages(r)
	if imageResult.Error != nil {
		http.Error(w, fmt.Sprintf("Error fetching bird images: %v", imageResult.Error), http.StatusInternalServerError)
		return
	}

	// go routine to fetch bird info
	db := s.InitDB()
	dbResult := db.GetByName(collection, item, r)
	if dbResult.Error != nil {
		http.Error(w, fmt.Sprintf("Error fetching bird info: %v", dbResult.Error), http.StatusInternalServerError)
		return
	}

	// convert database results struct to map
	dbMaped, err := u.StructToMap(dbResult.BirdInfo)
	if err != nil {
		http.Error(w, fmt.Sprintf("error converting struct to map: %v", dbResult.Error), http.StatusInternalServerError)
		return
	}

	// go routine to fetch context using tavily search
	context := s.TavilySearch(collection, item)

	// go routine to fetch AI response
	llmResponse := s.AIExplore(collection, item, dbMaped, context.Result)
	if llmResponse.Error != nil {
		http.Error(w, fmt.Sprintf("Error fetching assistant response: %v", llmResponse.Error), http.StatusInternalServerError)
		return
	}

	var result map[string]interface{}
	ai_err := json.Unmarshal(llmResponse.Output, &result)
	if ai_err != nil {
		fmt.Printf("failed to unmarshal AI response: %v", ai_err)
	}

	response1, _ := result["response1"].(string)
	response2, _ := result["response2"].(string)

	results := m.CombinedResult{
		Response1: response1,
		Response2: response2,
		Images:    imageResult.Url,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(results); err != nil {
		http.Error(w, fmt.Sprintf("Error encoding response: %v", err), http.StatusInternalServerError)
	}
}
