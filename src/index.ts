import express from "express";
import validator from "./routes/middleware/validator";
import resize from "./utilities/imageUtil";
const port = 3000;

const app = express();

app.get("/images", validator.validateParameters, async (req, res) => {
  try {
    res.type("image/jpg");
    const image = await resize.retrieveImage(
      res.locals.filename,
      res.locals.height,
      res.locals.width
    );
    image.pipe(res);
  } catch (err) {
    console.log(err);
    res.status((err.status as number) || 500).send(err.message);
  }
});

app.listen(port, () => {
  console.log("listening on ${port}");
});

export default app;
