import imageUtil from "../utilities/imageUtil";
import fs from "fs";
import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("if image doesnt exist", async (done) => {
    const response = await request.get(
      "/images?filename=f&height=200&width=200"
    );
    expect(response.status).toBe(500);

    done();
  });
  it("image exist", async (done) => {
    const response = await request.get(
      "/images?filename=fjord&height=200&width=200"
    );
    expect(response.status).toBe(200);

    done();
  });
});

describe("Test image utility", () => {
  it("retrieve image by first time properties", async () => {
    let image = await imageUtil.retrieveImage("fjord", 400, 400);
    expect(image).toBeTruthy();
  });

  it("images by second time properties should exist in cached", async () => {
    expect(fs.existsSync("assests/cache/fjord_400_400.jpg")).toBeTruthy();
  });
});
