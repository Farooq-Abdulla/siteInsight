import * as dotenv from "dotenv";
dotenv.config();
import express from 'express';
import authMiddleware from "../Middlewares/authMiddleware.js";
const router= express.Router();
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
router.post("/memory",authMiddleware, async(req,res)=>{
    const chatModel= new ChatOpenAI({
        model: "gpt-3.5-turbo",
        temperature:0.7
    });
    const prompt= ChatPromptTemplate.fromMessages([
        ["system", "Your name is Jarvis"],
        ("History", "{history}"),
        ["human", "{input}"],
    ]);
    const upstashChatHistory = new UpstashRedisChatMessageHistory({
        sessionId: req.userId,
        config: {
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        },
    });
    const memory = new BufferMemory({
        memoryKey: "history",
        chatHistory: upstashChatHistory,
    });
    const chain = new ConversationChain({
        llm: chatModel,
        prompt,
        memory,
    });
    const ans = await chain.invoke({
        input: req.body.input,
      });
    //   console.log(ans.response);
    res.json(ans.response);

})

export default router;