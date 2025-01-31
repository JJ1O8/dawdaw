const prompt = require("prompt-sync")({ sigint: true });
const mineflayer = require('mineflayer');

// Get user credentials
var email = prompt("Enter your Microsoft Email: ");
var password = prompt("Enter your Microsoft Password: ");

const bot = mineflayer.createBot({
    host: 'DonutSMP.net',
    port: 25565,
    username: email,
    password: password,
    auth: 'microsoft'
});

console.log("\nShard Bot for DonutSMP.net developed by pheonnisgay\ndesigned to farm afk shards without being in Minecraft\n\n\n");

bot.on('connect', function () {
    console.info(`[CONNECTION/${bot._client.username}] Connected!`);
});

bot.on('spawn', () => {
    console.log("[SPAWN] Bot has spawned successfully.");
    bot.chat('/afk');
});

bot.on('chat', (username, message) => {
    console.log(`[CHAT/${bot._client.username}] <${username}> ${message}`);
});

// Improved error handling
bot.on('kicked', (reason) => {
    console.warn("[KICKED] ", reason);
});

bot.on('error', (err) => {
    console.error("[ERROR] ", err);
    if (err.message.includes("Invalid credentials")) {
        console.error("Check your email/password and try again.");
    } else if (err.message.includes("getaddrinfo ENOTFOUND")) {
        console.error("Cannot resolve server address. Check if DonutSMP.net is online.");
    }
});

// Ensure script doesn't close immediately
bot.on('end', () => {
    console.log("[END] Bot disconnected. Restarting in 10 seconds...");
    setTimeout(() => {
        process.exit(1); // Exits so you can restart it with a process manager
    }, 10000);
});

// Handle unexpected exits
process.on('uncaughtException', (err) => {
    console.error("[UNCAUGHT ERROR] ", err);
});
