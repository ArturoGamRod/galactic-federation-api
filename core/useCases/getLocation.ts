import { getTrilateration as trilateration } from "../algorithms/trilateration";
import * as utils from "../../libs"
import { calcDist } from "../algorithms/distance";
import Point from "../models/Point";

export default class GetLocation {

    private sat1: Point;
    private sat2: Point;
    private sat3: Point;

    constructor(sat1: Point, sat2: Point, sat3: Point) {

        this.sat1 = sat1;
        this.sat2 = sat2;
        this.sat3 = sat3;

    }

    getLocation(distances: number[]): Point | null {

        const solution = trilateration({ ...this.sat1, distance: distances[0] }, { ...this.sat2, distance: distances[1] }, { ...this.sat3, distance: distances[2] });
        const distance1 = utils.setPrecision(calcDist(this.sat1.x, this.sat1.y, solution.x, solution.y), 1);
        const distance2 = utils.setPrecision(calcDist(this.sat2.x, this.sat2.y, solution.x, solution.y), 1);
        const distance3 = utils.setPrecision(calcDist(this.sat3.x, this.sat3.y, solution.x, solution.y), 1);

        if (distance1 == utils.setPrecision(distances[0], 1) && distance2 == utils.setPrecision(distances[1], 1) && distance3 == utils.setPrecision(distances[2], 1))
            return { x: utils.setPrecision(solution.x, 2), y: utils.setPrecision(solution.y, 2) };
        else
            return null;

    }

}