"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("../libs"));
const distance_1 = require("../core/algorithms/distance");
const getLocation_1 = __importDefault(require("../core/useCases/getLocation"));
const getMessage_1 = __importDefault(require("../core/useCases/getMessage"));
const satellites_json_1 = __importDefault(require("./satellites.json"));
function getPosibleCoordinates(vector) {
    const xy = [];
    const errorMargin = 0.025;
    for (let x = vector.x; x <= vector.x + vector.distance; x++) {
        for (let y = vector.y; y <= vector.y + vector.distance; y++) {
            const distance = (0, distance_1.calcDist)(vector.x, vector.y, x, y);
            if (distance == vector.distance || (distance >= vector.distance && (distance <= vector.distance + errorMargin))) {
                xy.push({ x, y, distance });
                break;
            }
        }
    }
    const x_negy = [];
    for (let x = vector.x; x <= vector.x + vector.distance; x++) {
        for (let y = vector.y; y >= vector.y - vector.distance; y--) {
            const distance = (0, distance_1.calcDist)(vector.x, vector.y, x, y);
            if (distance == vector.distance || (distance >= vector.distance && (distance <= vector.distance + errorMargin))) {
                x_negy.push({ x, y, distance });
                break;
            }
        }
    }
    const negx_y = [];
    for (let x = vector.x; x >= vector.x - vector.distance; x--) {
        for (let y = vector.y; y <= vector.y + vector.distance; y++) {
            const distance = (0, distance_1.calcDist)(vector.x, vector.y, x, y);
            if (distance == vector.distance || (distance >= vector.distance && (distance <= vector.distance + errorMargin))) {
                negx_y.push({ x, y, distance });
                break;
            }
        }
    }
    const negx_negy = [];
    for (let x = vector.x; x >= vector.x - vector.distance; x--) {
        for (let y = vector.y; y >= vector.y - vector.distance; y--) {
            const distance = (0, distance_1.calcDist)(vector.x, vector.y, x, y);
            if (distance == vector.distance || (distance >= vector.distance && (distance <= vector.distance + errorMargin))) {
                negx_negy.push({ x, y, distance });
                break;
            }
        }
    }
    return xy.concat(x_negy).concat(negx_y).concat(negx_negy);
    // console.log(negx_negy);
    // const distance = calcDist(vector.x, p1.y, -18, -81)
    // console.log(distance);
}
function start() {
    const myArgs = process.argv.slice(2);
    if (myArgs.length == 0) {
        return console.log("error: must provide an instruction: message, location");
    }
    else {
        const instruction = myArgs[0].toLowerCase();
        if (instruction != "message" && instruction != "location")
            return console.log("invalid instruction. valid values are: message, location");
        if (instruction == "message") {
            const getMessageUseCase = new getMessage_1.default();
            const messages = satellites_json_1.default.map(s => s.message);
            const resultMessage = getMessageUseCase.getMessage(messages);
            console.log(resultMessage);
        }
        if (instruction == "location") {
            const positions = satellites_json_1.default.map(s => ({ x: s.position.x, y: s.position.y }));
            const getLocationUseCase = new getLocation_1.default(positions[0], positions[1], positions[2]);
            const distances = satellites_json_1.default.map(s => s.distance);
            const result = getLocationUseCase.getLocation(distances);
            if (result) {
                result.x = utils.setPrecision(result.x, 2);
                result.y = utils.setPrecision(result.y, 2);
                console.log(JSON.stringify(result));
            }
            else {
                console.log("location could not be determined");
            }
        }
    }
    // const distance1  = 373.29;
    // const distance2 =  620.21;
    // const distance3 = 1054.26;
}
start();
