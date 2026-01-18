// import wdio from "webdriverio";
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

async function main() {
  let user = "krishnajiii_pp_cfap_djp_@gmail.com";  // Valid email
  let weakPasswordList = ["12345678", "password", "User@"];  // Weak passwords to test
  const client = await keywords.initClient(opts);
  
  await keywords.pause(client, 1000);
  await keywords.click(client, "~Share Location");
  await keywords.pause(client, 2000);
  await keywords.click(
    client,
    "id=com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );
  await keywords.pause(client, 2000);
  
  await keywords.click(client, "~Signup");  // Click on SignUp button
  await keywords.addValue(
    client,
    'android=new UiSelector().className("android.widget.EditText").instance(0)',
    user
  );

  for (let password of weakPasswordList) {
    console.log(`Testing with weak password: ${password}`);
    
    // Enter weak password
    await keywords.addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(1)',
      password
    );
    
    // Hide keyboard
    await keywords.hideKeyboard(client);
    await keywords.pause(client, 2000);
    
    // Check that "Create Account" button remains disabled
    let createAccountButton = await client.$('~Create Account');
    let isCreateAccountButtonDisabled = await createAccountButton.isEnabled();
    
    // Assert that the "Create Account" button should be disabled
    if (isCreateAccountButtonDisabled) {
      throw new Error('Create Account button is enabled when it should be disabled for a weak password');
    } else {
      console.log("Create Account button is correctly disabled.");
    }
    
    // Check for error message below the password field
    let errorMessage = await client.$('android.widget.TextView');
    let errorText = await errorMessage.getText();
    
    if (errorText !== "Please enter a valid password") {
      throw new Error(`Error message not displayed correctly. Expected 'Please enter a valid password', but got: ${errorText}`);
    } else {
      console.log("Correct error message displayed: 'Please enter a valid password'");
    }

    await keywords.pause(client, 2000);  // Allow some time before moving to the next password
  }
  
  await keywords.pause(client, 5000);
  await client.deleteSession();  // End the session
  console.log("Session Ended");
}

main();


// Correct Appium-native checks
    // const clickable = await createAccBtn.getAttribute("clickable"); // "true" / "false"

    // console.log(`Button state => clickable: ${clickable}`);

    // // If either is true → button is active → FAIL
    // if (clickable === "true") {
    //   throw new Error(`❌ ERROR: 'Create Account' button is ACTIVE for invalid email: ${email}`);
    // }