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

        if (!process.env.OPENAI_API_KEY) {
            return res.status(500).json({ error: "API key missing" });
        }

        const response = await openai.responses.create({
            model: "gpt-4.1-mini",
            input: message,
        });

        return res.status(200).json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("Maya Error:", error);
        return res.status(500).json({
            error: error.message
        });
    }
}