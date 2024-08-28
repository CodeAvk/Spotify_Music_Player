import React, { useState } from "react";
import { ListGroup, Form, Nav } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function Sidebar({ songs, setCurrentSong, activeTab, setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>
        {`
          .search-input::placeholder {
            color: white !important;
            opacity: 0.7;
          }
        `}
      </style>
      <div
        className="sidebar p-3"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0)", // Transparent black background
          minHeight: "100vh",
        }}
      >
        <Nav variant="tabs" className="mb-3" style={{ borderBottom: "none" }}>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "forYou"}
              onClick={() => setActiveTab("forYou")}
              style={{
                color: activeTab === "forYou" ? "white" : "black",
                backgroundColor: "transparent", // Ensure background is transparent
                border: "none", // Remove border
                fontWeight: activeTab === "forYou" ? "bold" : "normal",
                fontSize: "1.2rem",
              }}
            >
              For You
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === "topTracks"}
              onClick={() => setActiveTab("topTracks")}
              style={{
                color: activeTab === "topTracks" ? "white" : "black",
                backgroundColor: "transparent", // Ensure background is transparent
                border: "none", // Remove border
                fontWeight: activeTab === "topTracks" ? "bold" : "normal",
                fontSize: "1.2rem",
              }}
            >
              Top Tracks
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div style={{ position: "relative" }}>
          <Form.Control
            type="text"
            placeholder="Search Song, Artist"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3 search-input"
            style={{
              backgroundColor: "#282218",
              color: "white",
              border: "none",
              borderRadius: "5px",
              paddingRight: "30px", // Space for the icon
            }}
            onFocus={(e) => (e.target.style.boxShadow = "none")}
          />
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              color: "#bbb",
            }}
          />
        </div>
        <ListGroup>
          {filteredSongs.map((song) => (
            <ListGroup.Item
              key={song.id}
              onClick={() => setCurrentSong(song)}
              action
              style={{
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent background
                border: "none",
                padding: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt={song.name}
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <div>
                <div>{song.name}</div>
                <div style={{ fontSize: "smaller", color: "#bbb" }}>
                  {song.artist}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default Sidebar;
