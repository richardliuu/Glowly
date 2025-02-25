Set-ExecutionPolicy Unrestricted -Scope Process
# Running the backend

.venv\Scripts\activate (Root Directory)
cd backend 
python manage.py runserver

# Running the frontend

.venv\Scripts\activate (Root Directory)
cd frontend
npm run dev

# Need to access the REST framework to check if the models can correctly input data 

# Start building the frontend to see how the app will look like and how it will interact with the API 

