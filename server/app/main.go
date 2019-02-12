package main

import (
	"fmt"
	"os"

	"github.com/tunguyennnnn/web-diff/server/app/models"
	"github.com/tunguyennnnn/web-diff/server/app/routers"
)

func main() {
	_, err := models.ConfigDb()
	if err != nil {
		fmt.Println("Database cannot be connected")
		os.Exit(1)
	}
	routers.Init()
}
