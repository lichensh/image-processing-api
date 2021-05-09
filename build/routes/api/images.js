"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images = express_1.default.Router();
const imgFolder = "assests";
images.get("/", (req, res) => {
    res.send(imgFolder);
});
exports.default = images;
