const { Builder, By } = require("selenium-webdriver");
const readline = require("readline");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
var driver;
(async () => {
  driver = await new Builder().forBrowser("firefox").build();
  await driver.get("https://ts20.x2.international.travian.com/statistics");
})();

async function travianBot() {
  try {

    for (let i = 2; i <= 200200; i++) {
      try {
        console.log(`########### ${i} ########### FL`);

        const ran = Math.round(random(1, 4));

        if (ran === 2) {
          await driver.get("https://ts20.x2.international.travian.com/report");
          await sleep(random(1400, 1500));
        }

        if (ran === 3) {
          await driver.get(
            "https://ts20.x2.international.travian.com/statistics"
          );
          await sleep(random(1400, 1500));
        }

        await driver.get(
          "https://ts20.x2.international.travian.com/build.php?id=39&gid=16&tt=99"
        );
        await sleep(random(1400, 1500));

        let elems = await driver.findElements(By.css(".startAllFarmLists"));
        if (elems.length > 0) {
          await sleep(random(750, 780));
          await elems[0].click();
          await sleep(random(15000, 20000));
        } else {
          console.log("⚠️ لم يتم العثور على زر .startAllFarmLists");
        }

        const ta = random(3 * 60 * 1000, 3 * 80 * 1000);
        const tb = random(3 * 58 * 1000, 3 * 82 * 1000);
        const t = Math.min(ta, tb);

        console.log(
          `${Math.floor(t / 60000)} minut a ${Math.round(
            (t % 60000) / 1000
          )} sekund`
        );
        console.log("   ");

        await sleep(t);
      } catch (err) {
        console.log("❌ خطأ داخل الحلقة، الانتظار 555 ثانية");
        await sleep(555000);
      }
    }
  } catch (e) {
    console.error("❌ خطأ عام:", e);
  }
}

// واجهة الانتظار في الكونسول
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("📣 اضغط Enter لتشغيل Travian Bot... ", () => {
  rl.close();
  travianBot();
});
