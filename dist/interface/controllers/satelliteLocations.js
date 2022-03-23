"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.satelliteLocations = void 0;
const Point_1 = __importDefault(require("../../core/models/Point"));
const satelliteLocations = {
    kenobi: new Point_1.default(-500, -200),
    skywalker: new Point_1.default(100, -100),
    sato: new Point_1.default(500, 100)
};
exports.satelliteLocations = satelliteLocations;
