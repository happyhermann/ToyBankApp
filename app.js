

// function readJson(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function () {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);

//         }
//     }
//     rawFile.send(null);

// }

// readJson("./data.json", function (text) {
//     var Data = JSON.parse(text);
//     console.log(Data);
//     // 거래(Data);
//     TodayList(Data) 
//     yesterDayList(Data)
//     historyList(Data);

// });
 
 
 
  

const 요청url = "https://jytrack64.github.io/data.json"
const 요청객체 = new XMLHttpRequest();
요청객체.open('GET', 요청url);
요청객체.responseType = 'json';
요청객체.send(); 
요청객체.onload = () => {
    const obj = 요청객체.response;
    const groupedResult = groupByDate(obj);
    console.log(groupByDate(obj));

    const groupKeys = Object.keys(groupedResult)

    for (let i=0; i<groupKeys.length-1; i++) {
        const dateKey = groupKeys[i]
        const groupedItems = groupedResult[dateKey]
        List(dateKey, groupedItems)

        
    }

    // List(obj);
    // List(obj);
    // 1. list 반복 
}

function groupByDate(itemList) {
    const result = {};
    for (let i = 0; i < itemList.length; i++) {
      const date = itemList[i].date
      if(result[date]) {
          result[date].push(itemList[i])
      } else {
          result[date] = [itemList[i]];
      }

    }

    return result;
}



fetch("https://jytrack64.github.io/data.json")
.then(function (res) {
 return res.json()
}).then(function(obj) {
    console.log(obj);
})




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



function List(dateKey, obj) {
    if(new Date(dateKey).getDate() === new Date().getDate()) {
        dateKey = "오늘"



    } 
    let sum = 0;
    for (let i = 0; i < obj.length; i++) {
        let price = obj[i].price;

        if (obj[i].inOut === "in") {
            sum = sum + price;
        } if (obj[i].inOut === "out") {
            sum = sum - price;
        }
        
    }
    const DIV = document.createElement("DIV");
    DIV.className = "dateHeader"
    DIV.textContent = `${dateKey} - 총합 ${sum}`;
    history.appendChild(DIV)
    const UL = document.querySelector('.list')
    const spendingText = document.querySelector('.history_spending')
    
    for (let i = 0; i < obj.length; i++) {

        
        const creLi = document.createElement('LI');
        creLi.className = "creLi";
        const span1 = document.createElement("SPAN");
        const span2 = document.createElement("SPAN");
        span1.textContent = obj[i].item
        // span2.textContent = obj[i].price
        let price = obj[i].price;
        creLi.style.borderBottom = "1px solid #dcdcdc";
        creLi.style.padding = "3px 17px"
        creLi.style.fontSize = "18px"
        creLi.style.fontWeight = "300";
        creLi.style.lineHeight = "27px";
        history.appendChild(creLi);
        creLi.appendChild(span1);
        creLi.appendChild(span2);

        if(obj[i].inOut === "in" )  {
            span2.textContent = `+ ${price}원`
            span2.style.color = "#008000";

          }  
          else if (obj[i].inOut ===     "out") {
            span2.textContent = `- ${price}원`
          }

        if (obj[i].inOut === "in") {
            sum = sum + price;
        } if (obj[i].inOut === "out") {
            sum = sum - price;
        }
    
    }
    //    spendingText.textContent = `${sum}   지출`
 }



// function List(obj) {

//     const UL = document.querySelector('.list')
//     const spendingText = document.querySelector('.history_spending')
//     let sum = 0;

//     for (let i = 0; i < obj.length; i++) {


//         const creLi = document.createElement('LI');
//         creLi.className = "creLi";
//         const span1 = document.createElement("SPAN");
//         const span2 = document.createElement("SPAN");
//         span1.textContent = obj[i].item
//         // span2.textContent = obj[i].price
//         let price = obj[i].price;
//         creLi.style.borderBottom = "1px solid #dcdcdc";
//         creLi.style.padding = "3px 17px"
//         creLi.style.fontSize = "18px"
//         creLi.style.fontWeight = "300";
//         creLi.style.lineHeight = "27px";
//         history.appendChild(creLi);
//         creLi.appendChild(span1);
//         creLi.appendChild(span2);

//         if(obj[i].inOut === "in" )  {
//             span2.textContent = `+ ${price}원`
//             span2.style.color = "#008000";

//           }  
//           else if (obj[i].inOut ===     "out") {
//             span2.textContent = `- ${price}원`
//           }

//         if (obj[i].inOut === "in") {
//             sum = sum + price;
//         } if (obj[i].inOut === "out") {
//             sum = sum - price;
//         }
    
//     }
//        spendingText.textContent = `${sum}   지출`
//  }



//  const getDatatoDate = (obj, date) => {
//     return obj.filter((element) => {
//       return element.date == date;
//     })
//   };
//   function printData(obj) {
//     const uniqueDate = [...new Set(obj.map((element) => element.date))];
//     for(let i =0; i < uniqueDate.length; i++){
//       let selectDate = uniqueDate[i];
//       let selectObj = getDatatoDate(obj, uniqueDate[i]);
//       for(const elem of selectObj){
//         console.log(elem);
//       }
//       console.log("하루끝!")
//     }
 


//  드랍ㄹ다운 

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



