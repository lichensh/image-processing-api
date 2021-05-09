"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const fspromise = require("fs").promises;
const sharp_1 = __importDefault(require("sharp"));
// retrieve the requested image
const retrieveImage = (imageName, height, width) => __awaiter(void 0, void 0, void 0, function* () {
    let isExist = yield isExists(imageName);
    if (!isExist) {
        throw new Error(JSON.stringify({
            status: 404,
            message: "Image not found.",
        }));
    }
    let isCacheExist = yield isCacheExists(imageName, height, width);
    let imageUrl = getImageUrl(imageName, height, width, isCacheExist);
    const readStream = fs_1.default.createReadStream(imageUrl);
    let transform = sharp_1.default().resize({
        width: width,
        height: height,
    });
    if (!isCacheExist) {
        createCache(imageName, width, height);
    }
    return readStream.pipe(transform);
});
//get the image full path
const getImageUrl = (imageName, height, width, isCached) => {
    if (!isCached) {
        return "./assests/full/" + imageName + ".jpg";
    }
    else {
        return "./assests/cache/" + imageName + "_" + width + "_" + height + ".jpg";
    }
};
// create the cached image in cache folder
const createCache = (imageName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    let fileData = yield fspromise.open(getImageUrl(imageName, height, width, true), "w");
    yield fileData.write(yield sharp_1.default(getImageUrl(imageName)).resize(width, height).toBuffer());
    yield fileData.close();
});
// check if the images exist
const isExists = (imageName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = getImageUrl(imageName);
        let cacheImage = yield fspromise.open(url, "r");
        cacheImage.close();
        return true;
    }
    catch (e) {
        console.log("not exists");
        return false;
    }
});
// check if the cache images exist
const isCacheExists = (imageName, height, width) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let url = getImageUrl(imageName, height, width, true);
        let cacheImage = yield fspromise.open(url, "r");
        cacheImage.close();
        return true;
    }
    catch (e) {
        console.log("not exists");
        return false;
    }
});
module.exports = {
    retrieveImage,
};
