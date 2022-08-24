import React from 'react';
import { Avatar,CardContent,CardHeader,CardMedia, Typography,Card, IconButton, Box } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = ({title,description,imageUrl,userName,isUser,id}) => {
  const navigate = useNavigate();
  const handleEdit = (e) => {
    navigate(`myBlogs/${id}`);
  }

  const deleteRequest = async ()=> {
    const res = await axios.delete(`http://localhost:4000/api/blog/${id}`).catch(err => console.log(err));
    const data = await res.data;
    return data;
  } 
  const handleDelete = (e) => {
    deleteRequest().then(data=> console.log(data));
  }

  console.log(title,isUser);
  return (
    <div>
        <Card sx={{ 
            width: "40%" , 
            margin: 'auto', 
            mt:2,
            padding: 2, 
            boxShadow: "5px 5px 10px #ccc", ":hover:":{
            boxShadow: "10px 10px 20px #ccc"
    }}}>
    {isUser && (
      <Box display="flex">
        <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditOutlineIcon /></IconButton>
        <IconButton><DeleteForeverIcon /></IconButton>
      </Box>
    )}  
    <CardHeader
      avatar={
        <Avatar onClick={handleDelete} sx={{ bgcolor: 'red' }} aria-label="recipe">
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