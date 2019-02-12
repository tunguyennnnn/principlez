package models

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/mongodb/mongo-go-driver/mongo"
)

func ConfigDb() (*mongo.Database, error) {
	uri := os.Getenv("MONGO_URL")
	client, err := mongo.NewClient(uri)

	if err != nil {
		return nil, fmt.Errorf("todo: couldn't connect to mongo: %v", err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	err = client.Connect(ctx)

	if err != nil {
		return nil, nil
	}
	todoDB := client.Database("todo")
	return todoDB, nil
}