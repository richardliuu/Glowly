# Glowly Setup

## Step 1: Install Requirements.txt

Make sure you install all modules in the requirements.txt file, as well as `npm install / pip install` all of the packages as well.

## Step 2: Launch Virtual Environment

Run `Set-ExecutionPolicy Unrestricted -Scope Process` to confirm you have the ability to run all scripts. Next, create a virtual environment by running the command `python -m venv .venv`. This provides you with a virtual environment to run the frontend & backend.

## Step 3: Launch Frontend & Backend

Your terminal should be split, so enter `cd frontend` on the first terminal, and enter `cd backend` on the second. To launch the frontend, run `npm run dev`, and to run the backend, run `python manage.py runserver`. Congratulations! You successfully launched Glowly, now follow the instructions on the website!

.venv\Scripts\activate
cd backend 
python manage.py runserver

.venv\Scripts\activate    (Root Directory)
cd frontend
npm run dev

# Need to access the REST framework to check if the models can correctly input data 

# Start building the frontend to see how the app will look like and how it will interact with the API 

