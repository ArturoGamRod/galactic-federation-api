"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = void 0;
const getLocation_1 = __importDefault(require("../../../core/useCases/getLocation"));
const getMessage_1 = __importDefault(require("../../../core/useCases/getMessage"));
const joi_1 = __importDefault(require("joi"));
const satelliteLocations_1 = require("../satelliteLocations");
const getMessageUseCase = new getMessage_1.default();
const getLocationUseCase = new getLocation_1.default(satelliteLocations_1.satelliteLocations.kenobi, satelliteLocations_1.satelliteLocations.skywalker, satelliteLocations_1.satelliteLocations.sato);
const satteliteSChema = joi_1.default.array().items(joi_1.default.object({
    name: joi_1.default.string().required().valid("kenobi", "skywalker", "sato"),
    distance: joi_1.default.number().required(),
    message: joi_1.default.array().required().items(joi_1.default.string().allow(""))
})).min(1);
const topSecretRequestSchema = joi_1.default.object({ satellites: satteliteSChema }).required();
const topSecret = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = topSecretRequestSchema.validate(req.body);
        if (validateResult.error)
            return res.status(400).send({ error: validateResult.error.message });
        let satellites = req.body.satellites;
        const messages = satellites.map(s => s.message);
        const message = yield getMessageUseCase.getMessage(messages);
        const kenobi = satellites.find(i => i.name == "kenobi");
        const skywalker = satellites.find(i => i.name == "skywalker");
        const sato = satellites.find(i => i.name == "sato");
        const distances = [kenobi.distance, skywalker.distance, sato.distance];
        const senderPosition = getLocationUseCase.getLocation(distances);
        const response = { position: senderPosition, message };
        if (senderPosition) {
            res.send(response);
        }
        else {
            res.status(404).send("location could not be determined");
        }
    });
};
exports.getResult = topSecret;
