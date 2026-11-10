import os
from dotenv import load_dotenv
from tavily import TavilyClient
from langchain.tools import tool
from langchain.agents import create_agent
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from typing import Dict, Any

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")
tavily_client = TavilyClient(api_key=TAVILY_API_KEY)
llm = ChatGoogleGenerativeAI(model="gemini-3.1-flash-lite", api_key=GEMINI_API_KEY)

@tool("calculator", description="Performs mathematical calculations.")
def tool1(expression: str) -> str:
    try:
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"Error: {e}"

@tool("web_search", description="Search the web for information.")
def tool2(query: str) -> Dict[str, Any] | str:
    try:
        return tavily_client.search(query)
    except Exception as e:
        return f"Error: {e}"

tools = [tool1, tool2]
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful assistant."
)

text = "Calculate the surface of the circle if the radius is 6cm. Provide me the history of pi as well."
question = HumanMessage(content=text)
response = agent.invoke({"messages": [question]})

print(text + "\n")
final_message = response['messages'][-1]
print(final_message.text)