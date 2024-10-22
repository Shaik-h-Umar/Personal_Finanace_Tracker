# Personal_Finance_Tracker

## Introduction

This project is a Personal Expense Tracker that allows users to track their income, expenses, and overall financial health. The app includes a user-friendly interface with sign-up and login capabilities using Firebase authentication and provides data visualization in the form of charts and graphs to summarize transaction history.

## Table of Contents
1. Project Overview
2. Demo
3. Key Features
4. Technologies Used
5. Setup and Installation
6. Usage
7. Future Enhancement
8. Contributing 

## Project Overview
This is a full-stack React financial tracker application that allows users to track their financial transactions and visualize it in the form of charts and graphs.

## Demo
Demo Will be uploaded soon.....!

## Key Features

- Authentication
- Dashboard Page
- Data Visualization
- Transaction Management
- Import/Export
- Persistent Sessions

## Technologies Used
- react: "18.2.0",
- firebase: "10.0.0",
- antd: "5.7.0",
- moment: "2.29.4",
- papaparse: "5.4.1",
- react-apexcharts: "1.4.1",
- react-firebase-hooks: "5.1.1",
- react-icons: "4.10.1",
- react-router-dom: "6.14.1",
- react-toastify: "9.1.3",

## Set Up and Installation

1. Clone the repository:
   ```bash
    git clone https://github.com/Shaik-h-Umar/Personal_Finanace_Tracker.git
   
2. Install the dependencies:
   ```bash
   npm install
   
3. Configure Firebase:
   - Create a Firebase project on the Firebase Console (https://console.firebase.google.com/).
   - Obtain your Firebase configuration credentials (apiKey, authDomain, projectId, etc.).
   - Create a .env file in the root directory and add your Firebase credentials:
   ```maekfile
   REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID

4. Run the application:
    ```bash
    npm start

## Usage
1. Authentication:

- Users can sign up or log in using their Email and Password or Google account through the Firebase authentication system.
- Upon successful login, users are automatically redirected to the main Dashboard, where they can manage their transactions.
- If the user closes the website without logging out, they will be taken directly to the Dashboard upon reopening, without needing to log in again. However, if they log out manually, they will need to sign in again.

2. Adding Transactions:

- On the Dashboard, users can click the "Add Income" or "Add Expense" button to open a form for adding new transactions.
- The form includes fields for:
  - Name: The name or description of the transaction.
  - Amount: The amount for the transaction.
  - Date: The date when the transaction occurred.
  - Tag: A category to classify the transaction, such as "Education," "Food," or "Office."
- All fields are required to ensure complete and accurate transaction records.
- Once the user fills in the details, clicking the Add button will save the transaction to the Firebase Firestore database.
- The app will then update the current balance and adjust the income or expense totals based on the newly added transaction.

3. Viewing Financial Data:

- The Transaction Table on the Dashboard displays a list of all user transactions with key information, including the Date, Amount, Tag, and Transaction Type (Income or Expense).
- Users can filter and sort the table to view specific transactions or search for transactions by name.
- Financial data is categorized into Income and Expenses, with calculations to show the Current Balance.
- The Dashboard also includes visual representations of the financial data using charts:
  - A Line Chart is available to show the history of all transactions over time, with dates on the X-axis and transaction amounts on the Y-axis.
  - A Pie Chart is used to provide a clear breakdown of expenses by category (e.g., education, food, office). This allows users to easily compare and analyze their spending habits.

4. Importing and Exporting Transactions:

- Users can export their transaction history in CSV format using the Papa Parse integration. This allows for easy record-keeping or sharing of data.
- To import transactions, users can upload a CSV file, and the system will parse the file and update the database with the new transaction data.
- The dashboard will automatically reflect the new data after import, updating the charts, tables, and balance calculations accordingly.

5. Sorting and Filtering Transactions:

- Users can sort transactions in the table by Date or Amount to quickly identify specific records or get a clearer view of their financial timeline.
- Filtering options allow users to filter by Income, Expense, or view All Transactions, giving them more control over how they analyze their data.

6. Persistent Sessions:

- Once logged in, users will remain authenticated even if they close or refresh the browser. On reopening, they will be directed back to the Dashboard without needing to log in again.
- A Logout button is available in the navigation bar to end the session and return to the login screen.

## Future Enhancements
- Support for different payment modes (e.g., UPI, bank transfer, cash).
- Ability to track loans, EMIs, and other complex transactions.
- Reset balance feature to clear all transactions.
  
## Contributing
We welcome contributions! Please submit a pull request or open an issue to suggest improvements.
