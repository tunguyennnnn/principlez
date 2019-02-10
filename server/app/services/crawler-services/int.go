package crawler

type Author struct {
	name       string
	profileURL string
	imageUrl   string
}

type CrawlerOptions struct {
	allowDomain bool `default:false`
}
