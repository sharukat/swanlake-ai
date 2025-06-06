import os
import yaml
from enum import Enum
from typing import List
from dotenv import load_dotenv
from functools import lru_cache
from pydantic import SecretStr, BaseModel
from langchain_groq import ChatGroq
from abc import ABC, abstractmethod

# from langchain_ollama import ChatOllama
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

import logging

logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

# Load environmental variables
load_dotenv(dotenv_path="../.env")


class HistoryItem(BaseModel):
    text: str
    sender: str


class PromptType(Enum):
    """Enum for different prompt types"""
    EXPLORER = "explorer"
    CHAT = "chat"


@lru_cache(maxsize=None)
class InitModel:
    """Manages the initialization and the access to the LLM instance.
    LRU cache is used to make the class singleton.
    """

    def __init__(self):
        self.prompts_file = "config/prompts.yaml"
        self.prompts_data = {}
        self.load_prompts()
        self.model_name = os.getenv("LLM")
        self.groq_api_key = os.getenv("GROQ_API_KEY")

        if not self.model_name:
            raise ValueError("LLM environment variable is required")

        if not self.groq_api_key:
            raise ValueError("GROQ_API_KEY environment is required")

        self._model = ChatGroq(
            model=self.model_name,
            api_key=SecretStr(self.groq_api_key),
            temperature=0,
        )

    def load_prompts(self):
        try:
            with open(self.prompts_file, 'r', encoding='utf-8') as f:
                self.prompts_data = yaml.safe_load(f)
            logger.info(f"Loaded prompts from {self.prompts_file}")
        except FileNotFoundError:
            logger.error(f"Prompts file not found: {self.prompts_file}")
            raise
        except yaml.YAMLError as e:
            logger.error(f"Error parsing YAML file: {e}")
            raise

    @property
    def model(self) -> ChatGroq:
        """Returns the initialized LLM instance."""
        if not hasattr(self, "_model") or self._model is None:
            err = "The model has not been initialized."
            logger.error(err)
            raise ValueError(err)
        return self._model

    def get_prompt_config(self, prompt_name: str) -> dict:
        return self.prompts_data['prompts'][prompt_name].copy()


class ResponseGenerator:
    """Generates a response based on user input, MongoDB data and web info."""

    def __init__(self) -> None:
        self.model_manager = InitModel()

    def generate(self, search_item: str, data) -> str:
        config = self.model_manager.get_prompt_config("explorer")
        template = config['user']
        prompt = PromptTemplate.from_template(template)
        print(prompt)
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

    def generate(self, question: str, history: List[HistoryItem]) -> str:
        config = self.model_manager.get_prompt_config("chat")
        template = config['user']
        prompt = PromptTemplate.from_template(template)
        chain = prompt | self.model_manager.model | StrOutputParser()
        response = chain.invoke({"history": history, "question": question})
        return response


class BaseGenerator(ABC):
    """Abstract class for response generators"""

    def __init__(self) -> None:
        super().__init__()