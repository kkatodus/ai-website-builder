# About this project

This project is a web app that allows users who are not familiar with html or css to create a website by chatting with an AI assistant. The AI assistant will change the existing html and css in real time which is also rendered as a preview as the user and the AI makes changes to the code. A demo video of this project is available [here](https://youtu.be/NvvZ0OytMM4)

## Project structure

- `backend` - contains the backend code that deals with saving of the user sessions as well as acts as a medium for the conversation between the frontend and the OpenAI API

- `frontend` - contains the frontend code written in Next.JS and TailwindCSS as well as typescript

NOTE: the whole project can be built using docker-compose

## How to run the project

### Pre-requisites

- Have docker installed on your machine

### Steps

1. Go into the frontend directory and create a file called `.env.local` and add the following environment variables

```env
NEXT_PUBLIC_BACKEND_URL = 'http://localhost:5000'
```

This will allow the frontend to communicate with the backend

2. Go into the backend directory and create a file called `.env` and add the following environment variables

```env
PORT=5000
OPENAI_API_KEY=<Your OpenAI API Key>
DATABASE_URL="mongodb://localhost:27017/appdb"
SECRET_KEY=<Your arbitrary secret key>
```

This will allow the backend to communicate with the OpenAI API and the MongoDB database

3. Go back to the root directory and run the following command

```bash
docker-compose up --build
```

### More information about the project

#### Preview of the code

The preview is generated from the html and css code that is contained in the session. A session is an instance of a users conversation with the AI assistant.

#### Saving the session

The sessions are saved in a MongoDB database. The session contains the following fields:

- `id` - the id of the session
- `html` - the html code that the user and the AI assistant have generated
- `css` - the css code that the user and the AI assistant have generated
- `conversation` - the conversation between the user and the AI assistant
- `createdAt` - the time the session was created
- `userId` - the id of the user who created the session

For the other interfaces of different models, see `backend/src/models/`

#### Interaction with the AI assistant

The request by the user is formatted in the backend and sent to the OpenAI API. The response of the OpenAI API is then processed into the verbal response from the AI, html and the css code that is reflected in the preview.

#### User authentication

The user authentication is done using JWT tokens. The user is authenticated when they sign in and the token is stored in the local storage. The token is then used to authenticate the user when they make requests to the backend. Once the user refreshes the page, the token is lost and the user has to sign in again.

#### References

For the references I used to code the project, please refer to the `REFERENCES.md` file in the root directory of the project.
