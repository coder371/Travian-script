const { Builder, By } = require("selenium-webdriver");
const readline = require("readline");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

let driver;
let serverURL = "";

// Default server
const defaultServer = "https://ts20.x2.international.travian.com";

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Step 1: Ask user for server URL with default option
rl.question(`🌐 Enter your Travian server URL [${defaultServer}]:\n> `, async (urlInput) => {
  serverURL = urlInput.trim() || defaultServer;

  if (!serverURL.startsWith("http")) {
    console.log("❌ Invalid URL. Make sure it starts with http or https.");
    rl.close();
    return;
  }

  // Step 2: Launch browser and open the statistics page
  driver = await new Builder().forBrowser("firefox").build();
  await driver.get(`${serverURL}/statistics`);

  // Step 3: Wait for user to start the bot
  rl.question("📣 Press Enter to start Travian Bot... ", () => {
    rl.close();
    travianBot();
  });
});

// Main bot function
async function travianBot() {
  try {
    for (let i = 2; i <= 200200; i++) {
      try {
        console.log(`########### ${i} ########### FL`);

        const ran = Math.round(random(1, 4));

        if (ran === 2) {
          await driver.get(`${serverURL}/report`);
          await sleep(random(1400, 1500));
        }

        if (ran === 3) {
          await driver.get(`${serverURL}/statistics`);
          await sleep(random(1400, 1500));
        }

        await driver.get(`${serverURL}/build.php?id=39&gid=16&tt=99`);
        await sleep(random(1400, 1500));

        const elems = await driver.findElements(By.css(".startAllFarmLists"));
        if (elems.length > 0) {
          await sleep(random(750, 780));
          await elems[0].click();
          await sleep(random(15000, 20000));
        } else {
          console.log("⚠️ .startAllFarmLists button not found");
        }

        const ta = random(3 * 60 * 1000, 3 * 80 * 1000);
        const tb = random(3 * 58 * 1000, 3 * 82 * 1000);
        const t = Math.min(ta, tb);

        console.log(`${Math.floor(t / 60000)} minutes and ${Math.round((t % 60000) / 1000)} seconds`);
        console.log("   ");

        await sleep(t);
      } catch (err) {
        console.log("❌ Error inside loop, waiting 555 seconds");
        await sleep(555000);
      }
    }
  } catch (e) {
    console.error("❌ General error:", e);
  }
}