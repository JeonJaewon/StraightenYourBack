
function setAlarm(event){
    let minutes = parseFloat(event.target.value);
    chrome.alarms.create({delayInMinutes: minutes});
    chrome.storage.sync.set({minutes: minutes});
    window.close();
}


// document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('set5minAlarm').addEventListener('click', setAlarm);
document.getElementById('setInstantAlarm').addEventListener('click', setAlarm);
// document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);