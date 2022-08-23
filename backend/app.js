import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import cors from 'cors';

const app = express();

//middlewares 
 app.use(cors());
// signup rawbody data is converted by this express json
app.use(express.json());
app.use("/api/user", router)   // http://localhost:4000/api/user/
app.use("/api/blog", blogRouter);

mongoose.connect(
    "mongodb+srv://davinder:Ps838H319E9cXreL@cluster0.ti0oykk.mongodb.net/Blog?retryWrites=true&w=majority"
    )
    .then(()=>app.listen(4000))
    .then(()=>
        console.log("Connected To Database and Listening to Locallhost 4000")
        )
        .catch((err)=>console.log(err));


// username   davinder
//Ps838H319E9cXreL     pwd for mongodb





// for learnning purpose
// //middlewares   "url /api" , request , response, next 
// app.use("/api",(req,res, next) => {
//     res.send("Hello World!");
// });