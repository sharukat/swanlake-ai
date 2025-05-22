package utilities

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"time"
)

func StructToMap(data interface{}) (map[string]string, error) {
	dbMap := make(map[string]string)
	v := reflect.ValueOf(data)
	t := v.Type()

	for i := 0; i < v.NumField(); i++ {
		field := t.Field(i)
		value := v.Field(i)

		// Convert the value to string
		dbMap[field.Tag.Get("json")] = fmt.Sprintf("%v", value.Interface())
	}

	return dbMap, nil
}

func SendAPIRequest(method string, url string, data any) ([]byte, error) {
	// Placeholder for sending API requests with JSON data
	// This function should be implemented to send HTTP requests
	// and return the response or an error.

	var request *http.Request
	var err error
	var jsonData []byte

	jsonData, err = json.Marshal(data)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal data: %v", err)
	}

	request, err = http.NewRequest(method, url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %v", err)
	}

	request.Header.Set("Content-Type", "application/json")
	client := &http.Client{
		Timeout: 120 * time.Second,
	}

	response, err := client.Do(request)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %v", err)
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}
	return body, nil
}
