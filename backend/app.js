import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import pdf from "pdf-parse";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import cosineSimilarity from "cosine-similarity";
import readline from "readline";

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const vectorStore = []; 

async function embedText(text) {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: text,
  });
  return result.embeddings.values;
}

async function loadPDFChunks(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const { text } = await pdf(dataBuffer);

  if (!text || text.length === 0) {
    console.error("❌ No text extracted from PDF.");
    return;
  }

  console.log(`✅ Extracted ${text.length} characters from PDF`);

  const chunks = splitText(text.slice(0, 4000), 200, 50);
  for (const chunk of chunks) {
    try {
      const embedding = await embedText(chunk);
      vectorStore.push({ id: uuidv4(), text: chunk, embedding });
    } catch (e) {
      console.error("Embedding error:", e.message);
    }
  }
}


function splitText(text, chunkSize, overlap) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  const chunks = [];
  let chunk = "";

  for (let i = 0; i < sentences.length; i++) {
    if ((chunk + sentences[i]).length > chunkSize) {
      chunks.push(chunk.trim());
      i -= Math.floor(overlap / 100); 
      chunk = "";
    } else {
      chunk += sentences[i];
    }
  }
  if (chunk) chunks.push(chunk.trim());
  return chunks;
}

function retrieveRelevantChunks(queryEmbedding, topK = 5) {
  return vectorStore
    .map(doc => ({
      ...doc,
      score: cosineSimilarity(doc.embedding, queryEmbedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

async function answerQuery(query) {
  const queryEmbedding = await embedText(query);
  const relevantChunks = retrieveRelevantChunks(queryEmbedding);
  const knowledge = relevantChunks.map(c => c.text).join("\n\n");

  const prompt = `
You are DueMinder, a helpful assistant designed to help users with anything related to their bills, payments, subscriptions, and reminders. Answer clearly and conversationally based on what you know.

User's question: ${query}

Relevant information:
${knowledge}
`;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });

  const parts = response.candidates?.[0]?.content?.parts;
  const answer = parts?.map(p => p.text).join('') ?? "⚠️ No response generated.";

  console.log("\n📘 Answer:\n", answer);
}

function startChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\n🧠 Ask me anything > ",
  });

  rl.prompt();

  rl.on("line", async (line) => {
    const query = line.trim();
    if (query.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    await answerQuery(query);
    rl.prompt();
  });

  rl.on("close", () => {
    console.log("👋 Exiting chat. Goodbye!");
    process.exit(0);
  });
}



(async () => {
  await loadPDFChunks("./Dueminder.pdf");
  startChat(); 
})();

