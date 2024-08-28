import React, { useState, useEffect, useRef } from "react";
import { Card, ProgressBar } from "react-bootstrap";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaEllipsisH,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import "../NowPlaying.css";

function NowPlaying({ currentSong, songs, setCurrentSong }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Added state for mute
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong?.url);
    } else {
      audioRef.current.src = currentSong?.url;
    }

    if (isPlaying) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.muted = isMuted; // Update mute state
  }, [isMuted]);

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousSong =
      songs[(currentIndex - 1 + songs.length) % songs.length];
    setCurrentSong(previousSong);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="now-playing">
      <div className="card-content">
        {/* Song Details */}
        <div className="song-details">
          <Card.Title className="song-title">{currentSong?.name}</Card.Title>
          <Card.Text className="artist-name">{currentSong?.artist}</Card.Text>
        </div>

        {/* Image and Progress Bar */}
        <div className="image-progress">
          <Card.Img
            className="album-cover"
            variant="top"
            src={`https://cms.samespace.com/assets/${currentSong?.cover}`}
          />
          <div className="progress-wrapper">
            <ProgressBar
              now={progress}
              onClick={handleSeek}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="controls">
          <button className="control-button side-control">
            <FaEllipsisH />
          </button>
          <button
            onClick={playPrevious}
            className="control-button circle-button"
          >
            <FaBackward />
          </button>
          <button
            onClick={togglePlayPause}
            className="control-button circle-button play-pause-button"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={playNext} className="control-button circle-button">
            <FaForward />
          </button>
          <button onClick={toggleMute} className="control-button side-control">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default NowPlaying;
