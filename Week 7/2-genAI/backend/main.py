import os
from dotenv import load_dotenv
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
#
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(
    model="gemini-3.1-flash-lite", 
    api_key=GEMINI_API_KEY
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

prompt = ChatPromptTemplate.from_messages ([
        (
            "system",
            "{instruction}"
        ),
        (
            "human",
            "{question}"
        )
    ])

chain = prompt | llm | StrOutputParser()

@app.get("/")
async def check_api():
    answer = chain.invoke({
        "instruction": "Please follow the instruction provided only.",
        "question": "State only the following: 'The API is working'"
        })
    return {"message": answer}

@app.post("/genai/translate_text")
async def translate_text(
    input_language: str,
    output_language: str,
    text: str):
    answer = await chain.ainvoke({
        "instruction": f"Translate the provided sentence from {input_language} to {output_language}. Output the translation only.",
        "question": text
    })

    return {"translated_text": answer}

@app.post("/genai/translate")
async def translate_text_array(
    input_language: str = Body(),
    output_language: str = Body(),
    text: str = Body(),
):
    answer = await chain.ainvoke({
        "instruction": f"Translate the provided sentence from {input_language} to {output_language}. Output the translation only.",
        "question": text,
    })
    return {"translated_text": answer}