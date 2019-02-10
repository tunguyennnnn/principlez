package crawler

import (
	"fmt"

	"github.com/gocolly/colly"
)

var DomainList []string = []string{"medium.com", "www.medium.com"}

type MediumArticle struct {
	title   string
	summary string
	author  Author
}

func CrawMediumArticle(url string, options CrawlerOptions) {
	allowDomain := options.allowDomain

	var c *colly.Collector
	if allowDomain {
		c = colly.NewCollector()
	} else {
		c = colly.NewCollector(
			colly.AllowedDomains(DomainList...),
		)
	}
	fmt.Println(c)
}
