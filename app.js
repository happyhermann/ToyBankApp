

function readJson(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);

        }
    }
    rawFile.send(null);

}

readJson("./data.json", function (text) {
    var Data = JSON.parse(text);
    console.log(Data);
    // 거래(Data);
    TodayList(Data) 
    yesterDayList(Data)
    historyList(Data);

});
 
 
s

// 강사님 방식  

// const 요청url = "https://eulsoo.github.io/list.json"
// const 요청객체 = new XMLHttpRequest();
// 요청객체.open('GET', 요청url);
// 요청객체.responseType = 'json';
// 요청객체.send();
// 요청객체.onload = () => {
//     const obj = 요청객체.response;
//     할일(obj);
// }



// fetch("https://eulsoo.github.io/list.json")
// .then(function (res) {
//  return res.json()
// }).then(function(obj) {
//     console.log(obj);
// })




const history = document.querySelector(".history");

// function 거래(Data) {


//     let yesterDay = Data.filter(function (e) {
//         return true; e.date === "2022.5.1"


//     })
//     let toDay = Data.filter(function (e) {
//         if (e.date === "2022.5.2") {
//             return true;
//         }

//     })

 

//     console.log(yesterDay)
//     console.log(toDay);



//     spendingText.textContent = sum + "    지출 ";


// };


function historyList(Data) {

    const UL = document.querySelector('.list')
    const spendingText = document.querySelector('.history_spending')
    let sum = 0;

    for (let i = 0; i < Data.length; i++) {


        const creLi = document.createElement('LI');
        creLi.className = "creLi";
        const span1 = document.createElement("SPAN");
        const span2 = document.createElement("SPAN");
        span1.textContent = Data[i].item
        // span2.textContent = Data[i].price
        let price = Data[i].price;
        creLi.style.borderBottom = "1px solid #dcdcdc";
        creLi.style.padding = "3px 17px"
        creLi.style.fontSize = "18px"
        creLi.style.fontWeight = "300";
        creLi.style.lineHeight = "27px";
        history.appendChild(creLi);
        creLi.appendChild(span1);
        creLi.appendChild(span2);

        if(Data[i].inOut === "in" )  {
            span2.textContent = `+ ${price}원`
            span2.style.color = "#008000";

          }  
          else if (Data[i].inOut ===     "out") {
            span2.textContent = `- ${price}원`
          }

        if (Data[i].inOut === "in") {
            sum = sum + price;
        } if (Data[i].inOut === "out") {
            sum = sum - price;
        }
    
    }
       spendingText.textContent = `${sum}   지출`
 }



function TodayList(Data) {
       
    const UL = document.querySelector('.list')
    const spendingText = document.querySelector('.history_spending')
    let sum = 0;

    for (let i = 0; i < Data.length; i++) {

        
        const creLi = document.createElement('LI');
        creLi.className = "creLi";
        const span1 = document.createElement("SPAN");
        const span2 = document.createElement("SPAN");
        span1.textContent = Data[i].item
        // span2.textContent = Data[i].price
        let price = Data[i].price;
        creLi.style.borderBottom = "1px solid #dcdcdc";
        creLi.style.padding = "3px 17px"
        creLi.style.fontSize = "18px"
        creLi.style.fontWeight = "300";
        creLi.style.lineHeight = "27px";
        history.appendChild(creLi);
        creLi.appendChild(span1);
        creLi.appendChild(span2);

        if(Data[i].inOut === "in" )  {
            span2.textContent = `+ ${price}원`
            span2.style.color = "#008000";

          }  
          else if (Data[i].inOut === "out") {
            span2.textContent = `- ${price}원`
          }

        if (Data[i].inOut === "in") {
            sum = sum + price;
        } if (Data[i].inOut === "out") {
            sum = sum - price;
        }
    
    }
       spendingText.textContent = `${sum}   지출`
 }
 



function yesterDayList(Data) {

    const UL = document.querySelector('.list')
    const spendingText = document.querySelector('.history_spending')
    let sum = 0;

    for (let i = 0; i < Data.length; i++) {


        const creLi = document.createElement('LI');
        creLi.className = "creLi";
        const span1 = document.createElement("SPAN");
        const span2 = document.createElement("SPAN");
        span1.textContent = Data[i].item
        // span2.textContent = Data[i].price
        let price = Data[i].price;
        creLi.style.borderBottom = "1px solid #dcdcdc";
        creLi.style.padding = "3px 17px"
        creLi.style.fontSize = "18px"
        creLi.style.fontWeight = "300";
        creLi.style.lineHeight = "27px";
        history.appendChild(creLi);
        creLi.appendChild(span1);
        creLi.appendChild(span2);

        if(Data[i].inOut === "in" )  {
          span2.textContent = `+ ${price}원`
          span2.style.color = "#008000";
       
        }  
        else if (Data[i].inOut === "out") {
          span2.textContent = `- ${price}원`
 
        }

        // 수입, 지출 구분 

        if (Data[i].inOut === "in") {
            sum = sum + price;
        } if (Data[i].inOut === "out") {
            sum = sum - price;
        }

        //수입 지출 계산 
    
    }
       spendingText.textContent = `${sum}   지출`
 }
 


//  드랍다운 

const main = document.querySelector(".bankApp")
const dropMenu = document.querySelector('.scroll');




const { width: mainWidth, height: mainHeight } =
    main.getBoundingClientRect();
const { width: dropMenuWidth, height: dropMenuHeight } =
    dropMenu.getBoundingClientRect();
let isDragging = null;
let originLeft = null;
let originTop = null;
let originX = null;
let originY = null;



dropMenu.addEventListener('mousedown', (e) => {
    isDragging = true;
    originX = e.clientX;
    originY = e.clientY;
    originLeft = dropMenu.offsetLeft;
    originTop = dropMenu.offsetTop;
});



main.addEventListener("mouseup", (e) => {
    isDragging = false;
});



main.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;
        const endOfXPoint = mainWidth - dropMenuWidth;
        const endOfYPoint = mainHeight - dropMenuHeight;
        dropMenu.style.left = `${Math.min(Math.max(0, originLeft + diffX), endOfXPoint)}px`
        dropMenu.style.top = `${Math.min(Math.max(0, originTop + diffY), endOfYPoint)}px`

    }
});



