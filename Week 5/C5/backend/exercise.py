from fastapi import FastAPI, Body
from datetime import date as date_type

app = FastAPI()

USERS = [
    { "task_id" : "456", "date" : "2025-05-15", "user" : "John", "task" : "Learn React", "priority" : "5" },
    { "task_id" : "123", "date" : "2025-05-16", "user" : "Kelly", "task" : "Read a novel", "priority" : "3" },
    { "task_id" : "100", "date" : "2025-06-22", "user" : "Luke", "task" : "Clean living room", "priority" : "3" },
    { "task_id" : "211", "date" : "2025-07-12", "user" : "John", "task" : "Write a blog", "priority" : "4" }
]

# { "date": "2026-10-09", "user": "Donna", "task": "Test Add", "priority": "5" }
# { "date": "2026-10-09", "user": "Donna", "task": "Test Update", "priority": "5", "task_id": "457" }

@app.get("/")
async def test_read():
    return {"message" : "Welcome to Exercise 5.5 Introduction to FastAPI"}

@app.get("/items")
async def getAllItems():
    return USERS

@app.get("/items/{user}")
async def get_user(user: str):
    records_to_return = []
    for record in USERS:
        if record.get("user").casefold() == user.casefold():
            records_to_return.append(record)

    if not records_to_return:
        return "User Not Found"

    return records_to_return

@app.get("/items/")
async def get_date_and_user(date: date_type, user: str):
    records_to_return = []
    for record in USERS:
        if record.get("user").casefold() == user.casefold() and \
                record.get("date") == date.isoformat():
            records_to_return.append(record)

    if not records_to_return:
        return "User Record Not Found"

    return records_to_return

@app.post("/items/create_item")
async def create_user(new_user=Body()):
    next_id = max((int(r["task_id"]) for r in USERS), default=0) + 1
    new_user["task_id"] = str(next_id)
    USERS.append(new_user)

    return new_user

@app.put ("/items/update_item")
async def update_user(updated_user = Body()):
    for i in range(len(USERS)):
        if USERS[i].get("task_id") == updated_user.get("task_id"):
            USERS[i] = updated_user
            return "User Record Updated Successfully!"
    return "User Record Not Found"

# @app.delete("/items/delete_item/{task_id}")
# async def delete_task
