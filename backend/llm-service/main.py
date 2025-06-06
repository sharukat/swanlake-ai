import uvicorn
import logging
from typing import List
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from src.generate import ResponseGenerator, ChatBot, HistoryItem

load_dotenv(dotenv_path="../.env")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # Must be False when allow_origins=["*"]
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class LLMInput(BaseModel):
    collection: str
    item: str
    db_data: dict
    context: str


class ChatInput(BaseModel):
    history: List[HistoryItem]


@app.post("/ai/generate")
async def root(request: Request) -> JSONResponse:
    try:
        data = await request.json()
        data = LLMInput(**data)
        validated_data = data.model_dump()
        db_data = validated_data["db_data"]
        # web_data = web_search(data.collection, data.item)

        # urls = set()
        # context = []
        # for result in web_data["results"]:
        #     urls.add(result["url"])
        #     context.append(result["content"])

        # web_data = "\n".join(context)
        # print(f"Context: {web_data}")
        response_1 = ResponseGenerator().generate(
            search_item=data.item,
            data=str(db_data),
        )
        response_2 = ResponseGenerator().generate(
            search_item=data.item,
            data=data.context,
        )
        return JSONResponse(
            content={"response1": response_1, "response2": response_2},
            status_code=200
            )
    except Exception as e:
        logger.error(f"Error in request: {e}")
        return JSONResponse(content="Error in request", status_code=500)


# @app.post("/ai/generate")
# async def generate_resonse(input_data: LLMInput) -> JSONResponse:
#     web_data = None
#     response = ResponseGenerator().generate(
#         search_item=input_data.item,
#         db_data=input_data.db_data,
#         web_data=web_data,
#     )
#     logger.info("Response generation successful")
#     return JSONResponse(content=response, status_code=200)


@app.post("/ai/chatbot")
async def chatbot(request: ChatInput) -> JSONResponse:
    try:
        history = request.history
        question = history[-1].text
        history = history[:-1]

        response = ChatBot().generate(
            question=question,
            history=history,
        )

        return JSONResponse(
            content=response,
            status_code=200
        )
    except Exception as e:
        logger.error(f"Error in request: {e}")
        return JSONResponse(content="Error in request", status_code=500)


if __name__ == "__main__":
    try:
        uvicorn.run(app, host="0.0.0.0", port=8000)
    except Exception as e:
        print(f"Failed to start server: {e}")
