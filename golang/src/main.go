package main

import (
	"context"
	"fmt"
	cdp "github.com/chromedp/chromedp"
	"log"
	"time"
)

func sendRequest(url, username, issuenumber string) {
	selname := `//input[@id="schVltrNm"]`                        // 이름
	selissu := `//input[@id="schIssuNo"]`                        // 발급번호
	restitle := `//div[@class="board_list board_list2 non_sub"]` // 봉사 내역

	contextVar, cancelFunc := cdp.NewContext(
		context.Background(),
		cdp.WithLogf(log.Printf),
	)
	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 30*time.Second) // timeout 값을 설정
	defer cancelFunc()
	contextVar, cancelFunc = cdp.NewContext(contextVar)
	defer cancelFunc()

	var strVar string

	err := cdp.Run(contextVar,
		cdp.Navigate(url),
		cdp.WaitVisible(selissu),
		cdp.SendKeys(selname, username),
		cdp.SendKeys(selissu, issuenumber),
		cdp.Submit(selissu),
		cdp.WaitVisible(restitle),
		cdp.Text(restitle, &strVar, cdp.NodeVisible),
	)
	if err != nil {
		panic(err)
	}

	fmt.Println(strVar)

}

func main() {
	const url = "https://www.1365.go.kr/vols/P9330/srvcgud/cnfrmnIssu.do"
	const userName = "원규진"
	const userIssueNumber = "202321921438_28830864"
	sendRequest(url, userName, userIssueNumber)
}
