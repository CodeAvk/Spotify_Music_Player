# Music Player UI

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://jazzy-mandazi-4601af.netlify.app/)

This is a Music Player UI built using React.js. The application interface matches the provided design and is fully responsive. It uses REST API to fetch the list of songs and provides functionalities such as searching, controlling music playback, tab switching, and more.

## 🚀 Live Demo

Check out the live demo [here](https://jazzy-mandazi-4601af.netlify.app/).

## 📑 Features

- **Responsive Design**: The application is fully responsive. On smaller screens, the player component acts as the main interface with a menu button to show the list of songs.
- **REST API Integration**: The application fetches data from the provided REST API to load the list of songs.
- **Dynamic Background Gradient**: The background gradient color changes according to the cover image of the current song.
- **Persistent Music Playback**: Music continues playing even if the user navigates to another browser tab.
- **Fluid and Interactive UI**: Includes animations and transitions for a smooth and engaging user experience, such as list loading animations and background color transitions.

## 🎯 Functionality

- **Search**: Easily search through the list of songs.
- **Music Control**: Play, pause, skip to the next or previous track.
- **Tab Navigation**: Switch between different tabs like "For You" and "Top Tracks".
- **Seeker Control**: Adjust the playback position using the seeker.

## 🛠️ Technologies Used

- **React.js**: The core framework used to build the user interface.
- **CSS/SCSS**: For styling the components and ensuring responsiveness.
- **REST API**: Used to fetch song data.
- **Animations/Transitions**: Implemented for fluid and interactive UI elements.

## ⚙️ Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone (https://github.com/CodeAvk/Spotify_Music_Player.git)
    cd Spotify_Music_Player
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the application:**

    ```bash
    npm start
    ```

4. **Build for production:**

    ```bash
    npm run build
    ```

## 🌐 API Information

- **API Endpoint**: [https://cms.samespace.com/items/songs](https://cms.samespace.com/items/songs)
- **Cover Image Fetching**: Use the `cover` key from the API response to fetch images using the URL format:
  ```plaintext
  https://cms.samespace.com/assets/{COVER_IMAGE_ID}
