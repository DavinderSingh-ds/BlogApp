import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Blog from './Blog';

const UserBlogs = () => {
  const [user,setUser] = useState();
  const id = localStorage.getItem("userId");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:4000/api/blog/user/${id}`)
      .catch(err=> console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=> {
    sendRequest().then(data=> setUser(data.user));
  },[sendRequest]);
  console.log(user);
  return (
    <div>
      {user && user.blogs && user.blogs.map((blog, index) => (
        <Blog key={index}
          title={blog.title} 
          description={blog.description} 
          imageUrl={blog.image} 
          userName={user.name}
        />
      ))}
    </div>
  )
}

export default UserBlogs