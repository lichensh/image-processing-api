"use strict";
import fs from "fs";
const fspromise = require("fs").promises;
import sharp from "sharp";

// retrieve the requested image
const retrieveImage = async (
  imageName: string,
  height: number,
  width: number
) => {
  let isExist = await isExists(imageName);
  if (!isExist) {
    throw new Error(
      JSON.stringify({
        status: 404,
        message: "Image not found.",
      })
    );
  }

  let isCacheExist = await isCacheExists(imageName, height, width);

  let imageUrl = getImageUrl(imageName, height, width, isCacheExist);
  const readStream = fs.createReadStream(imageUrl);
  let transform = sharp().resize({
    width: width as number,
    height: height as number,
  });
  if (!isCacheExist) {
    createCache(imageName, width, height);
  }
  return readStream.pipe(transform);
};

//get the image full path
const getImageUrl = (
  imageName: string,
  height?: number,
  width?: number,
  isCached?: boolean
): string => {
  if (!isCached) {
    return "./assests/full/" + imageName + ".jpg";
  } else {
    return "./assests/cache/" + imageName + "_" + width + "_" + height + ".jpg";
  }
};

// create the cached image in cache folder
const createCache = async (
  imageName: string,
  width: number,
  height: number
): Promise<void> => {
  let fileData = await fspromise.open(
    getImageUrl(imageName, height, width, true),
    "w"
  );

  await fileData.write(
    await sharp(getImageUrl(imageName)).resize(width, height).toBuffer()
  );

  await fileData.close();
};

// check if the images exist
const isExists = async (imageName: string): Promise<boolean> => {
  try {
    let url = getImageUrl(imageName);
    let cacheImage = await fspromise.open(url, "r");
    cacheImage.close();
    return true;
  } catch (e) {
    console.log("not exists");
    return false;
  }
};

// check if the cache images exist
const isCacheExists = async (
  imageName: string,
  height: number,
  width: number
): Promise<boolean> => {
  try {
    let url = getImageUrl(imageName, height, width, true);
    let cacheImage = await fspromise.open(url, "r");
    cacheImage.close();
    return true;
  } catch (e) {
    console.log("not exists");
    return false;
  }
};

export = {
  retrieveImage,
};
