package routers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tunguyennnnn/web-diff/server/app/controllers"
)

func NewRouter() *gin.Engine {
	router := gin.New()

	api := router.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "ok",
			})
		})
	}

	v1 := api.Group("/v1")
	{
		collectionGroup := v1.Group("/collection")
		{
			collection := new(controllers.CollectionController)
			collectionGroup.POST("/", collection.Request)
			collectionGroup.GET("/", collection.Index)
		}
	}
	return router
}
