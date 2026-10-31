# name = "John"
# age = 25
# height = 1.75
# is_student = True

# print(f"Name: {name}, Age:{age}")
#======================================================================
# # Print strings
# x = "Welcome"
# print(x[0])
# print(x[3:6])
# print(x[3:])
# print(x[:5])
# print(x.upper())
# print(x.lower())
# print(len(x))
# print("come" in x)
# print("come1" in x)
# print(x.replace("Welc", "H"))
#======================================================================
# # Numbers
# x = 3
# y = 2.5
# print(x + y) #5.5
# print(x - y) #0.5
# print(x * y) #7.5
# print(x / y) #1.2

# import math
# z = 3.14159
# print(round(z, 2))      #3.14
# print(math.floor(z))    #3
# print(math.ceil(z))     #4
# print(f"{z:.2f}")       #3.14
#======================================================================
# # Cast
# num1 = input("Enter the first number: ")
# num2 = input("Enter the second number: ")
# print(num1 + num2)
# print(int(num1) + int(num2))

# x = "42"
# y = 3.99
# z = 0
# print(int(x))
# print(int(y))
# print(float(x))
# print(str(y))
# print(bool(z))
# print(bool(x))
#======================================================================
# # Exercise: Temperature Converter
# def celsius_to_fahrenheit():
#     try:
#         celsius = float(input("Enter the temperature in Celcius: "))
#         fahrenheit = (celsius * 9 / 5) + 32
#         print(f"Your input {celsius}°C is equal to {fahrenheit}")
#     except ValueError:
#         print("Please enter a valid number!")
# celsius_to_fahrenheit()
#======================================================================
# # If...Else
# age = float(input("Enter age: "))
# if age >= 18:
#     print("Adult.")
# else:
#     print("Minor.")

# if age >= 18 and age <=20:
#     print("Freshman")
# elif age > 20 and age <=22:
#     print("Sophomore")
# elif age > 22:
#     print("Graduate")

# # Logical
# age = 5
# print(age > 0 and age < 10) #True
# print(age > 0 or age > 10)  #True
# print(not(age > 3))         #False
#======================================================================
# # Boolean Exercise
# a = 1
# b = 2
# c = 0
# d = a and b and (not c)

# print(f"a = {a}") #true
# print(f"b = {b}") #true
# print(f"c = {c}") #true
# print(f"d = a and b and (not c) = {d}") # true
#======================================================================
# # For Loop
# for i in range(1, 6):
#     print(f"Number: {i}")

# for i in range(1, 6):
#     print(f"Number: {i}")
#     if i == 3:
#         break
# print("Loop ended")

# for i in range(1 ,11):
#     if i % 2 == 0:
#         continue
#     print(f"Odd Number: {i}")
# print("Loop ended")
#======================================================================
# # Functions
# def greet_user():
#     print("Hello, welcome to the program!")
#     print("I hope you have a great experience.")
#     print("Let's get started!")
# greet_user()
# # greet_user()

# def calculate_area(length, width):
#     area = length * width
#     return area
# result = calculate_area(2, 3) #input the numbers on length, width
# print(f"Area: {result}")
#======================================================================
# # Functions - Global Variable
# x = 10

# def without_global():
#     x = 5                       # This creates a new local variable, doesn't affect the global x
#     print(f"Local x: {x}")

# without_global()                # Output: Local x: 5
# print(f"Global x: {x}")         # Output: Global x: 10
#======================================================================
# # Lists
# fruits = ["apple", "banana", "orange"]
# fruits.append("grape")
# fruits.insert(1, "mango")
# fruits.remove("apple")
# print(fruits)           # ['mango', 'banana', 'orange', 'grape']
# print(fruits[0])        # mango
# print(fruits[-1])       # grape

# numbers = [3, 1, 4, 1, 5, 9, 2]
# numbers.sort()
# print(numbers)
# numbers.reverse()
# print(numbers)
# print(numbers.count(1))
# print(numbers.index(1))

# todos = []
# todos.append("Buy groceries")
# todos.append("Clean the house")
# todos.append("Pay bills")
# print("To-Do List:")
# for index, task in enumerate(todos, 1):
#     print(f"{index}. {task}")
#======================================================================
# # Dictionaries
# person = {
#     "name": "Alice",   
#     "age": 30,
#     "city": "New York"
# }
# print(person["name"])                   # "Alice" -- access by key
# person["email"] = "alice@email.com"     # add a new key:value pair
# print(person)       # Full output: {'name': 'Alice', 'age': 30, 'city': 'New York', 'email': 'alice@email.com'}

# print("--- Data keys only ---")
# for key in person:
#     print(key)

# print("--- Data values only ---")
# for value in person.values():
#     print(value)

# print("--- Both values ---")
# for key, value in person.items():
#     print(f"{key}: {value}")
#======================================================================
# # Error Handling
# try:
#     result = 10 / 0
# except:
#     print("Error: cannot divide by zero.")
# finally:
#     print("Closing...")

# try:
#     numerator = 10
#     denominator = int(input("Enter a denominator: "))
#     result = numerator / denominator
# except:
#     print("Error: cannot divide by zero!")
# else:

#======================================================================
# Exercise: To do List
pendingTasks = ["Stardew Valley", "Risk of Rain 2", "The Division", "Portal 2", "PalWorld"]
doneTasks = []

def show_tasks(): 
    print("Pending Tasks:")
    if not pendingTasks:
         print("No tasks yet.")
    else:
        for index, task in enumerate(pendingTasks, 1):
            print(f"{index}. {task}") 
         
    print("Done Tasks:")
    if not doneTasks:
        print("No tasks yet.")
    else:
        for index, task in enumerate(doneTasks, 1):
            print(f"{index}. {task}")

def add_task():
    task = input("Enter a new task: ")
    pendingTasks.append(task)

def complete_task():
    number = input("Enter the number of the task you finished: ")

    index = int(number) - 1

    if index >= 0 and index < len(pendingTasks):
        doneTasks.append(pendingTasks[index])
        pendingTasks.pop(index)   # or remove function
    else:
        print("Invalid task number.")

def show_summary():
    pendingCount = len(pendingTasks)
    doneCount = len(doneTasks)

    print("--- Summary ---")
    print(f"Pending: {pendingCount} tasks")
    print(f"Done: {doneCount} tasks")

show_tasks()
print("----------")
add_task()
print("----------")
complete_task()
show_summary()
print("--- Updated To-do List ---")
show_tasks()
print("--- Thank you! Bye bye ---")
