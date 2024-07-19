package main

import (
	"net/http"
)

func main() {
	port := ":8080"
	print("Server started at http://localhost" + port + "\n")
	http.ListenAndServe(port, http.FileServer(http.Dir(".")))
}
