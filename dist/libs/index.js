"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPrecision = void 0;
function setPrecision(number, precision) {
    const result = parseFloat(number.toFixed(precision));
    return result;
}
exports.setPrecision = setPrecision;
