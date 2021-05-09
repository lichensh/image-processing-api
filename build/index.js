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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("./routes/middleware/validator"));
const imageUtil_1 = __importDefault(require("./utilities/imageUtil"));
const port = 3000;
const app = express_1.default();
app.get("/images", validator_1.default.validateParameters, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.type("image/jpg");
        const image = yield imageUtil_1.default.retrieveImage(res.locals.filename, res.locals.height, res.locals.width);
        image.pipe(res);
    }
    catch (err) {
        console.log(err);
        res.status(err.status || 500).send(err.message);
    }
}));
app.listen(port, () => {
    console.log("listening on ${port}");
});
exports.default = app;
