package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/chromedp/chromedp"
)

type config struct {
	title          string
	dateOfIssue    string
	activityPeriod string
	serviceTime    string
}

func main() {
	contextVar, cancelFunc := chromedp.NewContext(
		context.Background(),
		chromedp.WithLogf(log.Printf),
	)
	defer cancelFunc()

	contextVar, cancelFunc = context.WithTimeout(contextVar, 30*time.Second) // timeout 값 설정
	defer cancelFunc()

	var res string

	err := chromedp.Run(contextVar, submit("원규진", "20232192142523_62886034", &res))
	if err != nil {
		panic(err)
	}
	fmt.Println(res)
}

func submit(userName string, issueNumber string, res *string) chromedp.Tasks {
	return chromedp.Tasks{
		chromedp.Navigate(`https://www.1365.go.kr/vols/P9330/srvcgud/cnfrmnIssu.do`),
		chromedp.WaitVisible(`//input[@name="schVltrNm"]`),
		chromedp.SendKeys(`//input[@name="schVltrNm"]`, userName),
		chromedp.WaitVisible(`//input[@name="schIssuNo"]`),
		chromedp.SendKeys(`//input[@name="schIssuNo"]`, issueNumber),
		chromedp.Submit(`//input[@name="schVltrNm"]`),
		chromedp.Submit(`//input[@name="schIssuNo"]`),
		chromedp.WaitVisible(`//div[contains(@class, "null"]`),
		chromedp.Text(`(//*//ul[contains(@class, "repo-list")]/li[1]//p)[1]`, res),
		chromedp.Text(`//div[contains(@class, "null"]`, res),
	}
}
