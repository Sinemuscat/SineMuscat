package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/chromedp/chromedp"
	"github.com/rs/cors"
)

type Certificate struct {
	Number string `json:"number"`
}

func SendRequest(url, username, issuenumber string) string {
	selname := `//input[@id="schVltrNm"]`                        // 이름
	selissu := `//input[@id="schIssuNo"]`                        // 발급번호
	restitle := `//div[@class="board_list board_list2 non_sub"]` // 봉사 내역

	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)
	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 30*time.Second) // timeout 값을 설정
	defer cancelFunc()
	contextVar, cancelFunc = chromedp.NewContext(contextVar)
	defer cancelFunc()

	var strVar string

	err := chromedp.Run(contextVar,
		chromedp.Navigate(url),
		chromedp.WaitVisible(selissu),
		chromedp.SendKeys(selname, username),
		chromedp.SendKeys(selissu, issuenumber),
		chromedp.Submit(selissu),
		chromedp.WaitVisible(restitle),
		chromedp.Text(restitle, &strVar, chromedp.NodeVisible),
	)
	if err != nil {
		log.Printf("Error during web scraping: %v\n", err)
		return ""
	}

	return strVar
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	var cert Certificate
	err := json.NewDecoder(r.Body).Decode(&cert)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	const url = "https://www.1365.go.kr/vols/P9330/srvcgud/cnfrmnIssu.do"
	const userName = "원규진"
	result := SendRequest(url, userName, cert.Number)

	cert.Number = result

	// Log the response
	log.Printf("Received request with certificate number: %s\n", cert.Number)

	// Return the result
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(cert); err != nil {
		log.Printf("Error encoding JSON response: %v\n", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api", handleRequest)

	// Use the CORS middleware to handle CORS
	handler := cors.Default().Handler(mux)

	log.Println("Server listening on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("Server error: %v\n", err)
	}
}
