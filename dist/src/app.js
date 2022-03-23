"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_2 = require("express");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, morgan_1.default)("dev"));
const app_routes_1 = __importDefault(require("../interface/app.routes"));
app.use((0, express_2.json)());
app.use('/', app_routes_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
