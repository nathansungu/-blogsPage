import { Request, Response } from "express";

const logout = (req: Request, res: Response) => {
  res.clearCookie("AuthTokenCodey");
  res.status(200).json({ message: "Loged out successfuly" });
};

export default logout;
