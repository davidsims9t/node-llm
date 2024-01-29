import { openAi } from "./openai.js";

const results = await openAi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "system",
            content: "You are an AI system. Answer my questions to the best of your abilities."
        },
        {
            role: "user",
            content: "Hi!"
        }
    ]
});

console.log(results.choices[0]);