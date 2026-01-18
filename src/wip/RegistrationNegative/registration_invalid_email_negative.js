// ask about the why valid mail is not giving error in this case.

const keywords = require("../../../keywords");

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

async function main() {

  const invalidEmails = [
    "userexample.com",  // missing @
    "user@.com",        // missing domain name
    "user@com",         // invalid domain extension
    // "yash_pp_cfap_djp_@gmail.com"
  ];

  const validPassword = "Password@1234";

  const client = await keywords.initClient(opts);
  await keywords.pause(client, 2000);

  // Share Location
  await keywords.click(client, "~Share Location");
  await keywords.pause(client, 1500);

  await keywords.click(
    client,
    "id=com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );

  await keywords.pause(client, 1500);

  // Go to Signup
  await keywords.click(client, "~Signup");
  await keywords.pause(client, 1000);

  for (let email of invalidEmails) {
    console.log(`\n Testing invalid email: ${email}`);

    // Tap Email field
    await keywords.click(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(0)'
    );

    // Clear previous value
    await client.$(
      'android=new UiSelector().className("android.widget.EditText").instance(0)'
    ).clearValue();

    // Enter invalid email
    await keywords.setValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(0)',
      email
    );

    // Enter valid password
    await keywords.setValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(1)',
      validPassword
    );

    await keywords.hideKeyboard(client);
    await keywords.pause(client, 1000);

    // Check the T&C box
    await keywords.click(
      client,
      "~I confirm the provided information is complete and accurate. I am not a Prohibited Participant meaning an individual: (1) who is prohibited from wagering pursuant to the Sports Gaming Act, T.C.A. § 4-49-112; (2) who is on any self-exclusion list or Council exclusion list; (3) whose participation may undermine the integrity of the wagering or the Sporting Event; (4) who is excluded from wagering for any other good cause; or (5) any Person who makes or attempts to make a Wager as an agent or proxy on behalf of another."
    );

    await keywords.pause(client, 500);

    await keywords.click(client, "~I accept VIP Play's ");
    await keywords.pause(client, 1000);

    // Locate Create Account button
    const createAccBtn = await client.$('~Create Account');

    // Correct Appium-native checks
    const clickable = await createAccBtn.getAttribute("clickable"); // "true" / "false"

    console.log(`Button state => clickable: ${clickable}`);

    // If either is true → button is active → FAIL
    if (clickable === "true") {
      throw new Error(`❌ ERROR: 'Create Account' button is ACTIVE for invalid email: ${email}`);
    }

    console.log(`✅ PASS: 'Create Account' button remained DISABLED for invalid email: ${email}`);
  }

  console.log("\n🎉 All invalid email tests completed successfully.");

  await client.deleteSession();
  console.log("Session Ended");
}

main().catch(err => {
  console.error("❌ TEST FAILED:", err.message);
});
