import { Request, Response } from "express";

import chatService from "@services/chatService";

export default async function controller(req: Request, res: Response) {
  try {
    const { curHTML, curCSS, userReq } = req.body;
    const response = await chatService(curHTML, curCSS, userReq);
    res
      .status(200)
      .send({ response: response[0], html: response[1], css: response[2] });
  } catch (error) {}
}
