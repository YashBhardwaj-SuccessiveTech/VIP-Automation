const wdio = require("webdriverio");
const keywords = require("../../keywords");
const {initClient, click, pause, addValue, setValue, hideKeyboard, scrollBackward, scrollForward, BankAccountCreation } = require('../../keywords');

const opts = {
  path: "/",
  port: 4723,
  logLevel: "error",
  capabilities: {
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "Android Device",
    "appium:app": "/home/yash.bhardwaj/Downloads/119.apk",
    "appium:appWaitActivity": "*",
  },
};

async function withdrawBank() {
  const client = await initClient(opts);
  console.log("app launched successfully");
  let userMail = "preeti25_pp_cfap_djp_@gmail.com";
  let password = "Password@1234";
  try {
    await pause(client, 4000);

    await click(client, "~Share Location");

    await pause(client, 3000);

    await click(
      client,
      "id=com.android.permissioncontroller:id/permission_allow_foreground_only_button"
    );

    await pause(client, 3000);

    console.log("successfully shared location");

    //    Login Flow...
    await click(client, "~Login");

    console.log("Login button clicked");

    await pause(client, 2000);

    await addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(0)',
      userMail
    );

    console.log("email entered");

    await addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(1)',
      password
    );

    console.log("password entered");

    await pause(client, 2000);

    await click(
      client,
      'android=new UiSelector().description("Log in").instance(1)'
    );

    await pause(client, 4000);

    // case-01 : Invalid Credentials
    const invalidMsg = await client.$("~Email or password is incorrect");
    if (await invalidMsg.isExisting()) {
      console.log("Login failed due to invalid Credentials");
      return;
    }

    await addValue(client, "android.widget.EditText", "000000");

    console.log("Mail otp entered");

    await click(client, "~Submit");

    console.log("Mail otp submitted");

    await pause(client, 3000);

    const HomeDashBoard = await client.$(
      'android=new UiSelector().className("android.view.View").instance(3)'
    );
    if (await HomeDashBoard.isDisplayed()) {
      console.log("Logged in Successfully");
    } else {
      console.log("Some Error Occurred during Login");
    }

    await pause(client, 5000);

    await click(client, "~Close");
    console.log("Notifications turned off successfully");

    await pause(client,4000);

    await pause(client, 3000);

    //      Now let's make for withdraw done

    const WalletBtn = await client.$(
      'android=new UiSelector().descriptionMatches("^\\$.*")'
    );

    await WalletBtn.waitForDisplayed({ timeout: 10000 });
    await click(
      client,
      'android=new UiSelector().descriptionMatches("^\\$.*")'
    );
    console.log("wallet clicked");

    await click(client, "~Withdraw");
    console.log("Hit withdraw button");

    await pause(client, 3000);

    await setValue(
      client,
      '//android.widget.EditText[@hint="0.00"]',
      "1.00"
    );
    console.log("amount added for withdraw");
    await hideKeyboard(client);
    await pause(client, 2000);

    await BankAccountCreation(client);

    // yha pr tha bank account creation wala code

    await setValue(
      client,
      'android=new UiSelector().className("android.widget.EditText")',
      "15.00"
    );

    console.log("amount added for withdraw");

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
  } catch (err) {
    console.log("unexpected error during login :", err.message);
  } finally {
    await pause(client, 8000);
    await client.deleteSession();
    console.log("Session ended");
  }
}


withdrawBank();








// await keywords.click(client, "~Online Banking");
    // console.log("Aeropay method selected");

    // await keywords.pause(client, 3000);

    // await keywords.click(client, "~Next");
    // console.log("moved for adding bank details");

    // await keywords.pause(client, 5000);

    // //   abhi kahani yaha pr hai

    // await keywords.click(client, '//android.widget.Button[@text="Continue"]');
    // console.log("continue to select bank");

    // await keywords.click(
    //   client,
    //   'android=new UiSelector().className("android.view.View").instance(57)'
    // );
    // console.log("Aerosync bank selected");

    // await keywords.pause(client, 3000);

    // await keywords.setValue(
    //   client,
    //   '//android.widget.EditText[@resource-id="2069832"]',
    //   "fghjhfjf"
    // );
    // await keywords.hideKeyboard(client);

    // await keywords.setValue(
    //   client,
    //   '//android.widget.EditText[@resource-id="2069833"]',
    //   "fghjjfjfj"
    // );
    // await keywords.hideKeyboard(client);

    // console.log("Bank Details successfully filled");

    // await keywords.pause(client, 3000);

    // await keywords.click(client, "//android.widget.CheckBox");
    // await keywords.pause(client, 2000);

    // await keywords.click(client, '//android.widget.Button[@text="Continue"]');

    // await keywords.pause(client, 2000);

    // await keywords.click(client, 'android=new UiSelector().text("Verify")');
    // await keywords.pause(client, 2000);

    // await keywords.setValue(
    //   client,
    //   '//android.widget.EditText[@resource-id="answer"]',
    //   "00000000"
    // );
    // await keywords.hideKeyboard(client);

    // await keywords.click(client, '//android.widget.Button[@text="Verify"]');
    // await keywords.pause(client, 5000);

    // await keywords.click(client, '//android.widget.Button[@text="Continue"]');
    // await keywords.pause(client, 6000);

    // await keywords.click(client, '//android.widget.Button[@text="Continue"]');
    // await keywords.pause(client, 5000);

    // await client.clear('android.widget.EditText');
