// import wdio from "webdriverio";

// // // Registration + valid SSN + Invalid SSN + KYC Verification(above 21) 



const keywords = require("../../keywords");

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

async function KycpRegister() {
  let user = "hsssd_pp_cfap_djp_@gmail.com";
  let mob = "1015019002";
  let ssn = "188858789";
  let password = "Password@1234";
  let year = "~2000"; // 2012 for below 21
  const client = await keywords.initClient(opts);
  try{
  //console.log("app launched successfully");
  await keywords.pause(client, 1000);
  await keywords.click(client, "~Share Location");
  await keywords.pause(client, 2000);
  await keywords.click(
    client,
    "id=com.android.permissioncontroller:id/permission_allow_foreground_only_button"
  );
  await keywords.pause(client, 2000);
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
  //console.log("info box clicked");
  await keywords.pause(client, 3000);
  await keywords.click(client, "~I accept VIP Play's ");
  //console.log("Clicked on the Terms and Conditions checkbox successfully");
  await keywords.pause(client, 3000);
  await keywords.click(client, "~Create Account");
  await keywords.pause(client, 5000);
  //console.log("First step for signup done");
  await keywords.addValue(client, "android.widget.EditText", "000000");
  //console.log("mail opt entered");
  await keywords.hideKeyboard(client);
  await keywords.click(client, "~Submit");
  //console.log("mail opt submitted");
  await keywords.pause(client, 4000);
  await keywords.setValue(client, "android.widget.EditText", mob);
  //console.log("Phone Number entered");
  await keywords.hideKeyboard(client);
  await keywords.pause(client, 4000);
  // //  now submit phone number
  await keywords.click(client, "~Continue");
  //console.log("Phone Number Submitted");
  await keywords.pause(client, 4000);
  //  Phone otp
  await keywords.addValue(client, "android.widget.EditText", "000000");
  //console.log("Phone otp entered");
  await keywords.hideKeyboard(client);
  await keywords.pause(client, 3000);
  //  Phone otp submit
  await keywords.click(client, "~Submit");
  //console.log("Phone otp submitted");
  await keywords.pause(client, 3000);
  //  Fill form Details
  await keywords.addValue(
    client,
    'android=new UiSelector().className("android.widget.EditText").instance(0)',
    "Yash"
  );
  // //console.log("First name filled");
  await keywords.hideKeyboard(client);
  await keywords.click(client, "~I don't have a middle name");
  // //console.log("middlename checkbox clicked");
  await keywords.pause(client, 3000);
  await keywords.addValue(
    client,
    "//*[@class='android.widget.EditText'][@index='7']",
    "Bhardwaj"
  );
  //console.log("last name filled");
  await keywords.hideKeyboard(client);
  await keywords.pause(client, 4000);
  await keywords.click(client, "~Select Suffix");
  await keywords.click(client, "~Jr.");
  await keywords.pause(client, 3000);
  //console.log("now scroll hona chaiye mobile screen");
  await keywords.scrollForward(client);
  await keywords.pause(client, 3000);
  await keywords.click(
    client,
    'android=new UiSelector().className("android.widget.EditText").instance(0)'
  );
  //console.log("now date of birth should get clicked");
  await keywords.pause(client, 2000);
  await keywords.scrollBackward(client);
  await keywords.click(client, year);    //////// 2012 for Below 21 KYC Check
  await keywords.click(client, "~OK");
  //console.log("date should get selected");
  await keywords.setValue(
    client,
    "//android.widget.ScrollView/android.widget.EditText[1]",
    ssn
  );
  await keywords.hideKeyboard(client);
  await keywords.addValue(
    client,
    'android=new UiSelector().className("android.widget.EditText").instance(4)',
    "u"
  );
  await keywords.hideKeyboard(client);
  await keywords.pause(client, 3000);
  await keywords.click(client, "~Universal Boulevard, Orlando, FL, USA");
  //console.log("address successfully selected");
  await keywords.pause(client, 3000);
  await keywords.hideKeyboard(client);
  await keywords.click(client, "~Confirm Identity");
  await keywords.pause(client, 5000);

//   //android.view.View[@content-desc="Only users above 21 y.o. are allowed to use VIP Play"]

  const snackbar = await client.$("~SSN already used");

    if (await snackbar.isExisting()) {
      console.log("✅ Snackbar detected: 'SSN already used'");
      console.log("✅ NEGATIVE TEST PASSED — Registration blocked.");
      return;
    }

  // Check if age restriction error appears
    const ageErrorSelector =
    '//android.view.View[@content-desc="Only users above 21 y.o. are allowed to use VIP Play"]';

    try {
      const errorElement = await client.$(ageErrorSelector);

      // wait up to 4 seconds for the element to appear
      const isDisplayed = await errorElement.waitForDisplayed({
          timeout: 4000,
          timeoutMsg: "No age error detected",
      });

      if (isDisplayed) {
          console.log("Test case passed for kyc as Registration prevented for below 21 years");
          console.log("Registration Failed -> KYC Age Verification");
          return;
      }
    } catch (err) {
      // error not found → continue the script
      console.log("✔️ No age restriction error. Continuing...");
    }

  await keywords.click(client,'android=new UiSelector().description("Done")')
  console.log("User registered successfully");

  await keywords.pause(client, 5000);
  await keywords.click(client, "~Close");
  console.log("Notification turned off successfully");
  await keywords.pause(client, 5000);
}catch(err){
    console.log(`unexpected error occurred: ${err.message}`);
}finally{
    await keywords.pause(client, 3000);
    await client.deleteSession();
    console.log("Session Ended");
}
}

KycpRegister();
