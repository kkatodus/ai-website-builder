import { Request, Response } from "express";

import chatService from "@services/chatService";
import sessionModel, { IConversation } from "@models/sessionModel";

export default async function controller(req: Request, res: Response) {
  try {
    const { curHTML, curCSS, userReq, sessionID } = req.body;
    const response = await chatService(curHTML, curCSS, userReq);
    // also need to update the database with this chat history
    const newHtml = response[1];
    const newCss = response[2];

    const userReqMessage: IConversation = {
      creator: "user",
      message: userReq,
      timestamp: new Date(),
    };
    const botResponse: IConversation = {
      creator: "bot",
      message: response[0],
      timestamp: new Date(),
    };

    const updateSession = await sessionModel.findByIdAndUpdate(sessionID, {
      $push: { conversationHistory: { $each: [userReqMessage, botResponse] } },
      htmlCode: newHtml,
      cssCode: newCss,
      new: true,
    });

    res
      .status(200)
      .send({ response: response[0], html: response[1], css: response[2] });
  } catch (error) {
    console.log("error in chat controller", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
