<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
FitLog-txsgnu
</h1>
<h4 align="center">A web application for tracking fitness goals, progress, and sharing achievements with friends.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Next.js framework for building server-rendered React applications">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend built with JavaScript, HTML, and CSS">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend built with Node.js">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-green" alt="PostgreSQL database for storing data">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="Leveraging custom LLMs including Gemini and OpenAI">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/FitLog-txsgnu?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/FitLog-txsgnu?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/FitLog-txsgnu?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains a Minimum Viable Product (MVP) called "FitLog-txsgnu" that empowers fitness enthusiasts to track their progress towards their goals and share their achievements with their network. The application combines personalized goal setting, comprehensive progress tracking, and social features to create a motivating and engaging experience.

## 📦 Features
| Feature            | Description                                                                                                        |
|--------------------|--------------------------------------------------------------------------------------------------------------------|
| **Goal Setting**   | Users can set personalized fitness goals in various categories (weight loss, exercise, nutrition) with specific targets, timelines, and desired outcomes. |
| **Progress Tracking**  | Track workouts, log food intake, and visualize progress towards goals through charts and graphs. Receive personalized feedback on performance. |
| **Social Sharing**   | Connect with friends, share achievements and milestones, and send motivational messages to support each other. |
| **User Profile**   | Manage personal information, view goal history, and adjust account settings. |
| **Dashboard**      | Get a personalized overview of progress, recent activities, and insights based on logged data. |
| **User-Friendly Interface** |  A simple and intuitive interface design ensures a smooth and engaging user experience for all levels of fitness enthusiasts. |
| **Data Security**    |  Robust security measures protect user information through secure storage, encryption, and access controls. |
| **Scalable Architecture** | Designed to handle a growing user base and increasing data volume. |
| **API Integrations** | Potential integration with fitness trackers and other health apps for seamless data synchronization. |
| **Regular Updates**  | The application will be regularly updated with new features and improvements based on user feedback. |

## 📂 Structure
```text
└─ components
   ├─ GoalForm.tsx
   ├─ WorkoutLog.tsx
   ├─ MealLog.tsx
   ├─ ProgressChart.tsx
   ├─ FriendRequest.tsx
   ├─ FriendList.tsx
   ├─ UserProfile.tsx
   ├─ GoalCard.tsx
   ├─ ActivityCard.tsx
   ├─ SocialFeed.tsx
   ├─ Navigation.tsx
   └─ Header.tsx
└─ pages
   ├─ api
   │   ├─ auth
   │   │   └─ [...nextauth].js
   │   ├─ goals
   │   │   └─ [id].js
   │   ├─ workouts
   │   │   └─ [id].js
   │   ├─ meals
   │   │   └─ [id].js
   │   ├─ friends
   │   │   └─ [id].js
   │   └─ user
   │       └─ [id].js
   ├─ _app.tsx
   ├─ dashboard
   │   └─ page.tsx
   ├─ goals
   │   └─ page.tsx
   ├─ workouts
   │   └─ page.tsx
   ├─ meals
   │   └─ page.tsx
   ├─ friends
   │   └─ page.tsx
   └─ profile
       └─ page.tsx
└─ prisma
   ├─ migrations
   │   └─ 20240208004202_init
   │       ├─ migration.sql
   │       └─ migration.prisma
   └─ schema.prisma
└─ styles
   └─ globals.css
└─ utils
   ├─ helpers.js
   └─ index.js
└─ app
   └─ layout.tsx
└─ next.config.mjs
└─ package.json
└─ postcss.config.mjs
└─ tailwind.config.js
└─ tsconfig.json
└─ README.md
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/spectra-ai-codegen/FitLog-txsgnu.git`
2. Navigate to the project directory:
   - `cd FitLog-txsgnu`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the Application
1. Start the development server:
   - `npm start`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `next.config.mjs` or `.env` file.

### 📚 Examples
- **Goal Setting:** Set a weight loss goal of 2 pounds per week, with a target weight of 150 pounds and a timeline of 8 weeks.
- **Progress Tracking:** Log a 30-minute cardio workout, including the type of exercise, duration, intensity, and calories burned.
- **Social Sharing:** Share your latest workout achievement with your friends and send motivational messages to encourage them.

## 🌐 Hosting
### 🚀 Deployment Instructions
1. Install the Heroku CLI:
   - `npm install -g heroku`
2. Login to Heroku:
   - `heroku login`
3. Create a new Heroku app:
   - `heroku create`
4. Deploy the code:
   - `git push heroku main`

### 🔑 Environment Variables
- `DATABASE_URL`: Database connection string for PostgreSQL.

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/users**: Retrieves a list of users.
- **POST /api/users**: Creates a new user.
- **GET /api/users/:id**: Retrieves a specific user's information.
- **PUT /api/users/:id**: Updates a user's information.
- **DELETE /api/users/:id**: Deletes a user.

### 🔒 Authentication
- Use NextAuth.js for user authentication, supporting various providers like Google, Facebook, and GitHub.

### 📝 Examples
- `curl -X GET http://localhost:3000/api/users`

## 📜 License
This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).

## 👥 Authors
- **Author Name** - [Spectra.codes](https://spectra.codes)
- **Creator Name** - [DRIX10](https://github.com/Drix10)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
  <img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</div>