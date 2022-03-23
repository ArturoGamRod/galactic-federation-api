import * as utils from '../libs'
import Point from "../core/models/Point";
import { getTrilateration } from '../core/algorithms/trilateration';
import { calcDist } from '../core/algorithms/distance';
import GetLocation from '../core/useCases/getLocation';
import GetMessage from '../core/useCases/getMessage';
import satellites from "./satellites.json"

function getPosibleCoordinates(vector: any) {

    const xy = [];
    const errorMargin = 0.025;

    for (let x = vector.x; x <= vector.x + vector.distance; x++) {
        for (let y = vector.y; y <= vector.y + vector.distance; y++) {

            const distance = calcDist(vector.x, vector.y, x, y);
            if (distance == vector.distance || (distance >= vector.distance && (distance <= vector.distance + errorMargin))) {
                xy.push({ x, y, distance });
                break;

            }

        }
    }

    const x_negy = []
    for (let x = vector.x; x <= vector.x + vector.distance; x++) {
        for (let y = vector.y; y >= vector.y - vector.distance; y--) {

            const distance = calcDist(vector.x, vector.y, x, y);
            if (distance == vector.distance || (distance >= vector.distance && (distance <= vector.distance + errorMargin))) {
                x_negy.push({ x, y, distance });
                break;

            }

        }
    }

    const negx_y = []
    for (let x = vector.x; x >= vector.x - vector.distance; x--) {
        for (let y = vector.y; y <= vector.y + vector.distance; y++) {

            const distance = calcDist(vector.x, vector.y, x, y);
            if (distance == vector.distance || (distance >= vector.distance && (distance <= vector.distance + errorMargin))) {
                negx_y.push({ x, y, distance });
                break;

            }

        }
    }

    const negx_negy = []
    for (let x = vector.x; x >= vector.x - vector.distance; x--) {
        for (let y = vector.y; y >= vector.y - vector.distance; y--) {

            const distance = calcDist(vector.x, vector.y, x, y);
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

            const getMessageUseCase = new GetMessage();
            const messages = satellites.map(s => s.message);
            const resultMessage = getMessageUseCase.getMessage(messages);
            console.log(resultMessage);
        }

        if (instruction == "location") {

            const positions = satellites.map<Point>(s => ({ x: s.position.x, y: s.position.y }));
            const getLocationUseCase = new GetLocation(positions[0], positions[1], positions[2]);

            const distances = satellites.map(s => s.distance);
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