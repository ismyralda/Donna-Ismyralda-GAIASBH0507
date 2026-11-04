# example_3.py: ask questions about facts.txt
import os
from fastapi import FastAPI, Body
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from embeddings import embeddings

# Overwrite FastAPI title
app = FastAPI(title="Modern RAG API for Diabetes PDF")

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URI")

# Initialize the LLM
llm = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite", api_key=GEMINI_API_KEY)

client = MongoClient(MONGODB_URI)
DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)

retriever = vector_store.as_retriever(search_kwargs={"k": 10})

# Define the system prompt with instructions for the AI
system_prompt = (
    """
    You are a helpful assistant. Answer my question based on the provided context ONLY, but if there is no answer, be honest and tell me that there is no answer.
    Context:\n{context}
    """
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Retrieve, build the prompt, call the LLM, parse the text
rag_chain = (
    {"context": retriever | format_docs, "input": RunnablePassthrough()}
    | prompt | llm | StrOutputParser()
)

# Input question in FastAPI app
@app.post("/ask")
async def ask_question(text: str):
    answer = await rag_chain.ainvoke({
        "input": text
    })

    return {"answer": answer}