import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function maya(req, res) {
    try {

        if (req.method !== "POST") {
            return res.status(405).json({ error: "Only POST allowed" });
        }

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message required" });
        }

        const response = await openai.responses.create({
            model: "gpt-4.1-mini",
            instructions: "You are Maya, a friendly conversational AI assistant.",
            input: message,
        });

        res.status(200).json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("Maya Error:", error);
        res.status(500).json({ error: "Maya backend error" });
    }
}