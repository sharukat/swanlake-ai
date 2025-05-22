package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	m "github.com/sharukat/swanlake/internal/models"
)

const (
	TAVILY_URL = "https://api.tavily.com/search"
)

func TavilySearch(collection string, item string) m.SearchStruct {
	ch := make(chan m.SearchStruct)

	go func(ch chan<- m.SearchStruct) {
		query := fmt.Sprintf("Information about %v %v", collection, item)
		queryParams := m.QueryParams{
			Query:                    query,
			Topic:                    "general",
			SearchDepth:              "basic",
			ChunksPerSource:          3,
			MaxResults:               5,
			TimeRange:                nil, // Use nil to represent null
			Days:                     3,
			IncludeAnswer:            true,
			IncludeRawContent:        false,
			IncludeImages:            false,
			IncludeImageDescriptions: false,
			IncludeDomains:           []string{},
			ExcludeDomains:           []string{},
		}

		jsonPayload, err := json.Marshal(queryParams)
		if err != nil {
			ch <- m.SearchStruct{
				Result: "",
				Error:  err,
			}
			return
		}

		payload := bytes.NewBuffer(jsonPayload)
		req, _ := http.NewRequest("POST", TAVILY_URL, payload)

		req.Header.Add("Authorization", fmt.Sprintf("Bearer %v", os.Getenv("TAVILY_API_KEY")))
		req.Header.Add("Content-Type", "application/json")

		res, err := http.DefaultClient.Do(req)
		if err != nil {
			ch <- m.SearchStruct{
				Result: "",
				Error:  err,
			}
			return
		}

		defer res.Body.Close()
		body, err := io.ReadAll(res.Body)
		if err != nil {
			ch <- m.SearchStruct{
				Result: "",
				Error:  err,
			}
			return
		}

		var data m.Response
		jsonErr := json.Unmarshal([]byte(string(body)), &data)
		if jsonErr != nil {
			ch <- m.SearchStruct{
				Result: "",
				Error:  jsonErr,
			}
			return
		}

		var contents []string
		for _, result := range data.Results {
			contents = append(contents, result.Content)
		}
		context := strings.Join(contents, "\n")
		ch <- m.SearchStruct{
			Result: context,
			Error:  nil,
		}
	}(ch)

	// Wait for the goroutine to finish and get the response
	response := <-ch
	return response
}
