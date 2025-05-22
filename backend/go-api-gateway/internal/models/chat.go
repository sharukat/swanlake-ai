package models

type HistoryItem struct {
	Text   string `json:"text"`
	Sender string `json:"sender"`
}

type Input struct {
	History []HistoryItem `json:"history"`
}

type ResponseStruct struct {
	Response []byte `json:"response"`
	Error    error  `json:"error"`
}
