import Point from "./Point";

export default class TrilaterationInput extends Point {

    distance: number = 0;

    constructor(x: number, y: number, distance: number) {

        super(x, y);
        this.distance = distance;
    }
}