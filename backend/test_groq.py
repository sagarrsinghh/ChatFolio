import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

my_api_key = os.getenv("GROQ_API_KEY")
if not my_api_key:
    raise ValueError("GROQ_API_KEY environment variable is not set.")

model = os.getenv("GROQ_MODEL")
if not model:
    raise ValueError("GROQ_MODEL environment variable is not set.")

client = Groq(api_key=my_api_key)

system_prompt = """You are the public AI assistant for Sagar Singh's portfolio.
Answer professionally and concisely.
Do not invent personal skills, experience, or achievements."""

user_prompt = "Introduce yourself and explain your role as a portfolio assistant and your name is Ghost." 

message_system = {
    "role": "system",
    "content": system_prompt,
}

message_user = {
    "role": "user",
    "content": user_prompt,
}

messages = [message_system, message_user]

response = client.chat.completions.create(
    model=model,
    messages=messages,
)

answer = response.choices[0].message.content
print(answer)
