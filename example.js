const puppeteer = require("puppeteer");
// const fs = require('fs');
// const path = require('path');
// const util = require('util');

// // set up, invoke the function, wait for the download to complete
// async function download(page, f) {
//   const downloadPath = path.resolve(
//     process.cwd(),
//     `download-${Math.random()
//       .toString(36)
//       .substr(2, 8)}`,
//   );
//   await util.promisify(fs.mkdir)(downloadPath);
//   console.error('Download directory:', downloadPath);

//   await page._client.send('Page.setDownloadBehavior', {
//     behavior: 'allow',
//     downloadPath: downloadPath,
//   });

//   await f();

//   console.error('Downloading...');
//   let fileName;
//   while (!fileName || fileName.endsWith('.crdownload')) {
//     await new Promise(resolve => setTimeout(resolve, 100));
//     [fileName] = await util.promisify(fs.readdir)(downloadPath);
//   }

//   const filePath = path.resolve(downloadPath, fileName);
//   console.error('Downloaded file:', filePath);
//   return filePath;
// }

// // example usage
// (async function() {
//   const browser = await puppeteer.launch({ headless: true });
//   try {
//     const page = await browser.newPage();

//     await page.goto(
//       'https://translate.google.com/translate_tts?ie=UTF-8&q=war&tl=en&total=1&idx=0&textlen=3&tk=129339.483021&client=webapp&prev=input',
//       { waitUntil: 'domcontentloaded' },
//     );
//     const path = await download(page, () =>
//       page.click(
//         'a[href="http://file-examples.com/wp-content/uploads/2017/02/file_example_CSV_5000.csv"]',
//       ),
//     );

//     const { size } = await util.promisify(fs.stat)(path);
//     console.log(path, `${size}B`);
//   } finally {
//     await browser.close();
//   }
// })().catch(e => {
//   console.error(e.stack);
//   process.exit(1);
// });

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.goto(
    "https://translate.google.com/translate_tts?ie=UTF-8&q=war&tl=en&total=1&idx=0&textlen=3&tk=129339.483021&client=webapp&prev=input"
  );

  const example = await page.$("video");

  await example.click({
    button: "right"
  });
  await page.screenshot({ path: "example.png" });
  await page.waitFor(100000);
  debugger;
  await browser.close();
})();
