"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://root:example@localhost:27017/myCompany?authSource=admin").then(() => {
    console.log("connected to mongodb");
}).catch(e => {
    console.log("could not connect to database ", 2);
});
