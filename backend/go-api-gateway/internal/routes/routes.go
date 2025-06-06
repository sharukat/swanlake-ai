package routes

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	h "github.com/sharukat/swanlake/internal/handlers"
	"github.com/sharukat/swanlake/services/mongo"
)

func LoadRoutes() *chi.Mux {
	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	router.Route("/api", loadServiceRoutes)
	return router
}

func loadServiceRoutes(router chi.Router) {
	mongoClient := mongo.InitMongoClient()

	// Handlers
	mongoDBHandler := mongo.InitDB(mongoClient)

	// Routes (from internals)
	router.Get("/mongo/list/{collection}", h.ListBirds)
	router.Post("/chat", h.ChatHandlerFunc)
	router.Get("/generation/{collection}/{name}", h.AIExplorerHandlerFunc)
	router.Get("/healthcheck", h.HealthCheckHandler)

	router.Post("/mongo", mongoDBHandler.Create)

}
