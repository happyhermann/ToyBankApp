

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

// comment: 변수명 history는 두가지 위험이 존재함.
// comment: 1. 메모리 누수
// comment:     1-1. const global; function(){global = [0,1,2]} 이렇게 전역변수 global과 global에 데이터를 할당하는 코드가 있다고 가정
// comment:     1-2. 이 상태에서 여러 이유로 const global 선언부를 제거하면 에러가 날까?
// comment:     1-3. 정답은 에러가 안난다. function(){global = [0,1,2]} 단독으로 있더라도 js는 자동으로 global이라는 전역변수를 선언하고 이곳에 데이터를 할당한다
// comment:     1-4. 문제는 이렇게 선언없이 생성된(의도치 않게 생성된) 전역변수는 가비지 컬렉터에 의해 회수되지 않는다. 즉 메모리 누수의 원인이 된다.
// comment: 2. js 기본객체와 중첩
// comment:     2-1. history는 브라우저 주소를 관리하는 기본 객체이다. 이와 동일한 이름의 사용은 피하자
// comment:     2-2. history.back() 과 같이 주소창을 관리하는데 쓰인다.


const history = document.querySelector(".history");

 
// comment: obj는 실제로 Array 타입이 들어오고 있음. 따라서 파라미터명 역시 arr, list, values와 같이 배열임을 암시할 수 있도록 짓기를 권장
// comment: 드물게 json object 또는 그외 모든 원시타입(any)을 의미하는 경우엔 obj라는 이름을 사용하기도 함

function List(dateKey, obj) {
    if(new Date(dateKey).getDate() === new Date().getDate()) {
        dateKey = "오늘"
// comment: 얕은복사에 대해 기억할 것임. 파라미터가 배열타입일 경우 위와 같은 코드는 호출한 쪽의 원본 데이터를 변경하는 사이드이펙트(부작용) 위험이 존재함
        // comment: 이번 경우엔 dateKey가 (깊은복사가 되는) 단순 string 이므로 그런 위험이 없으나 평소 파라미터 값은 변경하지 않는 습관 들이길 권장함.
        // comment: java나 typescript와 같은 여타 언어들에선 실수로라도 파라미터를 변경하지 못하도록 final, readonly와 같은 예약어를 제공하기도 함


    } else if (new Date(dateKey).getDate() === new Date().getDate() -1) {
        dateKey = "어제"


    }
    let sum = 0;
    for (let i = 0; i < obj.length; i++) {
        let price = obj[i].price;

        if (obj[i].inOut === "in") {
            sum = sum + price;
        } else if (obj[i].inOut === "out") {
            sum = sum - price;

  // comment: 양자택일인 상황에선 else if 또는 삼항 연산자 가능. 위의 경우 'else' 누락
  // comment: 삼항연산자 예시 => sum = (obj[i].inOut === 'in') ? (sum + price) : (sum - price);


        }
        
    }
    const DIV = document.createElement("DIV");
    const H3 = document.createElement("H3")
    const H3_2 = document.createElement("H3")
    DIV.appendChild(H3)
    DIV.appendChild(H3_2)
    DIV.className = "dateHeader"
    H3.textContent = `${dateKey}`;
    H3_2.textContent = ` ${sum}`;
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
 


//  드랍다운 

// comment: querySelector 사용시 첫번째 요소만 반환되며 그 순서는 보장되지 않음. 코드상 제일 위에 있는 태그라고 항상 그것만 선택되라는 법은 없음.
// comment: 지금의 경우 .scroll이 여러개 임에도 맨 첫페이지만 먹히는 버그 발생

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



// comment: 드래그 구현 아이디어 좋음. 아래에서 끌어올리는 팝업을 bottom sheet 라고 부르니 관련 예제를 찾아 완성도를 높여보면 좋을 것
// comment: 시간이 촉박하면 드래그는 포기하고 100%펼쳐진 상태와 반쯤 들어간 상태 딱 두가지로 고정하돼 cubic-bezier 효과만 주는 것으로도 임팩트 주기 가능
