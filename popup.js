let listArr = [];
const MINUTES = [5,15,30,60,120]
var curAlarmIdx = 0;

$(document).ready(function(){
    loadAlarmIdx();
    loadStorage();
    $('.slick-track').slick({
        speed: 300,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
    });
    $('.slick-track').on('afterChange', function(event, slick, currentSlide){
        console.log(currentSlide);
        curAlarmIdx = currentSlide;
        saveAlarmIdx();
    });
    $('.slick-track').slick('slickGoTo',curAlarmIdx);
});

$("#closeBtn").click(function(){
    setAlarm(MINUTES[curAlarmIdx]);
    close();
})

function loadAlarmIdx(){
    curAlarmIdx = localStorage.getItem("alarmIdx");
}
function saveAlarmIdx(){
    localStorage.setItem("alarmIdx", curAlarmIdx);
}

$('#newMessageBtn').click(function(){
    var str;
    var content = document.getElementById("newMessageInput");
    if(content != null) {
        str = content.value;
    }else {
        str = null;
    }
    listArr.push(str);
    saveStorage();
});

// function setAlarm(event){
//     let minutes = parseFloat(event.target.value);
//     chrome.alarms.create({delayInMinutes: minutes});
//     chrome.storage.sync.set({minutes: minutes});
//     window.close();
// }

function setAlarm(value){
    let minutes = parseFloat(value);
    localStorage.setItem("message", listArr[parseInt(Math.random() * listArr.length)]);
    chrome.alarms.create({delayInMinutes: minutes});
    chrome.storage.sync.set({minutes: minutes});
    window.close();
}

function paintMessage(text){
    var list = document.getElementById("myMessageList");
    const li = document.createElement("li");  
    const btn = document.createElement("button");  

    const label = document.createElement("label");
    label.className = "switch";
    const input = document.createElement("input");
    input.setAttribute("type","checkbox");
    const span =  document.createElement("span");
    span.className = "slider round"
    label.appendChild(input);
    label.appendChild(span);
    
    li.style.cssText = "list-style:none;width:196px;height:28px;border: 1px solid #A7A7A7;border-radius:14px;text-align:left;margin: 0 auto;line-height: 28px;margin-top:10px;font-size:12px;padding-left:11px"
    li.innerHTML = text;
    btn.style.cssText = "display: inline-block;width:20px;height:20px;border-radius: 10px; border: none;text-align:center; font-size: 5px;margin-left:6px"
    btn.innerHTML = "X";
    btn.addEventListener('click', deleteMessage);
    li.appendChild(btn);
    li.appendChild(label);
    list.appendChild(li);
}   

function deleteMessage(event){
    const btn = event.target;
    var li = btn.parentNode;
    var list = document.getElementById("myMessageList");
    var idx = 0;
    var tmp = li;
    while( (tmp = tmp.previousSibling) != null ) 
        idx++;
    if(idx > 0) idx--;
    list.removeChild(li);
    listArr.splice(idx,1);
    saveStorage();
}


function saveStorage(){
    localStorage.setItem("messageList", JSON.stringify(listArr));
}

function loadStorage(){
    const loaded = localStorage.getItem("messageList"); // 로컬스토리지에서 가져오기
    if (loaded != null){
        const parsed = JSON.parse(loaded); // JSON을 자바스크립트가 이해할 수 있는 object 데이터 형식으로 변형
        parsed.forEach(function(message){
            listArr.push(message);
            paintMessage(message);
        })
    }
}

// // document.getElementById('sampleSecond').addEventListener('click', setAlarm);
// document.getElementById("set5minAlarm").addEventListener("click", setAlarm);
// document.getElementById("set15minAlarm").addEventListener("click", setAlarm);
// document.getElementById("set30minAlarm").addEventListener("click", setAlarm);
// document.getElementById("set1HourAlarm").addEventListener("click", setAlarm);
// document.getElementById("set2HourAlarm").addEventListener("click", setAlarm);
// document.getElementById("setInstantAlarm").addEventListener("click", setAlarm);

// var i =document.getElementById("setInstantAlarm");
// i.onclick = setAlarm


// document.getElementById('cancelAlarm').addEventListener("click", clearAlarm);