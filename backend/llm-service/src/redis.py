import os
from typing import Optional
from dataclasses import dataclass
from redisvl.extensions.cache.llm import SemanticCache
from redisvl.utils .vectorize import HFTextVectorizer


@dataclass
class RedisConfig:
    """Configuration for semantic cache"""
    name: str = "llmcache"
    redis_url: Optional[str] = None
    redis_host: str = "localhost"
    redis_port: int = 6379
    redis_db: int = 0
    redis_password: Optional[str] = None
    distance_threshold: float = 0.1
    vectorizer_model: str = "redis/langcache-embed-v1"
    ttl: int = 86400  # 24 hours


def get_cache_config() -> RedisConfig:
    redis_url = os.getenv("REDIS_SERVER_URL")
    if not redis_url:
        raise ValueError("REDIS_SERVER_URL environment variable is required")

    return RedisConfig(
        redis_url=redis_url,
    )


def create_semantic_cache():
    config = get_cache_config()

    llmcache = SemanticCache(
        name=config.name,
        redis_url=config.redis_url,
        distance_threshold=config.distance_threshold,
        vectorizer=HFTextVectorizer(config.vectorizer_model),
    )
    return llmcache
