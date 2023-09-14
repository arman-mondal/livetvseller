import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {MenuItem,TextField,FormControl,Button,Select,InputLabel} from '@mui/material';


const ChannelEdit = () => {
  // State variables for channel data and form fields
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
  const [channelName, setChannelName] = useState('');
  const [mpdKey, setMpdKey] = useState('');
  const [clearKey, setClearKey] = useState('');
  const [catergory, setCatergory] = useState('');

  // Fetch the list of channels from your API when the component mounts
  useEffect(() => {
    // Fetch channels and set the 'channels' state
    // Replace 'fetchChannels' with your actual API call
    axios.get('https://api.dcvip.one/get/channels')
    .then((response) => {
      setChannels(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  // Function to handle channel selection
  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setChannelName(channel.channelName);
    setMpdKey(channel.mpdKey);
    setClearKey(channel.clearKey);
    setCatergory(channel.category);
  };

  // Function to update a channel
  const handleChannelUpdate = () => {
    // Create an object with updated channel data
    const updatedChannel = {
      ...selectedChannel,
      channelName: channelName,
      mpdKey: mpdKey,
      catergory: catergory,
      clearKey: clearKey,
    };
    axios.put(`https://api.dcvip.one/api/edit/channels/${selectedChannel._id}`, updatedChannel)
    .then((response) => {
      if (response.status === 200) {
        // Channel updated successfully, you can show a success message or perform any necessary actions
        alert('Channel updated successfully');
      } else {
        // Handle errors, show an error message, etc.
        alert('Error updating channel:', response.data);
      }
    })
    .catch((error) => {
      console.error('Error updating channel:', error);
    });
    // Update the channel on the server
    // Replace 'updateChannel' with your actual API call
  };

  return (
    <div>
      <h2>Edit Channels</h2>
      <div>
        {/* Display a list of channels for selection */}
        <ul>
          {channels.map((channel) => (
            <li key={channel._id}>
              <Button variant='contained' onClick={() => handleChannelSelect(channel)}>
                {channel.channelName}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Form for editing selected channel */}
        {selectedChannel._id && (
          <div>
            <h3>Edit Channel: {selectedChannel.channelName}</h3>
            <TextField
        required
        sx={{ m: 2 }}
        id="channelName"
        label="Channel Name"
        type="text"
        name="channelName"
        value={channelName}
        onChange={(e)=> setChannelName(e.target.value)}
      />

      <TextField
        required
        sx={{ m: 2 }}
        id="mpdKey"
        label="mpdKey"
        name="mpdKey"
        type="text"
        value={mpdKey}
        onChange={(e)=> setMpdKey(e.target.value)}
      />

      <TextField
        required
        sx={{ m: 2 }}
        id="clearKey"
        label="clearKey"
        name="clearKey"
        type="text"
        value={clearKey}
        onChange={(e)=> setClearKey(e.target.value)}
      />

      <FormControl required sx={{ m: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
        required
          value={catergory}
          onChange={(e)=> setCatergory(e.target.value)}
          name="category"
        >
          <MenuItem value="Champions League">Champions League</MenuItem>
          <MenuItem value="LIVE SERIE A">LIVE SERIE A</MenuItem>
          <MenuItem value="SKY CALCIO">SKY CALCIO</MenuItem>
          <MenuItem value="CANALI DAZN">CANALI DAZN</MenuItem>
          <MenuItem value="SKY SPORT">SKY SPORT</MenuItem>
          <MenuItem value="SKY CINEMA">SKY CINEMA</MenuItem>
          <MenuItem value="SKY ALTRI">SKY ALTRI</MenuItem>
        </Select>
      </FormControl>


      <Button variant="contained" onClick={handleChannelUpdate}>
        UPDATE
      </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelEdit;
