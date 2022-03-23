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
Object.defineProperty(exports, "__esModule", { value: true });
const trilateration_1 = require("../algorithms/trilateration");
const utils = __importStar(require("../../libs"));
const distance_1 = require("../algorithms/distance");
class GetLocation {
    constructor(sat1, sat2, sat3) {
        this.sat1 = sat1;
        this.sat2 = sat2;
        this.sat3 = sat3;
    }
    getLocation(distances) {
        const solution = (0, trilateration_1.getTrilateration)(Object.assign(Object.assign({}, this.sat1), { distance: distances[0] }), Object.assign(Object.assign({}, this.sat2), { distance: distances[1] }), Object.assign(Object.assign({}, this.sat3), { distance: distances[2] }));
        const distance1 = utils.setPrecision((0, distance_1.calcDist)(this.sat1.x, this.sat1.y, solution.x, solution.y), 1);
        const distance2 = utils.setPrecision((0, distance_1.calcDist)(this.sat2.x, this.sat2.y, solution.x, solution.y), 1);
        const distance3 = utils.setPrecision((0, distance_1.calcDist)(this.sat3.x, this.sat3.y, solution.x, solution.y), 1);
        if (distance1 == utils.setPrecision(distances[0], 1) && distance2 == utils.setPrecision(distances[1], 1) && distance3 == utils.setPrecision(distances[2], 1))
            return { x: utils.setPrecision(solution.x, 2), y: utils.setPrecision(solution.y, 2) };
        else
            return null;
    }
}
exports.default = GetLocation;
