import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar";
import NowPlaying from "./components/NowPlaying";
import { usePalette } from "color-thief-react";
import { FaBars } from "react-icons/fa";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [activeTab, setActiveTab] = useState("forYou");
  const [userImage, setUserImage] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const { data: palette } = usePalette(
    `https://cms.samespace.com/assets/${currentSong?.cover}`,
    2,
    "hex",
    { crossOrigin: "anonymous", quality: 10 }
  );

  useEffect(() => {
    fetch("https://cms.samespace.com/items/songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data.data);
        setCurrentSong(data.data[0]);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  useEffect(() => {
    if (palette) {
      document.body.style.background = `linear-gradient(to bottom, ${palette[0]}, ${palette[1]})`;
    }
  }, [palette]);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        setUserImage(data.results[0].picture.medium);
      })
      .catch((error) => console.error("Error fetching user image:", error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Container fluid className="app-container d-flex flex-column">
      <div className="top-left">
        <div className="spotify-logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="Spotify Logo"
            style={{ width: "120px", height: "auto" }}
          />
        </div>
      </div>
      <Row className="w-100 mt-3">
        <Col
          md={6}
          className={`d-flex justify-content-center mb-4 mb-md-0 ${
            showSidebar ? "d-block" : "d-none d-md-block"
          }`}
        >
          <Sidebar
            songs={songs}
            setCurrentSong={setCurrentSong}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <NowPlaying
            currentSong={currentSong}
            songs={songs}
            setCurrentSong={setCurrentSong}
          />
        </Col>
      </Row>
      {userImage && (
        <div className="bottom-left">
          <img
            src={userImage}
            alt="User"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </div>
      )}
      <Button
        className="menu-button d-md-none"
        onClick={toggleSidebar}
        variant="outline-light"
      >
        <FaBars />
      </Button>
    </Container>
  );
}

export default App;
