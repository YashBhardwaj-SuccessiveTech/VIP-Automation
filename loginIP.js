//  Login with Incorrect Password

const keywords = require("./keywords");

const opts = {
  path: "/",
  port: 4723,
  logLevel: "error",
  capabilities: {
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "w8gydyjv5phqyphy",
    "appium:app": "/home/yash.bhardwaj/Downloads/119.apk",
    "appium:appWaitActivity": "*"
  },
};

async function loginIP() {
  const client = await keywords.initClient(opts);
  console.log("App launched successfully");

  let userMail = "man_pp_cfap_djp_@gmail.com";
  let Password = "Password@123";  // use wrong value for testing block

  try {
    await keywords.pause(client, 4000);

    // LOCATION PERMISSION
    await keywords.click(client, '~Share Location');
    await keywords.pause(client, 3000);
    await keywords.click(
      client,
      'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button'
    );
    await keywords.pause(client, 3000);
    console.log("Successfully shared location");

    // LOGIN SCREEN
    await keywords.click(client, '~Login');
    console.log("Login button clicked");
    await keywords.pause(client, 2000);

    // ENTER EMAIL
    await keywords.addValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(0)',
      userMail
    );
    console.log("Email entered");


    // ==========================
    // FIRST LOGIN ATTEMPT
    // ==========================
    await keywords.setValue(
      client,
      'android=new UiSelector().className("android.widget.EditText").instance(1)',
      Password
    );
    console.log("Password entered (Attempt 1)");
    await keywords.pause(client, 1500);

    await keywords.click(
      client,
      'android=new UiSelector().description("Log in").instance(1)'
    );
    await keywords.pause(client, 3000);

    let invalidMsg = await client.$('~Email or password is incorrect');
    await keywords.pause(client, 2000);


    // ==================================================
    // WRONG PASSWORD HANDLING (4 ATTEMPTS LOGIC)
    // ==================================================
    if (await invalidMsg.isExisting()) {
      console.log("Invalid password on attempt 1");

      let attempt = 2;
      let loginSuccess = false;

      while (attempt <= 4 && !loginSuccess) {
        console.log(`Retry attempt ${attempt} of 4`);

        // Clear password
        await keywords.setValue(
          client,
          'android=new UiSelector().className("android.widget.EditText").instance(1)',
          ""
        );

        // Enter password again
        await keywords.setValue(
          client,
          'android=new UiSelector().className("android.widget.EditText").instance(1)',
          Password
        );

        await keywords.pause(client, 1500);

        await keywords.click(
          client,
          'android=new UiSelector().description("Log in").instance(1)'
        );
        await keywords.pause(client, 3000);//////////////////////////////

        const incorrectPopup = await client.$('~Email or password is incorrect');


        if (attempt === 4) {
            console.log("❌ Should be BLOCKED after 4 wrong attempts!");

            // Look for block message
            // await keywords.pause(client, 2000);
            const blockedMessage = await client.$(
              '~Please check your credentials or contact support at support@vipplayapp.com if you need help.'
            );
            await keywords.pause(client, 3000);

            if (await blockedMessage.isExisting()) {
              console.log("✅ Test case passed successfully as user is blocked after 3 attempt");
              console.log("✅ BLOCK MESSAGE IS VISIBLE");
              throw new Error("User Blocked After 4 Wrong Login Attempts");
            } else {
              throw new Error("Block message NOT found but user blocked");
            }
          }

        // ❌ WRONG PASSWORD LOGIC
        if (await incorrectPopup.isExisting()) {
          console.log(`Invalid credentials on attempt ${attempt}`);

          attempt++;
          continue;
        }

        // ✔ LOGIN SUCCESS
        console.log(`Login successful on attempt ${attempt}`);
        loginSuccess = true;
      }
    }


    // ==================================================
    // SUCCESSFUL LOGIN → OTP FLOW
    // (This only runs if loginSuccess === true)
    // ==================================================
    console.log("Proceeding to OTP step...");

    await keywords.addValue(client, 'android.widget.EditText', "000000");
    console.log("OTP entered");

    await keywords.click(client, '~Submit');
    console.log("OTP submitted");

    await keywords.pause(client, 3000);

    const HomeDashBoard = await client.$(
      'android=new UiSelector().className("android.view.View").instance(3)'
    );

    if (await HomeDashBoard.isDisplayed()) {
      console.log("Logged in Successfully");
    } else {
      console.log("Some error occurred while logging in");
    }

    await keywords.pause(client, 6000);

    await keywords.click(client, "~Close");
    console.log("Notifications turned off");

    await keywords.pause(client, 3000);


  } catch (err) {
    console.log(" error during login:", err.message);

  } finally {
    await keywords.pause(client, 4000);
    await client.deleteSession();
    console.log("Session ended");
  }
}

loginIP();

module.exports = { loginIP };
