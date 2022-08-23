import express from 'express';
import { getAllUser,login, signup } from '../controllers/user-controller';

const router = express.Router();

// "/" singular same route
router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
export default router;