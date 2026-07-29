import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function parseCleanJson(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
  }
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON parse failed on text:", text, err);
    return {
      reply: text,
      pronunciation: "",
      translation: "",
      explanation: ""
    };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily
  let aiClient: GoogleGenAI | null = null;
  function getAiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured. Please add it via the Secrets panel in AI Studio.");
      }
      aiClient = new GoogleGenAI({ 
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
    return aiClient;
  }

  // API Route for Gemini tutor
  app.post("/api/tutor", async (req, res) => {
    try {
      const { message, language, history } = req.body;
      if (!message || !language) {
        return res.status(400).json({ error: "Message and language are required" });
      }

      const client = getAiClient();

      const systemInstruction = `You are an encouraging, friendly local language learning tutor teaching "${language}".
The user is a beginner or intermediate learner.
Your job is to:
1. Respond to the user's message in "${language}". Keep it friendly, simple, and limited to 1-3 sentences.
2. Provide a phonetical pronunciation of your reply in English letters (transliteration).
3. Provide the English translation of your reply.
4. Provide a helpful explanation in English of key vocabulary, grammar points, or gently correct any mistakes in the user's input.`;

      const contents = [];
      
      // Map history if present
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }
      
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING, description: "Your reply in the target language native script" },
              pronunciation: { type: Type.STRING, description: "Phonetic transliteration in English alphabets" },
              translation: { type: Type.STRING, description: "English translation of the reply" },
              explanation: { type: Type.STRING, description: "Friendly feedback, vocab tips, and/or corrections in English" }
            },
            required: ["reply", "pronunciation", "translation", "explanation"]
          }
        }
      });

      const responseText = response.text || "{}";
      const parsedData = parseCleanJson(responseText);
      res.json(parsedData);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error?.message || "An error occurred with the Gemini AI Tutor." });
    }
  });

  // Serve static assets or use Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
