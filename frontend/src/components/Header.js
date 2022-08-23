import React, { useState } from 'react'
import { AppBar,Typography, Box, Button,Toolbar,Tabs,Tab} from "@mui/material";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar 
        position="sticky"
        sx={{background: "linear-gradient(90deg, rgba(0,36,35,1) 0%, rgba(9,121,80,1) 35%, rgba(0,212,255,1) 100%);"}}>
        <Toolbar>
            <Typography variant="h4">BlogApp</Typography>
            { isLoggedIn && <Box display="flex" marginLeft={'auto'} marginRight='auto'>
              <Tabs textColor="inherit" value={value} onChange={(e,val)=> setValue(val)}>
                  <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
                  <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                  <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"/>
              </Tabs>
            </Box>}
            
            <Box display="flex" marginLeft="auto">
                { !isLoggedIn && <>
                  <Button 
                    LinkComponent={Link} to="/auth"
                    variant='contained' sx={{margin:1,borderRadius: 1}} color="warning">
                  Login
                  </Button>
                  <Button variant='contained' sx={{margin:1,borderRadius: 1}} color="warning">
                    SignUp
                  </Button>
                </>
                }
                { isLoggedIn && 
                  <Button
                    onClick={() => dispatch(authActions.logout())}
                    LinkComponent={Link} to="/auth"
                    variant='contained' sx={{margin:1,borderRadius: 1}} color="warning">
                  LogOut
                </Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header