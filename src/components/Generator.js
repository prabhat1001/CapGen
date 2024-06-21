import React, { useState, useEffect, useRef } from "react";
import Magic from "../assets/magic.png";
import "./styles.css";

/**
 * The `Generator` function in JavaScript creates a captioning tool for YouTube videos, allowing users
 * to input video URLs, add captions with timestamps, and view the video with captions overlaid.
 * @returns The `Generator` function returns a JSX structure that represents a web application
 * interface for a captioning tool for YouTube videos. The interface includes input fields for entering
 * a YouTube video URL, buttons for submitting the URL and captions, a video player section with a
 * caption overlay, and fields for adding and editing captions with corresponding timestamps.
 */
function Generator() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef(null);
  const [currentCaption, setCurrentCaption] = useState("");

  useEffect(() => {
    if (showVideo && videoId) {
      loadYouTubePlayer();
    }
  }, [showVideo, videoId]);

  const extractYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const loadYouTubePlayer = () => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  };

  const createPlayer = () => {
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    playerRef.current = new window.YT.Player("player", {
      height: "365",
      width: "640",
      videoId: videoId,
      events: {
        onStateChange: onPlayerStateChange,
        onReady: onPlayerReady,
      },
    });
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const player = event.target;
      const interval = setInterval(() => {
        const currentTime = player.getCurrentTime();
        updateCaption(currentTime);
      }, 500);
      playerRef.current.interval = interval;
    } else {
      clearInterval(playerRef.current.interval);
    }
  };

  const updateCaption = (currentTime) => {
    for (let i = 0; i < timestamps.length; i++) {
      const { start, end } = timestamps[i];
      if (currentTime >= parseTime(start) && currentTime <= parseTime(end)) {
        setCurrentCaption(captions[i]);
        return;
      }
    }
    setCurrentCaption("");
  };

  const parseTime = (timeString) => {
    const parts = timeString.split(":");
    const seconds =
      parseInt(parts[0], 10) * 3600 +
      parseInt(parts[1], 10) * 60 +
      parseInt(parts[2], 10);
    return seconds;
  };

  const addCaption = () => {
    setCaptions([...captions, ""]);
    setTimestamps([...timestamps, { start: "", end: "" }]);
  };

  const handleCaptionChange = (index, value) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  const handleTimestampChange = (index, startOrEnd, value) => {
    const newTimestamps = [...timestamps];
    newTimestamps[index][startOrEnd] = value;
    setTimestamps(newTimestamps);
  };

  const handleSubmit = () => {
    const id = extractYouTubeVideoId(videoUrl);
    if (id) {
      setVideoId(id);
      setSubmitted(true);
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const handleCaptionSubmit = () => {
    setShowVideo(false);
    setTimeout(() => {
      setShowVideo(true);
    }, 0);
  };

  return (
    <div className="main-cont">
      <h1 className="main-heading">
        Discover what <span> CapGen</span> is ☘️
      </h1>
      <h3 className="sub-heading">
        Your Go-To Captioning Tool for All YT Videos
      </h3>

      <div className="input-box">
        <input
          className="url-input"
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          disabled={submitted}
        />
        <button
          className="submit-url"
          onClick={handleSubmit}
          disabled={submitted}
          style={{ cursor: submitted ? "not-allowed" : "pointer" }}
        >
          Submit URL
        </button>
      </div>

      {submitted && (
        <div className="btn-box-cont">
          <div className="btn-box">
            <button
              className="add-cap"
              onClick={addCaption}
              style={{ cursor: "pointer" }}
            >
              +
            </button>
            <button
              className="submit-cap"
              onClick={handleCaptionSubmit}
              style={{ cursor: "pointer" }}
            >
              Submit Captions
            </button>
          </div>

          {timestamps.map((timestamp, index) => (
            <div className="cap-gen-box" key={index}>
              <input
                className="timestamps"
                type="text"
                value={timestamp.start}
                onChange={(e) =>
                  handleTimestampChange(index, "start", e.target.value)
                }
                placeholder="Start time (00:00:01)"
              />
              <input
                className="timestamps"
                type="text"
                value={timestamp.end}
                onChange={(e) =>
                  handleTimestampChange(index, "end", e.target.value)
                }
                placeholder="End time (00:00:05)"
              />
              <textarea
                className="cap-area"
                value={captions[index]}
                onChange={(e) => handleCaptionChange(index, e.target.value)}
                placeholder="Enter caption"
              />
            </div>
          ))}
        </div>
      )}

      {showVideo && (
        <div className="vid-section">
          <div className="img-icon">
            <img src={Magic} alt="magic" />
          </div>
          <div className="vid-player-cont">
            <div id="player" className="youtube-player" />
            <div className="caption-overlay">{currentCaption}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generator;
