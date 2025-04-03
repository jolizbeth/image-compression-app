## Description
A simple image compression web app built with Next.js and Material UI. 
Users can upload an image, which is then compressed using the Sharp library on the backend. 

## Features
- Upload and preview images before compression
- Backend image compression using Sharp
- Responsive UI using Material UI
- Next.js API routes for handling uploads and compression
  
## Requirements 
- Node
- NPM
- NextJs
- React

## Installation Steps

1. Clone the repository:
```
git clone https://github.com/yourusername/image-compression-mini-app.git
cd image-compression-mini-app
```
2. Install dependencies:
```
npm install
```
3. Run the development server:
```sh
npm run dev
```
4. Open your browser and go to http://localhost:3000


## Architectural Decisions & Reasoning

I structured the project to keep the front end clean and component-based. The API routes are separated into upload and compression functions to maintain clarity and separation of concerns. I used Sharp for image compression, a fast and efficient library for resizing and optimizing images. Assets and public files are organized to avoid clutter. This setup makes it easier to manage, debug, and expand later. 

I used Material UI for its pre-built components and design system, which helped streamline the UI development while maintaining a clean and modern look.

## Run App 
```
npm run build && npm start
```

## Limitations
Since time was limited, I focused on getting the core functionality working while keeping the code structured and easy to maintain. I used Material UI to speed up the UI development and Next.js for better performance.
