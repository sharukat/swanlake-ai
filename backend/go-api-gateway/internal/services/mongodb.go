package services

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	m "github.com/sharukat/swanlake/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDBHandler struct {
	Client   *mongo.Client
	Database string
}

func initMongoClient() *mongo.Client {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URL"))
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("failed to ping MongoDB: ", err)
	}
	return client
}

func InitDB() *MongoDBHandler {
	client := initMongoClient()
	return &MongoDBHandler{
		Client:   client,
		Database: os.Getenv("MONGODB_NAME"),
	}
}

func (h *MongoDBHandler) getCollection(name string) *mongo.Collection {
	return h.Client.Database(h.Database).Collection(name)
}

func (h *MongoDBHandler) GetByName(collectionName, itemName string, r *http.Request) m.BirdDBStruct {
	ch := make(chan m.BirdDBStruct)

	go func(ch chan<- m.BirdDBStruct) {
		collection := h.getCollection(collectionName)
		filter := bson.D{{Key: "Common Name", Value: itemName}}

		var result m.MongoBird
		err := collection.FindOne(r.Context(), filter).Decode(&result)
		if err != nil {
			ch <- m.BirdDBStruct{
				BirdInfo: m.MongoBird{},
				Error:    err,
			}
			return
		}
		ch <- m.BirdDBStruct{
			BirdInfo: result,
			Error:    nil,
		}
	}(ch)
	response := <-ch
	return response
}

func (h *MongoDBHandler) ListBirds(collectionName string, context context.Context) ([]string, error) {
	collection := h.getCollection(collectionName)
	opts := options.Find().SetSort(bson.D{{Key: "Common Name", Value: 1}})
	cursor, err := collection.Find(context, bson.D{}, opts)
	if err != nil {
		return nil, fmt.Errorf("failed to query database: %w", err)
	}
	defer cursor.Close(context)

	var results []m.MongoDBDocument
	if err = cursor.All(context, &results); err != nil {
		return nil, fmt.Errorf("failed to decode results: %v", err)
	}

	var commonNames []string
	for _, result := range results {
		commonNames = append(commonNames, result.CommonName)
	}

	return commonNames, nil
}
