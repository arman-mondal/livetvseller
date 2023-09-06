
    import React, { useEffect, useRef, useState } from 'react';
    import shaka from 'shaka-player';
    import Modal from '@mui/material/Modal';
    import Box from '@mui/material/Box';
    
    const ShakaPlayerModal = ({ open, onClose }) => {
      const videoElementRef = useRef(null);
      const [player, setPlayer] = useState(null);
    const mpdKey =sessionStorage.getItem('mpdKey')
    const clearKey=sessionStorage.getItem('clearKey')
      useEffect(() => {
          const keys=clearKey.split(":");
    const id=keys[0]
    const key=keys[1]
        const videoElement = videoElementRef.current;
        shaka.polyfill.installAll();
        if (shaka.Player.isBrowserSupported()) {
          const shakaPlayer = new shaka.Player(videoElement);
          shakaPlayer.configure({
            drm: {
              clearKeys: {
                [id]: key,
              },
            },
          });
    
          setPlayer(shakaPlayer);
    
          return () => {
            if (shakaPlayer) {
              shakaPlayer.unload();
              shakaPlayer.destroy();
            }
          };
        } else {
          console.error('Browser not supported by Shaka Player.');
        }
      }, [mpdKey, clearKey]);
    
      useEffect(() => {
        if (player && open) {
          player.load(mpdKey).then(() => {
            // Player loaded
          });
        }
      }, [player, mpdKey, open]);
    
      const handleClose = () => {
        if (player) {
          player.unload();
        }
        onClose();
      };
    
      return (
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <video ref={videoElementRef} controls autoPlay />
          </Box>
        </Modal>
      );
    };
    
    export default ShakaPlayerModal;
    