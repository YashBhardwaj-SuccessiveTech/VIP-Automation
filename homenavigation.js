const keywords = require("./keywords");

const opts = {
  path: "/",
  port: 4723,
  logLevel: "error",
  capabilities: {
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "Android Device",
    "appium:app": "/home/yash.bhardwaj/Downloads/119.apk",
    "appium:appWaitActivity": "*"
  },
};

async function homenavigation() {
  const client = await keywords.initClient(opts);
  try{
    await keywords.login(client, "abhishek_pp_cfap_djp_@gmail.com", "Password@1234");
    await keywords.pause(client,3000);

    await keywords.pause(client, 3000);

    // get contexts
    const contexts = await client.getContexts();
    console.log("Contexts:", contexts);

    // switch to WEBVIEW if available
    if (contexts.length > 1) {
      await client.switchContext(contexts[1]);
    }

    // click Live Now
    const liveNow = await client.$('//android.widget.ImageView[@content-desc="Live Now Tab 2 of 5"]');
    await liveNow.waitForDisplayed({ timeout: 8000 });
    await liveNow.click();


    await keywords.click(client,'android=new UiSelector().description("Live Now Tab 2 of 5")')
    const livebetNavigation = await client.$('//android.view.View[@resource-id="KambiBC-content"]/android.view.View/android.view.View/android.view.View');
    await keywords.pause(client,3000);
    if(await livebetNavigation.isExisting()){
      console.log("Navigation successfull for live bet ");
    }

    await keywords.click(client, '//android.widget.ImageView[@content-desc="My Bets Tab 3 of 5"]');

    await keywords.pause(client, 3000);

    const mybetsview = await client.$('//android.webkit.WebView[@text="[Operator] Betting Mobile"]');
    if(await mybetsview.isExisting()){
      console.log("my bets is visible ");
    }
  }catch(err){
    console.log(`Error occurred during home navigation : ${err.message}`);
  }finally{
    await keywords.pause(client, 3000);
    await client.deleteSession();
  }

}

homenavigation()

