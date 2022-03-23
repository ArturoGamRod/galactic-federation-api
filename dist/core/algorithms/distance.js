"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcDist = void 0;
function calcDist(x1, y1, x2, y2) {
    let a = (x2 - x1) * (x2 - x1);
    let b = (y2 - y1) * (y2 - y1);
    return Math.sqrt(a + b);
}
exports.calcDist = calcDist;
