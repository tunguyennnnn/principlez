package routers

func Init() {
	router := NewRouter()
	router.Run(":4000")
}
