"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("./Point"));
class TrilaterationInput extends Point_1.default {
    constructor(x, y, distance) {
        super(x, y);
        this.distance = 0;
        this.distance = distance;
    }
}
exports.default = TrilaterationInput;
