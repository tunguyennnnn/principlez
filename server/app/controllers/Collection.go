package controllers

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type CollectionController struct{}

func (u CollectionController) Request(c *gin.Context) {
	fmt.Println(c.Request.Body)
	c.JSON(201, gin.H{"message": "ok"})
}

func (u CollectionController) Index(c *gin.Context) {
	fmt.Println(c)
	c.JSON(200, gin.H{"message": "ok"})
}
