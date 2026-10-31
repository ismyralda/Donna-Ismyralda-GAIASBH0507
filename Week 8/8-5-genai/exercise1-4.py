import os, base64
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()
llm = ChatGoogleGenerativeAI(
    model="gemini-3.1-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)

video_file_path = "D:/Content Creation/video_20250721_222301.mp4"
with open(video_file_path, "rb") as video_file:
    encoded_video = base64.b64encode(video_file.read()).decode()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert video analyst. Analyze videos carefully and provide detailed descriptions."),
    ("human",[
        {"type": "text", 
         "text": "{analysis_request}"
        },
        {
            "type": "media",
            "data": "{video_data}",
            "mime_type": "{mime_type}"
        }
    ]),
])

chain = prompt | llm | StrOutputParser()
print("Analyzing video...")

response = chain.invoke({
    "analysis_request": """Summarize this video.
    Create ONE multiple-choice question based on this video, with exactly 4 choices. 
    Reply in exactly this format and nothing else:\n
    QUESTION: <question text>\n
    A) <choice>\n
    B) <choice>\n
    C) <choice>\n
    D) <choice>\n
    ANSWER: <A, B, C or D>""",
    "video_data": encoded_video,
    "mime_type": "video/mp4"
})

print("\nAnalysis completed!")
print("\nResults:\n" + "-" * 40)

#Split print before QUESTION:
summary = response.split("QUESTION:")[0].strip()
print(summary)

question = ""
choices = {}
correct = ""

for line in response.strip().splitlines():
    line = line.strip()
    if line.upper().startswith("QUESTION:"):
        question = line.split(":", 1)[1].strip()
    elif line.upper().startswith("ANSWER:"):
        correct = line.split(":", 1)[1].strip().upper()[:1]
    elif len(line) > 2 and line[0].upper() in "ABCD" and line[1] == ")":
        choices[line[0].upper()] = line[2:].strip()

# Show the question without the answer
print("\n" + question)
for letter, text in choices.items():
    print(f"  {letter}) {text}")

# User answers, Python checks
user_answer = ""
while user_answer not in choices:
    user_answer = input("Your answer (A/B/C/D): ").strip().upper()

if user_answer == correct:
    print("Correct!")
else:
    print(f"Wrong. The correct answer is {correct}) {choices[correct]}")