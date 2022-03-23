import GetMessage from "../core/useCases/getMessage";

test('should calculate message for scenario 1', () => {

  const getMessageUseCase = new GetMessage();

  const brokenMessages: string[][] = [["this", "", "", "secret", ""], ["", "is", "", "", "message"], ["this", "", "a", "", ""]];
  const message = getMessageUseCase.getMessage(brokenMessages);

  expect(message).toBe("this is a secret message");
});