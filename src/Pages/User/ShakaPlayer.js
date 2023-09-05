import React, { useEffect } from 'react';
import shaka from 'shaka-player';

const ShakaPlayer = ({ mpdKey,clearKey }) => {
  useEffect(() => {
    const videoElement = document.getElementById('shaka-video');
    const player = new shaka.Player(videoElement);
const clearkaa=clearKey.split(":")
const clearKeyId=clearkaa[0]
const keyCode=clearkaa[1]

// Configuration for Shaka Player
    const config = {
      drm: {
        clearKeys: {
          [clearKeyId]: keyCode,
        },
      },
    };

    player.configure(config);

    player.load(mpdKey).then(() => {
      // You can add additional logic here if needed
    });

    return () => {
      // Clean up Shaka Player when the component unmounts
      player.destroy();
    };
  }, []);

  return (
    <div>
      <video id="shaka-video" controls autoPlay />
    </div>
  );
};

export default ShakaPlayer;
