package services

import (
	"context"
	"errors"
	"net/http"
	"os"
	"strings"
	"sync/atomic"
	"time"

	"github.com/go-chi/chi/v5"
	g "github.com/serpapi/google-search-results-golang"
	m "github.com/sharukat/swanlake/internal/models"
	"golang.org/x/sync/errgroup"
)

const (
	ImageSizeDiff = 3
)

type imageResult struct {
	URL    string
	Width  float64
	Height float64
}

func GetImages(r *http.Request) m.ImageResponse {
	query := chi.URLParam(r, "name")
	ch := make(chan m.ImageResponse)

	go func(ch chan<- m.ImageResponse) {
		images, err := fetchRawResults(query)
		if err != nil {
			ch <- m.ImageResponse{
				Url:   []string{},
				Error: err,
			}
			return
		}
		filteredImages := filter(images)
		if len(filteredImages) == 0 {
			ch <- m.ImageResponse{
				Url:   []string{},
				Error: errors.New("no valid images found"),
			}
			return
		}

		validImages, err := validate(context.Background(), filteredImages, 2)
		if err != nil {
			ch <- m.ImageResponse{
				Url:   []string{},
				Error: err,
			}
			return
		}
		ch <- m.ImageResponse{
			Url:   validImages,
			Error: nil,
		}
		close(ch)

	}(ch)
	response := <-ch
	return response
}

// Internal function to fetch raw image results from Google
func fetchRawResults(query string) ([]imageResult, error) {
	params := map[string]string{
		"engine": "google_images",
		"ijn":    "0",
		"q":      query,
	}
	search := g.NewGoogleSearch(params, os.Getenv("SERP_API_KEY"))
	raw, err := search.GetJSON()
	if err != nil {
		return nil, err
	}

	arr, ok := raw["images_results"].([]interface{})
	if !ok {
		return nil, errors.New("no images_results field")
	}

	out := make([]imageResult, 0, len(arr))
	for _, item := range arr {
		m, ok := item.(map[string]interface{})
		if !ok {
			continue
		}
		w, wok := m["original_width"].(float64)
		h, hok := m["original_height"].(float64)
		url, uok := m["original"].(string)
		if !wok || !hok || !uok {
			continue
		}
		out = append(out, imageResult{URL: url, Width: w, Height: h})
	}
	return out, nil
}

// Filter images based on size and HTTPS
func filter(images []imageResult) []string {
	keep := make([]string, 0, len(images))
	for _, img := range images {
		if (img.Width-img.Height) > ImageSizeDiff || (img.Height-img.Width) > ImageSizeDiff {
			continue
		}
		if !strings.HasPrefix(img.URL, "https://") {
			continue
		}
		keep = append(keep, img.URL)
	}
	return keep
}

// Check the image URL is working and stop early once we've got enough.
func validate(ctx context.Context, urls []string, maxCount int) ([]string, error) {
	if maxCount <= 0 {
		return nil, errors.New("maxCount must be > 0")
	}

	client := &http.Client{Timeout: 5 * time.Second}
	gctx, cancel := context.WithCancel(ctx)
	defer cancel()

	eg, _ := errgroup.WithContext(gctx)
	resultCh := make(chan string, maxCount) // buffered channel
	var got int32

	for _, url := range urls {
		if atomic.LoadInt32(&got) >= int32(maxCount) {
			break
		}

		eg.Go(func() error {
			req, _ := http.NewRequestWithContext(gctx, http.MethodHead, url, nil)
			resp, err := client.Do(req)
			if err == nil {
				resp.Body.Close()
				if resp.StatusCode == http.StatusOK {
					if atomic.AddInt32(&got, 1) <= int32(maxCount) {
						resultCh <- url
					}
					if atomic.LoadInt32(&got) == int32(maxCount) {
						cancel()
					}
				}
			}
			return nil // errors are just "skip this URL"
		})
	}

	// wait for all launched checks to finish (or be canceled)
	go func() {
		eg.Wait()
		close(resultCh)
	}()

	var results []string
	for u := range resultCh {
		results = append(results, u)
	}
	if len(results) == 0 {
		return nil, errors.New("no valid images found")
	}
	return results, nil
}
