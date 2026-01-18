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
    const client = await keywords.initClient(opts);
    let existingEmail = "krishnajiii_pp_cfap_djp_@gmail.com";  // already registered email
    let validPassword = "Password@1234";
    try{
        await keywords.pause(client, 1500);

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

        // Enter already-registered email
        await keywords.addValue(
            client,
            'android=new UiSelector().className("android.widget.EditText").instance(0)',
            existingEmail
        );

        // Enter valid password
        await keywords.addValue(
            client,
            'android=new UiSelector().className("android.widget.EditText").instance(1)',
            validPassword
        );

        await keywords.hideKeyboard(client);
        await keywords.pause(client, 1000);

        // Check T&C box
        await keywords.click(
            client,
            "~I confirm the provided information is complete and accurate. I am not a Prohibited Participant meaning an individual: (1) who is prohibited from wagering pursuant to the Sports Gaming Act, T.C.A. § 4-49-112; (2) who is on any self-exclusion list or Council exclusion list; (3) whose participation may undermine the integrity of the wagering or the Sporting Event; (4) who is excluded from wagering for any other good cause; or (5) any Person who makes or attempts to make a Wager as an agent or proxy on behalf of another."
        );

        await keywords.pause(client, 1000);

        await keywords.click(client, "~I accept VIP Play's ");
        await keywords.pause(client, 1000);

        // Submit Create Account
        await keywords.click(client, "~Create Account");
        await keywords.pause(client, 4000); 

        // Expected toast: "Registration failed"
        const toastSelector = '~Registration failed';
        const toast = await client.$(toastSelector);

        if (!(await toast.isExisting())) {
            await client.deleteSession();
            throw new Error("❌ ERROR: Expected toast 'Registration failed' but it did NOT appear.");
        }

        console.log("✅ Toast detected: 'Registration failed'");

        console.log("✅ Negative test passed: Existing email correctly prevented registration.");
        
    }catch(err){
        console.error("❌ TEST FAILED:", err.message);
    }finally{
        await client.deleteSession();
        console.log("Session Ended");
    }
}

main();
