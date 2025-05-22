package models

type QueryParams struct {
	Query                    string   `json:"query"`
	Topic                    string   `json:"topic"`
	SearchDepth              string   `json:"search_depth"`
	ChunksPerSource          int      `json:"chunks_per_source"`
	MaxResults               int      `json:"max_results"`
	TimeRange                *string  `json:"time_range"` // Use a pointer to handle null values
	Days                     int      `json:"days"`
	IncludeAnswer            bool     `json:"include_answer"`
	IncludeRawContent        bool     `json:"include_raw_content"`
	IncludeImages            bool     `json:"include_images"`
	IncludeImageDescriptions bool     `json:"include_image_descriptions"`
	IncludeDomains           []string `json:"include_domains"`
	ExcludeDomains           []string `json:"exclude_domains"`
}

type SearchStruct struct {
	Result string
	Error  error
}

type Result struct {
	Url     string `json:"url"`
	Content string `json:"content"`
}

type Response struct {
	Query             string        `json:"query"`
	FollowUpQuestions interface{}   `json:"follow_up_questions"`
	Answer            string        `json:"answer"`
	Images            []interface{} `json:"images"`
	Results           []Result      `json:"results"`
	ResponseTime      float64       `json:"response_time"`
}
