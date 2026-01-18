const wdio = require("webdriverio");

async function initClient(opts) {
  // initialize and return the webdriverio client
  const client = await wdio.remote(opts);
  return client;
}

async function click(client, selector) {
  const el = await client.$(selector);
  console.log(
    "User perform click operation on element using locator:- " + selector
  );
  await el.click();
  return el;
}

async function addValue(client, selector, value) {
  const el = await client.$(selector);
  await el.click();
  await el.addValue(value);
  console.log(
    "User perform enter operation on element using locator:- " +
      selector +
      "Test Data:- " +
      value
  );
  return el;
}

async function setValue(client, selector, value) {
  const el = await client.$(selector);
  await el.click();
  await el.setValue(value);
  console.log(
    "User perform enter operation on element using locator:- " +
      selector +
      "Test Data:- " +
      value
  );
  return el;
}

async function hideKeyboard(client) {
  try {
    await client.hideKeyboard();
  } catch (e) {
    console.log(`keyboard was not present but done hidekeyboard ${e.message}`);
    // ignore if keyboard not present
  }
}

async function pause(client, ms) {
  return client.pause(ms);
}

async function scrollForward(client) {
  // execute the UiScrollable forward command
  await client.$(
    "android=new UiScrollable(new UiSelector().scrollable(true)).scrollForward()"
  );
}

async function scrollBackward(client) {
  await client.$(
    'android=new UiScrollable(new UiSelector().className("android.view.View").instance(7)).scrollBackward()'
  );
}

async function BankAccountCreation(client) {
  await click(client, "~Online Banking");
  console.log("Aeropay method selected");

  await pause(client, 3000);

  await click(client, "~Next");
  console.log("moved for adding bank details");

  await pause(client, 5000);

  await click(client, '//android.widget.Button[@text="Continue"]');
  console.log("continue to select bank");

  await click(
    client,
    '//android.widget.TextView[@text="Aerosync Bank (MFA)"]'
    // 'android=new UiSelector().className("android.view.View").instance(57)'
  );
  console.log("Aerosync(MFA) bank selected");

  await pause(client, 3000);

  await setValue(
    client,
    '//android.widget.EditText[@resource-id="2069832"]',
    "fghjhfjffhjuik"
  );
  await hideKeyboard(client);

  await setValue(
    client,
    '//android.widget.EditText[@resource-id="2069833"]',
    "fghjjfjfj46565"
  );
  await hideKeyboard(client);

  console.log("Bank Details successfully filled");

  await pause(client, 3000);

  await scrollForward(client);

  await click(client, "//android.widget.CheckBox");
  await pause(client, 2000);

  await click(client, '//android.widget.Button[@text="Continue"]');

  await pause(client, 2000);

  await click(client, 'android=new UiSelector().text("Verify")');
  await pause(client, 2000);

  await setValue(
    client,
    '//android.widget.EditText[@resource-id="answer"]',
    "00000000"
  );
  await hideKeyboard(client);

  await click(client, '//android.widget.Button[@text="Verify"]');
  await pause(client, 5000);

  await click(client, '//android.widget.Button[@text="Continue"]');
  await pause(client, 6000);

  await click(client, '//android.widget.Button[@text="Continue"]');
  await pause(client, 5000);
}

async function login(client, usermail, password) {
  try {
    await pause(client, 4000);

    await click(client, '~Share Location');
    await pause(client, 3000);

    await click(client, 'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');
    await pause(client, 3000);

    console.log("successfully shared location");

    // Login Flow
    await click(client, '~Login');
    console.log("Login button clicked");

    await pause(client, 2000);

    await addValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(0)', usermail);
    console.log("email entered");

    await addValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(1)', password);
    console.log("password entered");

    await pause(client, 2000);

    await click(client, 'android=new UiSelector().description("Log in").instance(1)');

    await pause(client, 4000);

    // case-01 : Invalid Credentials
    const invalidMsg = await client.$('~Email or password is incorrect');
    if (await invalidMsg.isExisting()) {
      console.log("Login failed due to invalid Credentials");
      return false;
    }

    await addValue(client, 'android.widget.EditText', '000000');
    console.log("mail otp entered");

    await click(client, '~Submit');
    console.log("mail otp submitted");

    await pause(client, 3000);

    const HomeDashBoard = await client.$('android=new UiSelector().className("android.view.View").instance(3)');
    if (await HomeDashBoard.isDisplayed()) {
      console.log("Logged in Successfully");
    } else {
      console.log("Some Error Occurred during Login");
    }

    await pause(client, 6000);

    await click(client, '~Close');
    console.log("Notifications turned off successfully");
    await pause(client, 4000);

    const limitedAccessBtn = await client.$('android=new UiSelector().description("Ok")');
    if (await limitedAccessBtn.isExisting()) {
      try {
        await limitedAccessBtn.waitForDisplayed({ timeout: 1500 });
        await limitedAccessBtn.click();
        console.log("Limited Access popup closed");
      } catch (err) {
        console.log("Limited Access popup not shown");
      }
    }
    await pause(client, 3000);
  } catch (err) {
    console.log("unexpected error during login :", err.message);
  }
}

module.exports = {
  initClient,
  click,
  addValue,
  setValue,
  hideKeyboard,
  pause,
  scrollForward,
  scrollBackward,
  BankAccountCreation,
  login
};
