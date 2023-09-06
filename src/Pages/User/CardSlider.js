import React from 'react';
import { Grid, Card, CardMedia, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../App.css"
const ImageSlider = ({ images }) => {
  return (
   
    <div className="carousel carousel-center rounded-box">
  <div  className="carousel-item m-5  backdrop:blur-lg">
    <img src="https://th.bing.com/th?id=OIF.%2fiCgth%2fT81LBcKEc9kRpIA&pid=ImgDet&rs=1" alt="Pizza" />
    
  </div> 
 
</div>
                
                     
      
       
  );
};

export default ImageSlider;
