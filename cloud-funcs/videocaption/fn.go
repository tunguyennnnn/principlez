package main

import (
	"encoding/json"
	"io/ioutil"
	"fmt"
	"net/http"
	"net/url"
	"log"
)

const baseURL = "https://www.googleapis.com/youtube/v3"

const ApiKey = ""

// BodyPayload payload of post request
type BodyPayload struct {
	URL string `json:"url"`
}

type Caption struct {
	Id string `json:"id"`
}

type YouTubeCaptions struct {
	Items []Caption `json:"items"`
}

// DownloadCaption download youtube caption
func DownloadCaption (videoID string) string {
	captionListURL := baseURL + "/captions?part=id&videoId=" + videoID + "&key=" + ApiKey
	resp, err := http.Get(captionListURL)
	if (err != nil) {
		panic(err)
	}

	fmt.Println(resp)
	defer resp.Body.Close()
	b, err := ioutil.ReadAll(resp.Body)

	if (err != nil) {
		panic(err)
	}

	fmt.Println(string(b))
	var payload YouTubeCaptions
	err = json.Unmarshal(b, &payload)

	if (err != nil) {
		panic(err)
	}

	captions := payload.Items
	
	if (len(captions) == 0) {
		panic("Not good")
	}
	
	selectedCaptionID := captions[0].Id

	captionLinkURL := baseURL + "/captions/" + selectedCaptionID + "?key=" + ApiKey

	fmt.Println(captionLinkURL)
	return "aaa"
}

// ProcessVideoURL download youtube caption
func ProcessVideoURL (videoURL string) string {	
	urlPart, err := url.Parse(videoURL)
	if err != nil {
		panic(err)
	}
	fmt.Println(urlPart.RawQuery)

	params, err := url.ParseQuery(urlPart.RawQuery)
		if err != nil {
			panic(err)
	}

	videoID := params["v"][0];

	if (videoID == "") {
		panic("Invalid link")
	}

	DownloadCaption(videoID)

	return "abcde"
}

func handleBody(w http.ResponseWriter, r *http.Request) {
	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	
	var payload BodyPayload
	err = json.Unmarshal(b, &payload)
	
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	ProcessVideoURL(payload.URL)

	output, err := json.Marshal(payload)

	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("content-type", "application/json")
	w.Write(output)
}

// VideoCaption get video captions from youtube videos
func VideoCaption(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}
	
	switch r.Method {
	case "GET":
		fmt.Fprintln(w, "Function is Running!")
		return
	case "POST":
		handleBody(w, r)
		return
	default: 
		http.Error(w, "Invalid Verb", http.StatusNotFound)
	}
}

func main() {
	http.HandleFunc("/", VideoCaption)

	fmt.Printf("Starting server for testing HTTP POST...\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
			log.Fatal(err)
	}
}
