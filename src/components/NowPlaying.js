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
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentSong?.url);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = currentSong?.url;
    }

    if (isPlaying) {
      audioRef.current.play();
    }

    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.pause();
    };
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.muted = isMuted;
  }, [isMuted]);

  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.currentTime = currentTime;
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) *
      audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
    setCurrentTime(0);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousSong =
      songs[(currentIndex - 1 + songs.length) % songs.length];
    setCurrentSong(previousSong);
    setCurrentTime(0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="now-playing">
      <div className="card-content">
        <div className="song-details">
          <Card.Title className="song-title">{currentSong?.name}</Card.Title>
          <Card.Text className="artist-name">{currentSong?.artist}</Card.Text>
        </div>

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
