
chrome.alarms.onAlarm.addListener(function() {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.notifications.create({
        type:     'basic',
        iconUrl:  'stay_hydrated.jpg',
        title:    'Time to Hydrate',
        message:  'Everyday I\'m Guzzlin\'!',
        buttons: [
          {title: 'Keep it Flowing.'}
        ],
        priority: 0});
  });
// chrome.runtime.onInstalled.addListener(function() {
//     // chrome.storage.sync.set({color: '#3aa757'}, function() {
//     //   console.log('The color is green.');
//     // });
    
//     // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // //   chrome.declarativeContent.onPageChanged.addRules([
//     // //     {actions: [new chrome.declarativeContent.ShowPageAction()]}
//     // //     // conditions: [new chrome.declarativeContent.PageStateMatcher({ })],
//     // //   ]);
//     // });
//     // chrome.declarativeContent.onPageChanged.addRules([{
//     //     actions: [new chrome.declarativeContent.ShowPageAction()],
//     //     conditions: [new chrome.declarativeContent.PageStateMatcher({ })]
//     // }]);
// });


// // chrome.pageAction.onClicked.addListener(function(tab) {
// //     chrome.pageAction.show(tab.id);
// // });
