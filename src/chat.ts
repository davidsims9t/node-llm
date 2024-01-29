import { ChatCompletionMessage, ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam } from "openai/resources";
import { openAi } from "./openai.js";
import readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

type UserOrSystem = ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam | ChatCompletionMessage;

const formatMessage = (userInput: string): UserOrSystem => ({ role: 'user', content: userInput });

const newMessage = async (history: UserOrSystem[], message: UserOrSystem) => {
    const results = await openAi.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            ...history,
            message
        ]
    });
    
    return results.choices[0].message;
};


const chat = () => {
    const history = [
        {
            role: "system",
            content: "You are an AI system. Answer my questions to the best of your abilities."
        },
    ] as (UserOrSystem | ChatCompletionMessage)[];

    const start = () => {
        rl.question('You: ', async (userInput: string) => {
            if (userInput.toLowerCase() === 'exit') {
                rl.close();
                return;
            }

            const message = formatMessage(userInput);
            const response = await newMessage(history, message);

            history.push(message, response);
            console.log(`\n\n AI: ${response.content}`);
            start();
        });
    };

    start();
};

chat();