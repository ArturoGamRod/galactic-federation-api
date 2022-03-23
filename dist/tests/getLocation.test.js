"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __importDefault(require("../core/models/Point"));
const getLocation_1 = __importDefault(require("../core/useCases/getLocation"));
test('should calculate location for scenario 1', () => {
    const sat1 = new Point_1.default(-500, -200);
    const sat2 = new Point_1.default(100, -100);
    const sat3 = new Point_1.default(500, 100);
    const getLocationUseCase = new getLocation_1.default(sat1, sat2, sat3);
    const distances = [562.69, 532.83, 775.39];
    const location = getLocationUseCase.getLocation(distances);
    expect(location != null && location.x == -248.28 && location.y == 303.26).toBe(true);
});
test('should calculate location for scenario 2', () => {
    const sat1 = new Point_1.default(100, 0);
    const sat2 = new Point_1.default(-100, 0);
    const sat3 = new Point_1.default(0, -100);
    const getLocationUseCase = new getLocation_1.default(sat1, sat2, sat3);
    const distances = [100, 100, 100];
    const location = getLocationUseCase.getLocation(distances);
    expect(location != null && location.x == 0 && location.y == 0).toBe(true);
});
