import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port= process.env.PORT

import userRouter from "./routes/userRouter.js";
app.use("/api/v1/user", userRouter);
import chatRouter from "./routes/chatRouter.js";
app.use("/api/v1/chat", chatRouter);

app.listen(port, () => {console.log(`Server is running on port ${port}`)});


