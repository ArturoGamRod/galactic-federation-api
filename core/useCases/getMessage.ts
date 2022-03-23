type Message = {
    message: string[],
    position: number
}

export default class GetMessage {

    getMessage(messages: string[][]): string {

        //todo: validate length eq 3
        const msgs: Message[] = messages.map(m => ({ message: m, position: 0 }));
        let result = "";
        let currentMessage = msgs[0];
        let lastWord = "";

        while (true) {

            const currentWord = currentMessage.message[currentMessage.position];

            if (currentWord && currentMessage.message[currentMessage.position] != "" && lastWord != currentWord) {
                result += currentWord + " ";
                lastWord = currentWord;

                if (currentMessage.position < currentMessage.message.length) {

                    currentMessage.position += 1;
                    for (let msg of msgs) {
                        if (msg.position < currentMessage.position)
                            if (currentMessage.position < msg.message.length)
                                msg.position = currentMessage.position;
                            else
                                msg.position = msg.message.length - 1;

                    }

                }
            }

            else {

                const satIndex = msgs.indexOf(currentMessage);
                if (currentMessage.position < currentMessage.message.length) {
                    currentMessage.position++;
                }

                const next = msgs.filter(i => i.position > 0 && i.message[i.position - 1] == lastWord && lastWord != "" && i.message[i.position] != "" && i.position < i.message.length - 1);

                if (next.length > 0) {
                    currentMessage = next[0];
                }


                else if (satIndex == msgs.length - 1) {
                    currentMessage = msgs[0];

                }
                else
                    currentMessage = msgs[satIndex + 1];

            }

            let finishCount = 0;
            for (let sat of msgs) {
                if (sat.position == sat.message.length)
                    finishCount += 1;
            }

            if (finishCount == msgs.length)
                break;

        }

        return result.trim();

    }


}

