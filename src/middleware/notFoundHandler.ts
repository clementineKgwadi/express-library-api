import { Request,Response, NextFunction } from "express";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = { status: 404, message: `The requested URL ${req.originalUrl} was not found on this server.` };
  next(error);
};
