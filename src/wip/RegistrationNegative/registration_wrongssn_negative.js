const keywords = require("../../../keywords.js");

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

async function wrongSSN() {
  let user = "wrron11_pp_cfap_djp_@gmail.com";
  let mob = "3017107012";
  let wrongSSN = "123456789"; 
  let password = "Password@1234";

  const client = await keywords.initClient(opts);

  try {
    // Share Location
    await keywords.pause(client, 1000);
    await keywords.click(client, "~Share Location");
    await keywords.pause(client, 2000);
    await keywords.click(
      client,
      "id=com.android.permissioncontroller:id/permission_allow_foreground_only_button"
    );
    await keywords.pause(client, 2000);

    // Signup start
    await keywords.click(client, "~Signup");

    await keywords.addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(0)',
      user
    );
    await keywords.addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(1)',
      password
    );

    await keywords.hideKeyboard(client);
    await keywords.pause(client, 2000);

    await keywords.click(
      client,
      "~I confirm the provided information is complete and accurate. I am not a Prohibited Participant meaning an individual: (1) who is prohibited from wagering pursuant to the Sports Gaming Act, T.C.A. § 4-49-112; (2) who is on any self-exclusion list or Council exclusion list; (3) whose participation may undermine the integrity of the wagering or the Sporting Event; (4) who is excluded from wagering for any other good cause; or (5) any Person who makes or attempts to make a Wager as an agent or proxy on behalf of another."
    );

    await keywords.pause(client, 3000);
    await keywords.click(client, "~I accept VIP Play's ");
    await keywords.pause(client, 3000);

    await keywords.click(client, "~Create Account");
    await keywords.pause(client, 5000);

    // Email OTP
    await keywords.addValue(client, "android.widget.EditText", "000000");
    await keywords.hideKeyboard(client);
    await keywords.click(client, "~Submit");
    await keywords.pause(client, 4000);

    // Phone
    await keywords.setValue(client, "android.widget.EditText", mob);
    await keywords.hideKeyboard(client);
    await keywords.pause(client, 4000);

    await keywords.click(client, "~Continue");
    await keywords.pause(client, 4000);

    // Phone OTP
    await keywords.addValue(client, "android.widget.EditText", "000000");
    await keywords.hideKeyboard(client);
    await keywords.pause(client, 3000);

    await keywords.click(client, "~Submit");
    await keywords.pause(client, 3000);

    // Form details
    await keywords.addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(0)',
      "Yash"
    );
    await keywords.hideKeyboard(client);

    await keywords.click(client, "~I don't have a middle name");
    await keywords.pause(client, 3000);

    await keywords.addValue(
      client,
      "//*[@class='android.widget.EditText'][@index='7']",
      "Bhardwaj"
    );
    await keywords.hideKeyboard(client);
    await keywords.pause(client, 4000);

    await keywords.click(client, "~Select Suffix");
    await keywords.click(client, "~Jr.");
    await keywords.pause(client, 3000);

    await keywords.scrollForward(client);
    await keywords.pause(client, 3000);

    // DOB
    await keywords.click(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(0)'
    );
    await keywords.pause(client, 2000);
    await keywords.scrollBackward(client);
    await keywords.click(client, "~2000");
    await keywords.click(client, "~OK");

    // Wrong SSN
    await keywords.setValue(
      client,
      "//android.widget.ScrollView/android.widget.EditText[1]",
      wrongSSN
    );
    await keywords.hideKeyboard(client);

    // Address
    await keywords.addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(4)',
      "u"
    );
    await keywords.hideKeyboard(client);
    await keywords.pause(client, 3000);

    await keywords.click(client, "~Universal Boulevard, Orlando, FL, USA");
    await keywords.pause(client, 3000);
    await keywords.hideKeyboard(client);

    // Confirm Identity
    await keywords.click(client, "~Confirm Identity");
    await keywords.pause(client, 5000);

    // ---- VALIDATION ----
    const snackbar = await client.$("~SSN already used");

    if (await snackbar.isExisting()) {
      console.log("✅ Snackbar detected: 'SSN already used'");
      console.log("✅ NEGATIVE TEST PASSED — Registration blocked.");
    } else {
      throw new Error('❌ Expected snackbar "SSN already used" but it did NOT appear.');
    }

  } catch (err) {
    console.error("❌ TEST FAILED:", err.message);
  } finally {
    // close session ALWAYS at the end
    await client.deleteSession();
    console.log("Session Ended");
  }
}

wrongSSN();
