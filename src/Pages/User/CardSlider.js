import React from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../App.css"
const ImageSlider = ({ images }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Image Slider
        </Typography>
      </Grid>
      <Grid item className='w-full flex items-center'  lg={2}>
        <Carousel showThumbs={false}>
          {images.map((image, index) => (
            <div key={index}>
              <Card>
                <CardMedia
                  component="img"
                  alt={`Image ${index}`}
                  height="200"
                  image={image}
                />
                
              </Card>
             
            </div>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default ImageSlider;
