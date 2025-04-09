# 🎮 Interactive Demo Session
# 🛠️ Debug the Chicken Crossing Game 🐔

## 📝 Overview
In this interactive session, students will be divided into teams to debug and fix a TypeScript-based browser game. Teams will have 60 minutes to make the game fully functional according to the requirements, followed by a presentation of their solutions.

## 🎯 Game Description
The game is a simple "Chicken Crossing Road" implementation where players control a chicken trying to cross a busy road while avoiding cars. The game continues indefinitely until the chicken collides with a car.

## ⏱️ Session Format
- Duration: 60 minutes for debugging
- Team Size: 3-4 students per team
- Presentation: Each team will demonstrate their working solution

## 🏆 Scoring Rules
Base points for presentation order:
- First team: 2000 points
- Second team: 1900 points
- Third team: 1800 points
- Fourth team: 1700 points
- Fifth team: 1600 points
- Sixth team and after : 1500 points

### 🧮 Final Score Calculation
Final Score = (Number of Completed Requirements / 5) × Base Points

Example calculations:
- First team completes 4/5 requirements: 4/5 × 2000 = 1600 points
- Second team completes all requirements: 5/5 × 1900 = 1900 points
- Third team completes 3/5 requirements: 3/5 × 1800 = 1080 points

### Important Notes:
- Teams must complete ALL 5 requirements to be eligible for submission
- Once a team completes all requirements, they should immediately proceed to the main room to submit their presentation order
- No code changes are allowed after submission
- Presentation order is final and based on first-come-first-serve basis
- Teams should carefully consider the trade-off between speed and completeness
- Partial implementation of a requirement will not be counted
- Each requirement must be fully functional to be counted
- Requirements will be verified during presentation

## ✅ Game Requirements

### 1. 🐔 Chicken Movement
- Chicken must be able to move in all four directions:
  - Up (forward)
  - Down (backward)
  - Left
  - Right
- Movement should be controlled using arrow keys

### 2. 🚗 Car Generation
- Cars must spawn continuously with:
  - Random quantity
  - Random directions (left to right or right to left)
  - Random speeds
  - 0.2-second spawn interval
  - Cars should appear from both sides of the road

### 3. 💥 Collision Detection
- Game ends when the chicken collides with any car

### 4. 📊 Scoring System
- Score increases by 1 point each time the chicken successfully crosses the road
- Chicken resets to starting position after each successful crossing
- Game continues indefinitely until collision

### 5. 🔄 Restart Functionality
- Add a restart button that appears on the game over screen
- Clicking restart should:
  - Reset the score to 0
  - Reset the chicken position
  - Clear all cars
  - Start a new game

## 🛠️ Technical Stack
- TypeScript
- HTML5 Canvas
- Webpack
- Node.js

## 🚀 Getting Started
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```


