const puppeteer = require('puppeteer');

(async () => {

    let jobArray = ['23003', '23004', '23005'];

    //let loginIrl = 'https://necpc.cb-faq.com/admin/tool/1031/doc/login.html';
    let url = 'https://necpc.cb-faq.com/admin/tool/1031/doc/login.html';
    let url2 = 'https://necpc.cb-faq.com/admin/tool/1031/onefaq/search.jsp';
    const text = '管理者';

    let browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=1020,1080`],
        defaultViewport: {
            width: 1020,
            height: 980
        }
    });
    let page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector("input[name='account']");

    await page.type("input[name='account']", "Lv", { delay: 200 });
    await page.type("input[name='passwd']", "GQ123456", { delay: 200 });

    await page.click("input[type='submit']", { delay: 1000 });

    //await page.waitForFunction('document.querySelector("body").innerText.includes("管理者")');

    // try {
    //     await page.waitForFunction(
    //         text => document.querySelector('body').innerText.includes(text), {},
    //         text
    //     );
    // } catch (e) {
    //     console.log(`The text "${text}" was not found on the page`);
    // }

    await page.waitFor(2000);

    for (var i = 0; i < jobArray.length; i++) {

        await page.goto(url2);

        await page.waitForSelector("input[name='qaid']");

        await page.evaluate(() => document.querySelectorAll("input[name='qaid']")[0].value = "")

        await page.type("input[name='qaid']", jobArray[i], { delay: 200 });

        await page.click("input[type='submit']", { delay: 1000 });

        await page.waitForSelector("input[value='編集']");

        await page.click("input[value='編集']", { delay: 1000 });

        await page.waitForSelector("select[name='faqstatus0']");

        await page.select("select[name='faqstatus0']", '004');

        await page.click("input[value=' 更新実行 ']", { delay: 3000 });

    }

    await browser.close();


})()