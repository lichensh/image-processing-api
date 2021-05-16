import express from "express";
import sharp from "sharp";
import validator from "./routes/middleware/validator";
import resize from "./utilities/imageUtil";
const port = 3000;

const app = express();

app.get(
  "/images",
  validator.validateParameters,
  async (req, res): Promise<sharp.Sharp> => {
    res.type("image/jpg");
    const image = await resize.retrieveImage(
      res.locals.filename,
      res.locals.height,
      res.locals.width
    );
    image.pipe(res);
    return image;
  }
);

app.listen(port, (): void => {
  console.log("listening on ${port}");
});

export default app;
