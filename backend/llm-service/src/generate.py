import os
from typing import List
from dotenv import load_dotenv
from functools import lru_cache

from langchain_groq import ChatGroq

# from langchain_ollama import ChatOllama
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

import logging

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Load environmental variables
load_dotenv(dotenv_path="../.env")


@lru_cache(maxsize=None)
class InitModel:
    """Manages the initialization and the access to the LLM instance.
    LRU cache is used to make the class singleton.
    """

    def __init__(self):
        self.model_name = os.getenv("LLM")
        self._model = ChatGroq(
            model=self.model_name,
            groq_api_key=os.getenv("GROQ_API_KEY"),
            temperature=0,
        )

    @property
    def model(self) -> ChatGroq:
        """Returns the initialized LLM instance."""
        if not hasattr(self, "_model") or self._model is None:
            err = "The model has not been initialized."
            logger.error(err)
            raise ValueError(err)
        return self._model


class ResponseGenerator:
    """Generates a response based on user input, MongoDB data and web info."""

    def __init__(self) -> None:
        self.model_manager = InitModel()

    def generate(self, search_item: str, data) -> str:
        prompt = PromptTemplate.from_template(
            """
            You are an expert in providing information about {search_item} based solely on the context provided below. Please follow these structured steps to generate your response:

            1. First, carefully read and analyze the information provided under "Data."
            2. Use this data to craft an explanation which is less than 175 words.

            Data:
            {data}
            """
        )

        chain = prompt | self.model_manager.model | StrOutputParser()
        response = chain.invoke({"search_item": search_item, "data": data})
        return response


class LLMService:
    """Entry point to the LLM service."""

    def __init__(self) -> None:
        self.response_generator = ResponseGenerator()

    def generate_response(self, search_item: str, data) -> str:
        """Generates a response based on the given input."""
        return self.response_generator.generate(search_item, data)


class ChatBot:
    def __init__(self) -> None:
        self.model_manager = InitModel()

    def generate(self, question: str, history: List[str]) -> str:
        prompt = PromptTemplate.from_template(
            """
            You are an expert in providing information about Markham Swan Lake Park. Below is the conversation history.
            {history}

            Please concise answer to the question.
            {question}
            """
        )

        chain = prompt | self.model_manager.model | StrOutputParser()
        response = chain.invoke({"history": history, "question": question})
        return response
