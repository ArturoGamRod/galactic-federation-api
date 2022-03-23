import { Response, Request } from "express";
import GetLocation from "../../../core/useCases/getLocation";
import GetMessage from "../../../core/useCases/getMessage";
import Joi from "joi";
import Point from "../../../core/models/Point";
import { Satellite, TopSecretDTO } from "./topSecretDTO";
import { TopSecretReponse } from "./topSecretResponse";
import { satelliteLocations } from "../satelliteLocations";


const getMessageUseCase = new GetMessage();
const getLocationUseCase = new GetLocation(satelliteLocations.kenobi, satelliteLocations.skywalker, satelliteLocations.sato);

const satteliteSChema = Joi.array().items(Joi.object({
    name: Joi.string().required().valid("kenobi", "skywalker", "sato"),
    distance: Joi.number().required(),
    message: Joi.array().required().items(Joi.string().allow(""))
})).min(1);

const topSecretRequestSchema = Joi.object({ satellites: satteliteSChema }).required();


const topSecret = async function (req: Request, res: Response) {

    const validateResult = topSecretRequestSchema.validate(req.body);

    if (validateResult.error)
        return res.status(400).send({ error: validateResult.error.message });

    let satellites = (req.body as TopSecretDTO).satellites;

    const messages = satellites.map(s => s.message);
    const message = await getMessageUseCase.getMessage(messages);

    const kenobi: Satellite = satellites.find(i => i.name == "kenobi")!;
    const skywalker: Satellite = satellites.find(i => i.name == "skywalker")!;
    const sato: Satellite = satellites.find(i => i.name == "sato")!;

    const distances = [kenobi.distance,skywalker.distance,sato.distance];
    const senderPosition = getLocationUseCase.getLocation(distances) as Point;

    const response: TopSecretReponse = { position: senderPosition, message };
    if (senderPosition) {
        res.send(response);
    }

    else {
        res.status(404).send("location could not be determined");
    }


}

export { topSecret as getResult }