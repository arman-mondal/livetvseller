import React, { useState } from 'react';
import Modal from 'react-modal'; // You may need to install a modal library
import ShakaPlayer from './ShakaPlayer'; // Your ShakaPlayer component import
import "../../App.css"
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card"

Modal.setAppElement('#root'); // Set the app root for the modal library
const ChannelList = ({ channels }) => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (channel) => {
    setSelectedChannel(channel);
    setModalIsOpen(true);
    sessionStorage.setItem('mpdKey',channel.mpdKey)
    
    sessionStorage.setItem('clearKey',channel.clearKey)
  };

  const closeModal = () => {
    setSelectedChannel(null);
    setModalIsOpen(false);
  };

  return (
    <div className="carousel carousel-center rounded-box">
    {channels.map((channel, index) => (
      <div key={index} className="carousel-item containner m-5" onClick={() => openModal(channel)}>
       
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={"https://api.dcvip.one/public" + channel.imageUrl}
        title={channel.channelName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {channel.channelName}
        </Typography>
   
      </CardContent>
     
    </Card>
        </div>
      ))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Channel Player"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedChannel && (
          <div className="modal-content">
            <h2>{selectedChannel.channelName}</h2>
            <ShakaPlayer  open={modalIsOpen}    onClose={closeModal} mpdKey={selectedChannel.mpdKey} clearKey={selectedChannel.clearKey} />
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ChannelList;
