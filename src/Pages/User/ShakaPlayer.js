import React, { useEffect } from 'react';
import shaka from 'shaka-player';
import { useParams } from 'react-router-dom';


const ShakaPlayer = ({ channelName, mpdKey, clearKey }) => {
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

    try {
      player.load(mpdKey).then(() => {
        // You can add additional logic here if needed
      });
    } catch (error) {
      console.error('Error loading content:', error);

      // Handle the error as needed (e.g., show an error message)
    }


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
