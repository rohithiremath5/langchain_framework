import { createAgent, tool } from "langchain";
import { ChatGoogle } from "@langchain/google"
import "dotenv/config"

const toolResponse = tool()

const model = new ChatGoogle({ model: "gemini-3.8-flash", tool: [toolResponse] })
const agent = createAgent({ model })

const result = await agent.invoke({
    messages: [{ role: "user", content: "what is the weather in New York?" }]
})

const response = result.messages[result.messages.length - 1].content

console.log(response)