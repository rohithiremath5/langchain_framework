import { createAgent } from "langchain";
import { ChatGoogle } from "@langchain/google"
import "dotenv/config"

const model = new ChatGoogle({ model: "gemini-3.8-flash" })
const agent = createAgent({ model })

const result = await agent.invoke({
    messages: [{ role: "user", content: "Write a poem about the beauty of nature." }]
})

const response = result.messages[result.messages.length - 1].content

console.log(response)