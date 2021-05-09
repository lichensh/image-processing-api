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
const imageUtil_1 = __importDefault(require("../utilities/imageUtil"));
const fs_1 = __importDefault(require("fs"));
it("retrieve image by first time properties", () => __awaiter(void 0, void 0, void 0, function* () {
    let image = yield imageUtil_1.default.retrieveImage("fjord", 400, 400);
    expect(image).toBeTruthy();
}));
it("images by second time properties should exist in cached", () => __awaiter(void 0, void 0, void 0, function* () {
    expect(fs_1.default.existsSync(`assests/cache/fjord_400_400.jpg`)).toBeTruthy();
}));
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = supertest_1.default(index_1.default);
describe("Test endpoint responses", () => {
    it("if image doesnt exist", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/images?filename=f&height=200&width=200');
        expect(response.status).toBe(500);
        done();
    }));
    it("image exist", (done) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/images?filename=fjord&height=200&width=200');
        expect(response.status).toBe(200);
        done();
    }));
});
