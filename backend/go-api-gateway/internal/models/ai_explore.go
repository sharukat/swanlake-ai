package models

type InputData struct {
	Collection string            `json:"collection"`
	Item       string            `json:"item"`
	DBData     map[string]string `json:"db_data"`
	Context    string            `json:"context"`
}

type CombinedResult struct {
	Response1 string   `json:"response1"`
	Response2 string   `json:"response2"`
	Images    []string `json:"images"`
}
