import { Response, Request } from "express";
import GetLocation from "../../../core/useCases/getLocation";
import GetMessage from "../../../core/useCases/getMessage";
import Joi from "joi";
import Point from "../../../core/models/Point";
import { TopSecretSplitDTO } from "./topSecretSplitDTO";
import { TopSecretSplitReponse } from "./topSecretSplitResponse";
import { satelliteLocations } from "../satelliteLocations";

const getMessageUseCase = new GetMessage();
const getLocationUseCase = new GetLocation(satelliteLocations.kenobi, satelliteLocations.skywalker, satelliteLocations.sato);

const topSecretSPlitRequestSchema = Joi.object({
    distance: Joi.number().required(),
    message: Joi.array().required().items(Joi.string().allow(""))
});

type SatelliteInfo = {
    name: string,
    distance: number,
    message: string[]
}

let satellites: SatelliteInfo[] = [];

const saveSatellite = async function (req: Request, res: Response) {

    const validateResult = topSecretSPlitRequestSchema.validate(req.body);

    if (validateResult.error)
        return res.status(400).send({ error: validateResult.error.message });

    if (["kenobi", "skywalker", "sato"].indexOf(req.params.satellite_name.toLocaleLowerCase()) == -1) {

        return res.status(422).send({ error: "invalid satellite name", data: req.params.satellite_name });
    }

    const requestInfo = req.body as TopSecretSplitDTO;
    const satelliteInfo: SatelliteInfo = { name: req.params.satellite_name, distance: requestInfo.distance, message: requestInfo.message };
    let existingSatIndex = satellites.findIndex(i => i.name.toLocaleLowerCase() == satelliteInfo.name.toLocaleLowerCase());
    if (existingSatIndex != -1) {
        satellites[existingSatIndex] = satelliteInfo;
        return res.status(200).send({ message: "satellite updated", data: satellites[existingSatIndex] });
    }
    else {
        satellites.push(satelliteInfo);
        return res.status(201).send({ message: "satellite created", data: satelliteInfo });
    }
}

const getResult = async function (req: Request, res: Response) {

    if (satellites.length < 3) {
        return res.status(422).send({ error: "Not enough information: Three satellites are needed", data: satellites });
    }
    else {

        const messages = satellites.map(s => s.message);
        const message = await getMessageUseCase.getMessage(messages);

        const kenobi: SatelliteInfo = satellites.find(i => i.name == "kenobi")!;
        const skywalker: SatelliteInfo = satellites.find(i => i.name == "skywalker")!;
        const sato: SatelliteInfo = satellites.find(i => i.name == "sato")!;

        const senderPosition = getLocationUseCase.getLocation([kenobi.distance, skywalker.distance, sato.distance]) as Point;

        const response: TopSecretSplitReponse = { position: senderPosition, message };
        if (senderPosition) {
            res.send(response);
        }

        else {
            res.status(404).send({ error: "location could not be determined", data: satellites });
        }
    }
}

const deleteAll = async function (req: Request, res: Response) {

    satellites = [];
    res.sendStatus(200);
}
export { saveSatellite, getResult, deleteAll }