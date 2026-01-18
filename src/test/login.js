// LOGIN WITH PASSWORD RESET

const keywords = require("../../keywords");

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
async function login() {
  const client = await keywords.initClient(opts);
  console.log("app launched successfully");
  let userMail = "nishintt_pp_cfap_djp_@gmail.com";
  let password = "Password@1234";
    try{
      await keywords.pause(client, 4000);

     await keywords.click(client, '~Share Location');

     await keywords.pause(client, 3000);

     await keywords.click(client, 'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');

     await keywords.pause(client, 3000);

     console.log("successfully shared location");

    //    Login Flow...
      await keywords.click(client, '~Login');

      console.log("Login button clicked");

      await keywords.pause(client, 2000);

      await keywords.addValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(0)', userMail);

      console.log("email entered");



      // here starts password reset

      // await keywords.click(client, "~Reset Password");
      // await keywords.pause(client, 3000);

      // await keywords.click(client, "~Reset Password");
      // await keywords.pause(client, 3000);

      // await keywords.setValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(0)', "000000");
      // await keywords.hideKeyboard(client);
      // await keywords.pause(client, 3000);

      // await keywords.setValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(1)', password);
      // await keywords.hideKeyboard(client);
      // await keywords.pause(client, 3000);

      // await keywords.click(client, "~Reset Password");
      // await keywords.pause(client, 3000);

      // await keywords.click(client, '~Okay');
      // await keywords.pause(client, 2000);
      // console.log("Password changed successfully");

      // here ends password reset



      await keywords.addValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(1)', password);

      console.log("password entered");

      await keywords.pause(client, 2000);

      await keywords.click(client, 'android=new UiSelector().description("Log in").instance(1)');

      await keywords.pause(client, 4000);

    // case-01 : Invalid Credentials
      const invalidMsg = await client.$('~Email or password is incorrect');
      if(await invalidMsg.isExisting()){
        throw new Error("Login failed due to invalid Credentials");
        // console.log("Login failed due to invalid Credentials");
        // return;
      }

      // case-02 : Blocked User
      const invalidMsg2 = await client.$('~Email or password is incorrect');
      if(await invalidMsg2.isExisting()){
        throw new Error("User is Blocked contact to support");
        // console.log("Login failed due to invalid Credentials");
        // return;
      }

      await keywords.addValue(client, 'android.widget.EditText', '000000');

      console.log("mail otp entered");

      await keywords.click(client, '~Submit');

      console.log("mail otp submitted");

      await keywords.pause(client, 3000);

      const HomeDashBoard = await client.$('android=new UiSelector().className("android.view.View").instance(3)');
      if(await HomeDashBoard.isDisplayed()){
        console.log("Logged in Successfully");
      }else{
        console.log("Some Error Occurred during Login");
      }

      await keywords.pause(client, 6000);

      await keywords.click(client, '~Close');
      console.log("Notifications turned off successfully");
      await keywords.pause(client, 4000);

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

     }catch(err){
         console.log("unexpected error during login :", err.message);
     }finally{
         await keywords.pause(client, 8000);
         await client.deleteSession();
         console.log("Session ended");
     }
 }

 login();

module.exports ={login};