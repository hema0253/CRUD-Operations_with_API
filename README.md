# CRUD Website

A simple CRUD (Create, Read, Update, Delete) web application built with **HTML, CSS, and JavaScript**. It interacts with a backend API to manage user records.

## Features

✅ Add new records (Name & Email)  
✅ View existing records in a table  
✅ Delete records easily  
✅ Simple UI with basic CSS

## Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

### 2️⃣ Install JSON Server (For Local Backend)

Ensure you have **Node.js** installed, then install JSON Server:

```sh
npm install -g json-server
```

### 3️⃣ Start the JSON Server

Run the following command in the project folder:

```sh
json-server --watch db.json --port 3000
```

This will create a mock backend API at `http://localhost:3000/records`.

### 4️⃣ Open the Webpage

Just open the `index.html` file in your browser.

## Usage

1. **Enter Name & Email** → Click **Add** to store the record.
2. **Records Table** → Displays stored data from the backend.
3. **Delete Button** → Removes a record from the backend.

## Deployment

You can host this project on:

- **GitHub Pages** (Frontend only)
- **Netlify** / **Vercel** (Recommended for full stack support)

## Contributing

Feel free to fork this repo and submit pull requests with improvements!

---

✨ Made with ❤️ using HTML, CSS & JavaScript ✨
