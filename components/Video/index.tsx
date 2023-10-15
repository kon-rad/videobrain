import React from "react";
import ReactPlayer from "react-player";
import "./Video.module.css";

export function Video({ video, start, end }) {
  return (
    <div className="video">
      <ReactPlayer
        className="react-player"
        url={video?.data?.hls.video_url}
        controls
        config={{
          hlsOptions: {
            startPosition: start,
            endPosition: end,
          },
        }}
      />
    </div>
  );
}
