import React from 'react';
import { Avatar,CardContent,CardHeader,CardMedia, Typography,Card } from '@mui/material';

const Blog = ({title,description,imageUrl,userName}) => {
  return (
    <div>
        <Card sx={{ width: "40%" , margin: 'auto', mt:2, padding: 2, boxShadow: "5px 5px 10px #ccc", ":hover:":{
        boxShadow: "10px 10px 20px #ccc"
    }}}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
          {userName}
        </Avatar>
      }
      title={title}
      subheader="September 14, 2016"
    />
    <CardMedia
      component="img"
      height="194"
      image={imageUrl}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="warning">
        <b>{ userName }</b> {" : "} {description}
      </Typography>
    </CardContent>
  </Card></div>
  )
}

export default Blog