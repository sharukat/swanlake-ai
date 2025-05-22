package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"github.com/sharukat/swanlake/internal/routes"
)

type SwanLakeApp struct {
	router http.Handler
}

func NewApp() *SwanLakeApp {
	router := routes.LoadRoutes()

	// Configure CORS
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{os.Getenv("FRONTEND_ADRESS")}, // Allow frontend origin
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Content-Type", "Authorization"},
		AllowCredentials: true,
		Debug:            true, // Set to false in production
	})

	app := &SwanLakeApp{
		router: corsMiddleware.Handler(router),
	}
	return app
}

func (app *SwanLakeApp) Start(ctx context.Context) error {
	server := &http.Server{
		Addr:    ":8080",
		Handler: app.router,
	}
	err := server.ListenAndServe()
	if err != nil {
		log.Panic("Failed to start server: %w", err)
	}
	return nil
}

func main() {
	errEnv := godotenv.Load("../.env")
	if errEnv != nil {
		log.Fatalf("Error loading .env file: %v", errEnv)
	}
	// mongo.ConnectDatabase()
	app := NewApp()
	err := app.Start(context.TODO())
	if err != nil {
		fmt.Println("Failed to start server: ", err)
	}
}
