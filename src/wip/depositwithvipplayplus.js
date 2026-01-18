const wdio = require('webdriverio');

const opts={
    path: "/",
    port: 4723,
    loglevel: "error",
    capabilities: {
        platformName: "Android",
        automationName: "UiAutomator2",
        deviceName: "Android Device",
        app: "/home/yash.bhardwaj/Downloads/142.apk",
        appWaitActivity : "*",
    }
}




