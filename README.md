# Markdown Note-Making App

This is a simple Markdown note-making app built with React for the front-end and Firebase for the backend.

## Features

- Create and edit notes using Markdown syntax.
- Live preview of the Markdown content.
- Firebase backend for storing notes.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/markdown-note-app.git
cd markdown-note-app


2. Install Dependencies:

    Make sure you have Node.js installed on your machine. Then, in the project directory, open your terminal and run:

   ```bash
   npm install
   ```

3. Set up Firebase:
- Create a Firebase project on the Firebase Console.
- Obtain your Firebase configuration by clicking on "Project settings" > "General" > "Your apps" > "Firebase - - SDK snippet" > "Config".
- Create a .env.local file in the project root and add your Firebase configuration:

REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id

4. Start the development server:

   ```bash
   npm run dev
   ```