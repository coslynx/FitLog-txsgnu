-- Create the Users table
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Create the Goals table
CREATE TABLE Goals (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  target INT NOT NULL,
  progress INT,
  timeline TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  description TEXT,
  userId INT REFERENCES Users(id) ON DELETE CASCADE
);

-- Create the Workouts table
CREATE TABLE Workouts (
  id SERIAL PRIMARY KEY,
  workoutType VARCHAR(255) NOT NULL,
  duration INT NOT NULL,
  intensity VARCHAR(255) NOT NULL,
  caloriesBurned INT NOT NULL,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  description TEXT,
  userId INT REFERENCES Users(id) ON DELETE CASCADE
);

-- Create the Meals table
CREATE TABLE Meals (
  id SERIAL PRIMARY KEY,
  foodName VARCHAR(255) NOT NULL,
  foodCalories INT NOT NULL,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  description TEXT,
  userId INT REFERENCES Users(id) ON DELETE CASCADE
);

-- Create the FriendRequests table
CREATE TABLE FriendRequests (
  id SERIAL PRIMARY KEY,
  senderId INT REFERENCES Users(id) ON DELETE CASCADE,
  receiverId INT REFERENCES Users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Create the SocialUpdates table
CREATE TABLE SocialUpdates (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES Users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- Create the Friends table (many-to-many relationship between Users)
CREATE TABLE Friends (
  id SERIAL PRIMARY KEY,
  userId INT REFERENCES Users(id) ON DELETE CASCADE,
  friendId INT REFERENCES Users(id) ON DELETE CASCADE,
  UNIQUE (userId, friendId)
);