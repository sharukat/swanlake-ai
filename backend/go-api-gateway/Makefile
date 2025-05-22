# Variables
BINARY_NAME=swanlake
CMD_PATH=./cmd/swanlake

# Default target when you run `make`
all: build

# Build binary
build:
	mkdir -p bin
	go build -o bin/$(BINARY_NAME) $(CMD_PATH)
	go install -v $(CMD_PATH)

# Run tests with coverage
test:
	go test -v -cover ./...

# Clean up generated files
clean:
	rm -rf bin