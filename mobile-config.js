// This section sets up some basic app metadata,
// the entire section is optional.
// App.info({
//   id: '',
//   name: 'SIR+',
//   description: 'Database of Surplus Industrial Components',
//   author: 'Patrick Levy',
//   email: 'mrpatricklevy@gmail.com',
//   website: 'http://web.engr.oregonstate.edu/~levyp/JS-Resume/'
// });

//
App.accessRule('http://10.0.2.2:3000/*');
App.accessRule('http://svcs.ebay.com/*');
App.accessRule('http://159.203.93.175:3000/*');
App.accessRule('*');

// Set up resources such as icons and launch screens.
App.icons({
  // 'iphone': '/public/sirLogo.png',
  // 'iphone_2x': '/public/sirLogo.png',
  'android_ldpi': 'public/sirpluslogo.png',
  'android_mdpi': 'public/sirpluslogo.png',
  'android_hdpi': 'public/sirpluslogo.png',
  'android_xhdpi': 'public/sirpluslogo.png'
  // ... more screen sizes and platforms ...
});

App.launchScreens({
//   // 'iphone': '/pubic/sirLogo.png',
//   // 'iphone_2x': '/public/sirLogo.png',
  'android_ldpi_portrait': 'public/sirpluslogo.png',
  'android_mdpi_portrait': 'public/sirpluslogo.png',
  'android_hdpi_portrait': 'public/sirpluslogo.png',
  'android_xhdpi_portrait': 'public/sirpluslogo.png',
  'android_ldpi_landscape': 'public/sirpluslogo.png',
  'android_mdpi_landscape': 'public/sirpluslogo.png',
  'android_hdpi_landscape': 'public/sirpluslogo.png',
  'android_xhdpi_landscape': 'public/sirpluslogo.png'
//   // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
// App.setPreference('BackgroundColor', '0xff0000ff');
// App.setPreference('HideKeyboardFormAccessoryBar', true);

// Pass preferences for a particular PhoneGap/Cordova plugin
// App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//   APP_ID: '1234567890',
//   API_KEY: 'supersecretapikey'
// });