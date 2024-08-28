import React, { useState, useEffect, useRef } from "react";
import { Button, ProgressBar } from "react-bootstrap";

function Player({ currentSong, songs, setCurrentSong }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(currentSong?.url));

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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

  return (
    <div className="player">
      <ProgressBar
        now={progress}
        onClick={handleSeek}
        style={{ cursor: "pointer" }}
      />
      <div className="controls">
        <Button onClick={playPrevious}>Previous</Button>
        <Button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</Button>
        <Button onClick={playNext}>Next</Button>
      </div>
    </div>
  );
}

export default Player;
