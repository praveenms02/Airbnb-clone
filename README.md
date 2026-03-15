# Airbnb Clone

An Airbnb-inspired full-stack web application that allows users to explore property listings, create and manage their own stays, upload images, and share reviews. The project is built with Node.js, Express, MongoDB, and EJS, and deployed on Render.

## Live Demo
[Visit the App](https://airbnb-clone-37m6.onrender.com/)

## Features
- User authentication with signup, login, and logout
- Create, edit, and delete property listings
- Upload listing images using Cloudinary
- Add and delete reviews on listings
- Flash messages for success and error handling
- Session-based authentication
- Server-side validation with Joi
- Responsive UI using EJS templates

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, CSS, JavaScript
- **Authentication:** Passport.js, express-session
- **File Uploads:** Multer, Cloudinary
- **Validation:** Joi
- **Deployment:** Render

## Folder Structure
```bash
Airbnb-clone/
│
├── controllers/      # Route logic
├── init/             # Database seed/setup files
├── models/           # Mongoose models
├── public/           # Static assets (CSS, JS, images)
├── routes/           # Express routes
├── utils/            # Utility classes and wrappers
├── views/            # EJS templates
├── app.js            # Main server file
├── cloudConfig.js    # Cloudinary configuration
├── middleware.js     # Custom middleware
├── schema.js         # Joi validation schemas
├── package.json
└── package-lock.json
```

## Installation and Setup
### 1. Clone the repository
```bash
git clone https://github.com/praveenms02/Airbnb-clone.git
cd Airbnb-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment variables
Create a `.env` file in the root directory and add:
```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the project
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Environment Variables
The following environment variables are required:
- `ATLASDB_URL`
- `SECRET`
- `CLOUD_NAME`
- `CLOUD_API_KEY`
- `CLOUD_API_SECRET`

## Deployment
This project is deployed on **Render**.

### Render Configuration
- **Build Command:** `npm install`
- **Start Command:** `npm start`

Make sure to add all required environment variables in your Render dashboard before deploying.

## Future Improvements
- Add search and filter functionality
- Add map integration for property locations
- Add booking/reservation system
- Improve UI/UX with more polished design
- Add image preview before upload

## Author
**Praveen M S**
