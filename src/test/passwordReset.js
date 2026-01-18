const keywords = require('../../keywords');

const opts = {
    path : "/",
    port : 4723,
    logLevel : "error",
    capabilities: {
        platformName: "Android",
        "appium:automationName": "UiAutomator2",
        "appium:deviceName": "Android Device",
        "appium:app":"/home/yash.bhardwaj/Downloads/142.apk",
        "appium:appWaitActivity": "*"
    }
}

async function passwordReset() {
    const client = await keywords.initClient(opts);
    console.log("app launched successfully");
    const userMail = "krishnajiii_pp_cfap_djp_@gmail.com";
    try{
        await keywords.pause(client, 4000);

        await keywords.click(client, '~Share Location');

        await keywords.pause(client, 3000);

        await keywords.click(client, 'id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');

        await keywords.pause(client, 3000);
    
        console.log("successfully shared location");

        // Login Flow...
        await keywords.click(client, '~Login');

        console.log("Login button clicked");

        await keywords.pause(client, 2000);

        await keywords.addValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(0)', userMail);

        console.log("email entered");
        await keywords.hideKeyboard(client);

        await keywords.click(client, "~Reset Password");
        await keywords.pause(client, 3000);

        await keywords.click(client, "~Reset Password");
        await keywords.pause(client, 3000);

        await keywords.setValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(0)', "000000");
        await keywords.hideKeyboard(client);
        await keywords.pause(client, 3000);

        await keywords.setValue(client, 'android=new UiSelector().className("android.widget.EditText").instance(1)', "Password@1234");
        await keywords.hideKeyboard(client);
        await keywords.pause(client, 3000);

        await keywords.click(client, "~Reset Password");
        await keywords.pause(client, 3000);

        await keywords.click(client, '~Okay');
        await keywords.pause(client, 2000);
        console.log("Password changed successfully");

    }catch(err){
        console.log(`some error occurred while running the script : ${err.message}`);
    }finally{
        await client.deleteSession();
        console.log("session ended successfully");
    }
}

passwordReset();

