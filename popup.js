let listArr = [];
var onOffArr = [];
const MINUTES = [5,15,30,60,120]
var curAlarmIdx = 0;

$(document).ready(function(){
    // localStorage.setItem("onOffList", JSON.stringify([true,true,true,true]));
    loadAlarmIdx();
    loadStorage();
    console.log(onOffArr)
    $('.slick-track').slick({
        speed: 300,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
    });
    $('.slick-track').on('afterChange', function(event, slick, currentSlide){
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
        listArr.push(str);
        onOffArr.push(true);
        saveStorage();
    }else {
        str = null;
        return;
    }
});

// function setAlarm(event){
//     let minutes = parseFloat(event.target.value);
//     chrome.alarms.create({delayInMinutes: minutes});
//     chrome.storage.sync.set({minutes: minutes});
//     window.close();
// }

function setAlarm(value){
    let minutes = parseFloat(value);
    // off된 알람은 거르기
    var randIdx = parseInt(Math.random() * listArr.length);
    while(onOffArr[randIdx]==false)
        randIdx = parseInt(Math.random() * listArr.length);
    localStorage.setItem("message", listArr[randIdx]);
    chrome.alarms.create({delayInMinutes: minutes});
    chrome.storage.sync.set({minutes: minutes});
    window.close();
}

function paintMessage(text, onOffVal){
    var list = document.getElementById("myMessageList");
    const li = document.createElement("li");  

    // 삭제 버튼
    const btn = document.createElement("button");  

    // 스위치
    const label = document.createElement("label");
    label.className = "switch";
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.id = "alarmCheckBox"
    input.addEventListener("click", switchAlarm);
    // input.checked = true;

    // 몇번째 아이템인지 구함
    var idx = 0;
    var tmp = li;
    while( (tmp = tmp.previousSibling) != null ) 
        idx++;
    if(idx > 0) idx--;
    if(onOffVal){
        input.checked = true;
        li.className = "listItem"
        btn.className="listItemBtn";
    }else{
        input.checked = false;
        li.className = "listItem itemFalse"
        btn.className="listItemBtn btnFalse";
    }
    const span =  document.createElement("span");
    span.className = "slider round"
    label.appendChild(input);
    label.appendChild(span);
    
    li.innerHTML = text;
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
    onOffArr.splice(idx,1);
    saveStorage();
}

function saveStorage(){
    localStorage.setItem("messageList", JSON.stringify(listArr));
    localStorage.setItem("onOffList", JSON.stringify(onOffArr));
}

function loadStorage(){
    const loaded = localStorage.getItem("messageList"); // 로컬스토리지에서 가져오기
    const onOff = localStorage.getItem("onOffList"); 
    onOffArr = JSON.parse(onOff);
    if (loaded != null){
        const parsed = JSON.parse(loaded); // JSON을 자바스크립트가 이해할 수 있는 object 데이터 형식으로 변형
        var idx = 0;
        parsed.forEach(function(message){
            listArr.push(message);
            paintMessage(message, onOffArr[idx]);
            idx++;
        })
    }
}

function switchAlarm(event){
    const alarm = event.target.parentNode.parentNode;
    const delBtn = event.target.parentNode.previousSibling;

    // 몇번째 아이템인지 구함
    var idx = 0;
    var tmp = alarm;
    while( (tmp = tmp.previousSibling) != null ) 
        idx++;
    if(idx > 0) idx--;

    if(event.target.checked){ // 체크 된 상태로 색상 변화
        alarm.className = "listItem"
        delBtn.className = "listItemBtn"
        onOffArr[idx] = true;
    }else{
        alarm.className = "listItem itemFalse"
        delBtn.className = "listItemBtn btnFalse"
        onOffArr[idx] = false;
    }
    console.log(onOffArr);
    localStorage.setItem("onOffList", JSON.stringify(onOffArr));
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