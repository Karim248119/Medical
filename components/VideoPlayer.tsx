import React, { useRef } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId }: any) => {
  const playerRef = useRef(null);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubePlayer;
