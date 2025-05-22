package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	s "github.com/sharukat/swanlake/internal/services"
)

func ListBirds(w http.ResponseWriter, r *http.Request) {
	name := chi.URLParam(r, "collection")
	db := s.InitDB()
	ctx := r.Context()

	birds, err := db.ListBirds(name, ctx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if len(birds) == 0 {
		http.Error(w, fmt.Sprintf("No birds found in collection: %s", name), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(birds)
}
