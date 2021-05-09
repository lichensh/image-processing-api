import { Request, Response } from "express";

const validateParameters = (req: Request, res: Response, next: Function) => {
  if (!req.query.filename)
    return res.status(404).send("please provide a valid image name");
  if (!req.query.height || ((req.query.height as unknown) as number) <= 0)
    return res.status(404).send("please provide a valid image height");
  if (!req.query.width || ((req.query.width as unknown) as number) <= 0)
    return res.status(404).send("please provide a valid image width");

  res.locals.filename = req.query.filename as string;
  res.locals.height = Number(req.query.height) as number;
  res.locals.width = Number(req.query.width) as number;

  next();
};

export default { validateParameters };
