import { Request, Response } from "express";
import imgUtil from "../../utilities/imageUtil";

const validateParameters = async (
  req: Request,
  res: Response,
  next: Function
) => {
  if (!req.query.filename)
    return res.status(404).send("please provide a valid image name");
  if (!req.query.height || ((req.query.height as unknown) as number) <= 0)
    return res.status(404).send("please provide a valid image height");
  if (!req.query.width || ((req.query.width as unknown) as number) <= 0)
    return res.status(404).send("please provide a valid image width");

  let isExist = await imgUtil.isExists(req.query.filename as string);
  if (!isExist) return res.status(404).send("image does not exist");

  res.locals.filename = req.query.filename as string;
  res.locals.height = Number(req.query.height) as number;
  res.locals.width = Number(req.query.width) as number;

  next();
};

export default { validateParameters };
