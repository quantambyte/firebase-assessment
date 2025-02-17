# Firebase User Creation Cloud Function

This project includes a Firebase Cloud Function to create a new user in Firebase Authentication and store their details in Firestore. Additionally, Firestore security rules ensure that only the authenticated user can access their own document.

## Features

- **User Creation:** Creates a user in Firebase Authentication using the provided email, password, and (optionally) a custom UID.
- **Data Storage:** Saves the user's name, gender, and email in Firestore in a document with an ID matching the user's UID.
- **Security:** Firestore security rules restrict access so that only the authenticated user can read or write their own document in the `users` collection.

## Folder Structure

```
firebase-project/
├── .firebaserc
├── firebase.json
├── firestore.rules
├── README.md
└── functions/
├── package.json
├── tsconfig.json
└── src/
└── index.ts
```

## Prerequisites

- **Node.js** (v18 or later recommended)
- **Firebase CLI**
- **Firebase project**

## Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/quantambyte/firebase-assessment
cd firebase-assessment
```

### 2. Update "your-firebase-project-id" with your project id in ".firebaserc"

```bash
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 3 Install Firebase CLI

If you haven’t already installed the Firebase CLI, install it globally:

```bash
npm install -g firebase-tools
```

### 4. Login to Firebase

Log in to your Firebase account:

```bash
firebase login
```

### 5. Initialize the Firebase Project

If this project isn’t already linked to your Firebase project, run:

```bash
firebase init
```

- Select Functions and Firestore when prompted.
- Choose TypeScript as the language for Cloud Functions.
- When asked, select the default options (or adjust as needed).

### 6. Install Dependencies

Navigate to the functions directory and install dependencies:

```bash
cd functions
npm install
```

### 7. Deploy Firestore Rules

Deploy your Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

### 8. Deploy Cloud Functions

Deploy the Cloud Function:

```bash
firebase deploy --only functions
```
