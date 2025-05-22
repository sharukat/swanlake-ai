import os
from tavily import TavilyClient

from dotenv import load_dotenv
load_dotenv(dotenv_path="../.env")


def web_search(collection: str, item: str) -> dict:
    """
    Search the web for the given query using Tavily API.

    Args:
        query (str): The query to search for.

    Returns:
        dict: A dictionary containing the following search results.
            - url (str): The URL of the search result.
            - content (str): The content of the search result.

    """
    query = f"Information about {item} {collection}"
    client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    return client.search(query)
