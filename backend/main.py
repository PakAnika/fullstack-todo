from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class PostBase(BaseModel):
    slug: str
    title: str
    author: str
    date: str
    category: str

class PostFull(PostBase):
    content: str

fake_posts_db = [
    {
        "slug": "first-post",
        "title": "Первый пост",
        "content": "# Привет\nЭто *markdown* текст",
        "author": "Аскар",
        "date": "2025-06-28",
        "category": "Общее"
    },
    {
        "slug": "second-post",
        "title": "Второй пост",
        "content": "## Второй заголовок\nПример **Markdown** содержимого.",
        "author": "Алия",
        "date": "2025-06-27",
        "category": "Новости"
    },
]

@app.get("/api/posts", response_model=List[PostFull])
async def get_all_posts():
    return fake_posts_db

@app.get("/api/posts/{slug}", response_model=PostFull)
async def get_post_by_slug(slug: str):
    for post in fake_posts_db:
        if post["slug"] == slug:
            return post
    raise HTTPException(status_code=404, detail="Post not found")
