const wdio = require('webdriverio');
const keywords = require('../../keywords.js')
const {initClient,login, click, pause, addValue, setValue, hideKeyboard, scrollBackward, scrollForward, BankAccountCreation} = require('../../keywords.js');

const opts = {
  path: "/",
  port: 4723,
  logLevel: "error",
  capabilities: {
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "Android Device",
    "appium:app": "/home/yash.bhardwaj/Downloads/142.apk",
    "appium:appWaitActivity": "*",
  },
};

async function depositwithbank(){
    const client = await initClient(opts);

    // LOGIN
    await login(client, "yash1255_pp_cfap_djp_@gmail.com", "Password@1234");

    const WalletBtn = await client.$('android=new UiSelector().descriptionMatches("^\\$.*")');
    await WalletBtn.waitForDisplayed({ timeout: 10000 });
    await click(client, 'android=new UiSelector().descriptionMatches("^\\$.*")');
    console.log("wallet clicked");

    await click(client, '~Deposit');
    console.log("Hit deposit button");

    await pause(client, 3000);

    await setValue(client, '//android.widget.EditText[@hint="0.00"]', '50.00');
    console.log("amount added for deposit");
    await hideKeyboard(client);

    // now scroll the screen below
    await scrollForward(client);
    await pause(client, 2000);
    
    // now enter method

    // BANK ACCOUNT CREATION
    await BankAccountCreation(client);

    await setValue(
      client,
      'android=new UiSelector().className("android.widget.EditText")',
      "50.00"
    );

    console.log("amount added for deposit");

    await hideKeyboard(client);

    await click(
      client,
      'android=new UiSelector().description("Aerosync Bank (MFA)")'
    );

    await click(client, "~Next");
    await pause(client, 3000);

    await click(client, "~Confirm");
    await pause(client, 4000);

    await click(client, 'android=new UiSelector().description("Ok")');

    await pause(client, 5000);

    await client.deleteSession();
    console.log("session ended successfullly");    
}

depositwithbank();
