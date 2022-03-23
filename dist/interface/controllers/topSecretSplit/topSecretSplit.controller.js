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
exports.deleteAll = exports.getResult = exports.saveSatellite = void 0;
const getLocation_1 = __importDefault(require("../../../core/useCases/getLocation"));
const getMessage_1 = __importDefault(require("../../../core/useCases/getMessage"));
const joi_1 = __importDefault(require("joi"));
const satelliteLocations_1 = require("../satelliteLocations");
const getMessageUseCase = new getMessage_1.default();
const getLocationUseCase = new getLocation_1.default(satelliteLocations_1.satelliteLocations.kenobi, satelliteLocations_1.satelliteLocations.skywalker, satelliteLocations_1.satelliteLocations.sato);
const topSecretSPlitRequestSchema = joi_1.default.object({
    distance: joi_1.default.number().required(),
    message: joi_1.default.array().required().items(joi_1.default.string().allow(""))
});
let satellites = [];
const saveSatellite = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = topSecretSPlitRequestSchema.validate(req.body);
        if (validateResult.error)
            return res.status(400).send({ error: validateResult.error.message });
        if (["kenobi", "skywalker", "sato"].indexOf(req.params.satellite_name.toLocaleLowerCase()) == -1) {
            return res.status(422).send({ error: "invalid satellite name", data: req.params.satellite_name });
        }
        const requestInfo = req.body;
        const satelliteInfo = { name: req.params.satellite_name, distance: requestInfo.distance, message: requestInfo.message };
        let existingSatIndex = satellites.findIndex(i => i.name.toLocaleLowerCase() == satelliteInfo.name.toLocaleLowerCase());
        if (existingSatIndex != -1) {
            satellites[existingSatIndex] = satelliteInfo;
            return res.status(200).send({ message: "satellite updated", data: satellites[existingSatIndex] });
        }
        else {
            satellites.push(satelliteInfo);
            return res.status(201).send({ message: "satellite created", data: satelliteInfo });
        }
    });
};
exports.saveSatellite = saveSatellite;
const getResult = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (satellites.length < 3) {
            return res.status(422).send({ error: "Not enough information: Three satellites are needed", data: satellites });
        }
        else {
            const messages = satellites.map(s => s.message);
            const message = yield getMessageUseCase.getMessage(messages);
            const kenobi = satellites.find(i => i.name == "kenobi");
            const skywalker = satellites.find(i => i.name == "skywalker");
            const sato = satellites.find(i => i.name == "sato");
            const senderPosition = getLocationUseCase.getLocation([kenobi.distance, skywalker.distance, sato.distance]);
            const response = { position: senderPosition, message };
            if (senderPosition) {
                res.send(response);
            }
            else {
                res.status(404).send({ error: "location could not be determined", data: satellites });
            }
        }
    });
};
exports.getResult = getResult;
const deleteAll = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        satellites = [];
        res.sendStatus(200);
    });
};
exports.deleteAll = deleteAll;
