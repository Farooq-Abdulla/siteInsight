import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
const router= express.Router();
import jwt from "jsonwebtoken";
import zod from "zod";
import User from "../DB/usersSchema.js";
import { hash, compareSync } from "bcrypt";


const signupBody = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().email(),
    password: zod.string(),
  });
  
  router.post("/signup", async (req, res) => {
    try {
      const signupDetails = req.body;
      const parsedDetails = signupBody.safeParse(signupDetails);
      if (!parsedDetails.success) {
        return res.status(401).json({ message: "Incorrect Inputs" });
      }
      const existingUser = await User.findOne({ username: signupDetails.username });
      if (existingUser) {
        return res.status(411).json({ message: "Email already taken / Incorrect Inputs" });
      }
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: await hash(req.body.password, 10),
      });
      const payload = { userId: user._id };
  
      const token = jwt.sign(payload, process.env.JWT_TOKEN,);
      res.json({
        message: "user created successfully",
        token: token,
      });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    //   console.log("Error occurred:", error);
      
    }
  });
  

  const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
  });
  
  router.post("/signin", async (req, res) => {
    try {
      const parsedData = signinBody.safeParse(req.body);
      if (!parsedData) {
        return res.status(401).json({ message: "Incorrect Inputs"});
      }

      const user = await User.findOne({username: req.body.username});

      if(!user) {
        return res.status(401).json({message: "wrong Username"});
      }
      const payload = { userId: user._id };

      if (compareSync(req.body.password, user.password)) {
        const token1 = jwt.sign(payload, process.env.JWT_TOKEN);
        return res.json({token: token1});
      } else {
        return res.status(401).json({message: "wrong Password"});
      }

    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });

export default router;
