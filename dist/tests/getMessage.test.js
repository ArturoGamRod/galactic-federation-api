"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getMessage_1 = __importDefault(require("../core/useCases/getMessage"));
test('should calculate message for scenario 1', () => {
    const getMessageUseCase = new getMessage_1.default();
    const brokenMessages = [["this", "", "", "secret", ""], ["", "is", "", "", "message"], ["this", "", "a", "", ""]];
    const message = getMessageUseCase.getMessage(brokenMessages);
    expect(message).toBe("this is a secret message");
});
