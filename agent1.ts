import { createAgent, tool } from "langchain";
import { ChatGoogle } from "@langchain/google"
import "dotenv/config"
import z from "zod";
import { getWeather } from "./api/weather";
import { getTime } from "./api/timeDate";
import { getDetails } from "./utils/getUserDetails";
import { config } from "./config/userConfig";

const getweather = tool((input) => {
    // This is a mock implementation of the weather tool. In a real-world scenario, you would fetch the weather data from an API.
    // return "The current weather in New York is 75°F and sunny."
    return getWeather(input.city)
}, {
    name: "weather",
    description: "Get the current weather for a given location",
    schema: z.object({
        city: z.string().describe("The city to get the weather for"),
    })
})

const getTimeDate = tool((input) => {
    return getTime(input.city)
}, {
    name: "timeDate",
    description: "Get the current time and date for a given city or country",
    schema: z.object({
        city: z.string().describe("The timezone to get the time and date for"),
    })
})

const getUserDetails = tool((_, config) => {
    const userId = config.context.userId;
    return getDetails(userId)
}, {
    name: "getUserDetails",
    description: "Get the user details for a given user ID",
    schema: z.object({}),
})



const model = new ChatGoogle({ model: "gemini-3.8-flash" })
const agent = createAgent({
    model,
    tools: [getUserDetails, getweather, getTimeDate]
})

const result = await agent.invoke({
    messages: [{ role: "user", content: "what is the weather and time here" }]
}, config)

console.log(result)
const response = result.messages[result.messages.length - 1].content

console.log(response)