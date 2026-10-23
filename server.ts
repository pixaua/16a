import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '30mb' }));

// Init Google GenAI SDK (Server-Side)
const apiKey = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6L1c-JFAStbNZATLOhslmwXyUEfXQek5Ucerip_j__ZlA';
const ai = apiKey ? new GoogleGenAI({
  apiKey,
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
}) : null;

// Helper: Telegram Dispatcher
async function sendTelegramAlert(botToken: string, chatId: string, message: string) {
  if (!botToken || !chatId) return { success: false };
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
    });
    return { success: res.ok };
  } catch {
    return { success: false };
  }
}

// 1. Status API
app.get('/api/status', (req, res) => {
  res.json({ status: 'online', appName: '16 A', developedBy: 'PA' });
});

// 2. Gemini 3.8 Flash Streaming Chat
app.post('/api/chat', async (req, res) => {
  try {
    if (!ai) return res.status(500).json({ error: 'API Key missing' });
    const { messages, systemInstruction, webSearch = false } = req.body;

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: m.image ? [{ inlineData: { mimeType: m.image.mimeType, data: m.image.data.split(',')[1] || m.image.data } }, { text: m.content || '' }] : [{ text: m.content || '' }]
    }));

    const config: any = {
      systemInstruction: `You are "16 A", an intelligent browser assistant Developed by PA. Reply in Bengali or English based on user query.`
    };
    if (webSearch) config.tools = [{ googleSearch: {} }];

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config,
    });

    let fullText = '';
    let sources: any[] = [];
    for await (const chunk of stream) {
      if (chunk.text) {
        fullText += chunk.text;
        res.write(`data: ${JSON.stringify({ type: 'chunk', text: chunk.text })}\n\n`);
      }
      const chunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) sources = chunks.map((c: any) => c.web).filter(Boolean);
    }
    res.write(`data: ${JSON.stringify({ type: 'done', fullText, sources })}\n\n`);
    res.end();
  } catch (err: any) {
    res.write(`data: ${JSON.stringify({ type: 'error', error: err.message })}\n\n`);
    res.end();
  }
});

// 3. Social Media Downloader API
app.post('/api/download/parse', async (req, res) => {
  const { url, telegramConfig } = req.body;
  let platform = 'TikTok';
  if (url.includes('instagram.com')) platform = 'Instagram';
  if (url.includes('facebook.com')) platform = 'Facebook';
  if (url.includes('youtube.com')) platform = 'YouTube';

  if (telegramConfig?.botToken && telegramConfig?.chatId) {
    sendTelegramAlert(telegramConfig.botToken, telegramConfig.chatId, `⚡ <b>[16 A] নতুন ডাউনলোড!</b>\nপ্ল্যাটফর্ম: ${platform}\nলিংক: ${url}\n<i>Developed by PA</i>`);
  }

  res.json({
    id: Math.random().toString(36).substring(2, 8),
    url,
    platform,
    title: `${platform} HD Video - 16 A Engine`,
    author: '@creator_media',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=60',
    duration: '00:45',
    formats: [
      { quality: '1080p Full HD (No Watermark)', size: '14.8 MB', ext: 'mp4', type: 'video', url },
      { quality: '720p Fast Download', size: '8.2 MB', ext: 'mp4', type: 'video', url },
      { quality: '320kbps High Quality Audio', size: '2.5 MB', ext: 'mp3', type: 'audio', url }
    ]
  });
});

// 4. Telegram Alert & Auth API
app.post('/api/telegram/notify', async (req, res) => {
  const { botToken, chatId, message } = req.body;
  const result = await sendTelegramAlert(botToken, chatId, message);
  res.json(result);
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, telegramConfig } = req.body;
  if (telegramConfig?.botToken && telegramConfig?.chatId) {
    sendTelegramAlert(telegramConfig.botToken, telegramConfig.chatId, `🎉 <b>[16 A] নতুন ইউজার সাইন-আপ!</b>\nনাম: ${name}\nইমেইল: ${email}\n<i>Developed by PA</i>`);
  }
  res.json({ success: true, user: { id: 'usr_' + Date.now(), name, email } });
});

// Static files & Vite mounting
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'dist', 'index.html')));
}

app.listen(PORT, '0.0.0.0', () => console.log(`16 A Portal running on ${PORT} [Developed by PA]`));
