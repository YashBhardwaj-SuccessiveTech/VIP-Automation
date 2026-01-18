const wdio = require("webdriverio");
const keywords = require("../../keywords");

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
async function main() {
  const client = await keywords.initClient(opts);
  console.log("app launched successfully");
  let userMail = "nishintt_pp_cfap_djp_@gmail.com";
  let password = "Password@1234";
  try {
    await keywords.pause(client, 4000);

    await keywords.click(client, '~Share Location');

    await keywords.pause(client, 3000);

    await keywords.click(client, 'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');

    await keywords.pause(client, 3000);

    console.log("successfully shared location");

      //  Login Flow...
    await keywords.click(client, '~Login');

    console.log("Login button clicked");

    await keywords.pause(client, 2000);

    await keywords.addValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(0)', userMail);

    console.log("email entered");

    await keywords.addValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(1)', password);

    console.log("password entered");

    await keywords.pause(client, 2000);

    await keywords.click(client, 'android=new UiSelector().description("Log in").instance(1)');

    await keywords.pause(client, 4000);

    // case-01 : Invalid Credentials
    const invalidMsg = await client.$("~Email or password is incorrect");
    if (await invalidMsg.isExisting()) {
      console.log("Login failed due to invalid Credentials");
      return;
    }

    await keywords.addValue(client, 'android.widget.EditText', '000000');

    console.log("Mail otp entered");

    await keywords.click(client, '~Submit');

    console.log("Mail otp submitted");

    await keywords.pause(client, 3000);

    const HomeDashBoard = await client.$(
      'android=new UiSelector().className("android.view.View").instance(3)'
    );
    if (await HomeDashBoard.isDisplayed()) {
      console.log("Logged in Successfully");
    } else {
      console.log("Some Error Occurred during Login");
    }

    await keywords.pause(client, 5000);

    await keywords.click(client, '~Close');
    console.log("Notifications turned off successfully");
    await keywords.pause(client,4000);

    const limitedAccessBtn = await client.$('android=new UiSelector().description("Ok")');
      if(await limitedAccessBtn.isExisting()){
        // Handle Limited Access popup (sometimes appears, sometimes not)
        try {
          const limitedAccessBtn = await client.$(
            'android=new UiSelector().description("Ok")'
          );

          await limitedAccessBtn.waitForDisplayed({ timeout: 1500 });  
          await limitedAccessBtn.click();

          console.log("Limited Access popup closed");
        } catch (err) {
          // Popup did NOT appear → script continues safely
          console.log("Limited Access popup not shown");
        }
      }

    await keywords.pause(client, 3000);

    //      Now let's make for payment done

    const WalletBtn = await client.$(
      'android=new UiSelector().descriptionMatches("^\\$.*")'
    );
    await WalletBtn.waitForDisplayed({ timeout: 10000 });
    await keywords.click(client, 'android=new UiSelector().descriptionMatches("^\\$.*")');
    console.log("wallet clicked");

    await keywords.click(client, '~Deposit');
    console.log("Hit deposit button");

    await keywords.pause(client, 3000);

    await keywords.setValue(client, '//android.widget.EditText[@hint="0.00"]', '50.00');
    console.log("amount added for deposit");
    await keywords.hideKeyboard(client);

    // now scroll the screen below
    await keywords.scrollForward(client);
    await keywords.pause(client, 2000);

    //      now enter method

    await keywords.click(client, '~Debit Card');
    console.log("debit card method selected");

    await keywords.pause(client, 3000);

    await keywords.click(client, '~Next');
    console.log("moved for entering card details");

    await keywords.pause(client, 3000);

    await keywords.addValue(client, '//android.widget.EditText[@resource-id="accountNumber"]', '4761732000020023');
    await console.log("Card details entered successfully");

    await keywords.pause(client, 3000);

    await keywords.click(client, 'android=new UiSelector().resourceId("expMonth")');
    await keywords.click(client, 'android=new UiSelector().text("March")');
    console.log("month selected");

    await keywords.pause(client, 3000);

    await keywords.click(client, 'android=new UiSelector().resourceId("expYear")');
    await keywords.click(client, 'android=new UiSelector().text("2032")');
    console.log("year selected");

    await keywords.pause(client, 3000);

    await keywords.addValue(client, 'android=new UiSelector().resourceId("cvv")', '122');
    console.log("security code entered");

    await keywords.hideKeyboard(client);

    await keywords.pause(client, 3000);

    await keywords.click(client, '//android.widget.Button[@resource-id="submitButton"]');

    await keywords.click(client, '~Confirm');
    console.log("confirmed amount");

    await keywords.click(client, '~Ok');

    await keywords.pause(client, 5000);

  } catch (err) {
    console.log("unexpected error during login :", err.message);
  } finally {
    await keywords.pause(client, 8000);
    await client.deleteSession();
    console.log("Session ended");
  }
}

main();
