import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

examples = [
    {"review": "That was a great talk. Let's go grab some coffee to discuss further.", "sentiment": "Yes"},
    {"review": "The concept is interesting, but I would need a bit more convincing to go", "sentiment": "Maybe"},
    {"review": "You might need to rework on your presentation. Let's try again next time", "sentiment": "No"}
]

example_prompt = PromptTemplate(
    input_variables=["review", "sentiment"],
    template="Pitch Review: {review}\nSentiment: {sentiment}"
)

prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Analyze the pitch review sentiment. \nRespond with ONLY ONE WORD: Yes / Maybe / No \n",
    suffix="Pitch Review: {input}\nSentiment:",
    input_variables=["input"]
)

chain = prompt | llm | StrOutputParser()

print("Pitch Review Sentiment Analyzer (type 'quit' to exit)")
while True:
    review = input("Enter pitch review: ").strip()
    if not review:
        continue
    if review.lower() == 'quit':
        break
    try:
        response = chain.invoke({"input": review})
        print("Would You Take The Next Round? " + response.strip())
    except Exception as e:
        print(f"Error: {e}")

print("\nProgram ended.")