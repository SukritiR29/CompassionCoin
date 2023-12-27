import generatedText from "@/ai/textGeneration";

export default async function handler(req, res) {
    if(req.method == 'POST') {
        const { prompt } = req.body;
        const generatedText = await generatedText(prompt);
        res.status(200).json({generatedText});
    } else {
        res.status(405).end();
    }
}