
// Prepares the environment to run the application. When the application is running on a device,
// this function loads the Cordova script. Returns a promise that resolves when the environment is
// ready. This normalizes the differences between running in Cordova and running in an browser.
export function loadEnvironment() {

  // Load the cordova script
  if (!isBrowser()) loadScript("cordova.js");

  // Return a promise that resolves when the environment is ready
  return new Promise(resolve => {
    let event = isBrowser() ? "DOMContentLoaded" : "deviceready";
    document.addEventListener(event, resolve, false);
  });
}

// Hides the splash screen if it's visible
export function hideSplashScreen() {
  if (navigator.splashscreen) navigator.splashscreen.hide();
}

// HACK: This is a hack to determine if the app is currently running in a browser. Since I do *all*
// of my local development in Chrome, this does the trick. This won't work if I use a different
// browser.
function isBrowser() {
  return /chrome/i.test(navigator.userAgent);
}

export function loadScript(source) {
  let scriptElement = document.createElement('script');
  scriptElement.src = source;
  document.getElementsByTagName('head')[0].appendChild(scriptElement);
}
