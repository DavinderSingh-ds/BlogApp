// parent component of Blog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = axios
      .get("http://localhost:4000/api/blog")
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=> {
    sendRequest().then(data=> setBlogs(data.blogs));
  },[]);
  console.log(blogs);
  return (
    <div>
      {/* <Blog /> */}
      {blogs && blogs.map((blog, index) => (
        <Blog title={blog.title} description={blogs.description} imageUrl={blog.imageUrl} userName={blog.user.name}/>
      ))}
    </div>
  )
}

export default Blogs;