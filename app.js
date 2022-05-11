

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
    //array하나에 날짜별로 객체 걸러줄 함수먼저 선언
    // result 배열값의 인자로 Obj 데이터 받아오고 grouping해주는 함수를 groupedResult라는 변수에 할당 
    console.log(groupByDate(obj));


    //그루핑된 객체의 프로퍼티중 key 키값 즉, 프로퍼티 네임들만 묶어서 배열로 반환해주는 Object.keys(obj)를 변수에 할당
    const groupKeys = Object.keys(groupedResult)

    for (let i=0; i<groupKeys.length-1; i++) {
        const dateKey = groupKeys[i]
        const groupedItems = groupedResult[dateKey]
        List(dateKey, groupedItems)

        
    }

  
}

//날짜별로 grouping하는 함수로 먼저 필터링하고 시작
//하나의 날짜에 객체가 들어간게 아니라 분산되어 있음 이것을 하나로 하는 작업이 필요했음

// {
//     "date":"2022.5.1",
//     "inOut":"in",
//     "type":"",
//     "item":"용돈",
//     "price":50000
//  },
  
//     "date":"2022.5.1",
//     "inOut":"out",
//     "type":"mart",
//     "item":"연필",
//     "price":3000
//  },
//  {
//     "date":"2022.5.2",
//     "inOut":"out",
//     "type":"eatout",
//     "item":"광어회",
//     "price":30000
//  },
// 
//



function groupByDate(itemList) {
    const result = {};
    //result라는 빈 객체 선언 

    //For loop itemList 인자에 Obj 받아와서 전체 반복 
    for (let i = 0; i < itemList.length; i++) {
      const date = itemList[i].date
      //인데스를 이용해서 배열 처음부터 끝까지 순회하는데 date 키를 date 변수에 할당 


      //증감될 때마다 조건문으로 걸러내는데 (result[date]는 객체니까 boolean 조건문 요소로 사용 가능, 만약 date라는 키가 있다면 true
      // => result에 date 객체 push)
      if(result[date]) {
          result[date].push(itemList[i])

          //날짜를 받아왔는데 객체가 비었다, 그러면 date에 객체 할당
          // => 증감되고 if 조건문에 충족되기 때문에 다시 그 날짜에 해당하는 객체 할당 
          //이렇게 데이터를 전부 순회하면서 날짜별로 객체를 그루핑하면서 끝 
          result[date] = [itemList[i]];
      }

    }
4
    return result;
    
}



fetch("https://jytrack64.github.io/data.json")
.then(function (res) {
 return res.json()
}).then(function(obj) {
    console.log(obj);
})

 
// comment:     js 기본객체와 중첩
// comment:     history는 브라우저 주소를 관리하는 기본 객체이다. 이와 동일한 이름의 사용은 피하기
 

const history = document.querySelector(".history");
// 수입/지출 목록 DOM 변수 선언

 
 // comment: 얕은복사?때는 파라미터가 배열타입일 경우 위와 같은 코드는 호출한 쪽의 원본 데이터를 변경하는 사이드이펙트(부작용) 위험이 존재함 
// 그럼에도 불구하고 시간이 촉박한 관계로 배열같은 선형 자료 구조를 그대로 인자로 채택함 

function List(dateKey, obj) {

    // 오늘과 어제에 한에서 grouping된 박스 최상단에 '날짜'를 "오늘" "어제" 스트링으로 변환
    if(new Date(dateKey).getDate() === new Date().getDate()) { 

        //new Date(); JS 내장 객체를 이용해서 실제 시간을 적용해보기로 함 생성자 new Date에 getDate() 메서드로 주어진 날짜의 현지 시간 기준 '일'을 받아옴 
        //지출 날짜가 실제 시간과 일치하면 "오늘"

        dateKey = "오늘"


    } else if (new Date(dateKey).getDate() === new Date().getDate() -1) {
        dateKey = "어제"
        //getDate() -1 을 이용해서 어제를 걸러주는 조건문 else if에 부여 


    }

    //날짜별 수입/지출 총합을 구하는 for loop
    let sum = 0;
    for (let i = 0; i < obj.length; i++) {
        let price = obj[i].price;

        if (obj[i].inOut === "in") {
            sum = sum + price;
        } else if (obj[i].inOut === "out") {
            sum = sum - price;

  // comment: 양자택일인 상황에선 else if 또는 삼항 연산자 가능하기에 고민했음. 위의 경우 'else' 누락
  // comment: 만약에 삼항연사자를 이용했다면  예시 => sum = (obj[i].inOut === 'in') ? (sum + price) : (sum - price); 해도 됐을 것 ) (가독성?)



        }
        
    }

        // 날짜 / 총합 태그를 createElement로 생성 
    const DIV = document.createElement("DIV");
    const H3 = document.createElement("H3")
    const H3_2 = document.createElement("H3")
    DIV.appendChild(H3)
    DIV.appendChild(H3_2)
    // DIV 박스에 appendChild를 통해 H3 태그 자식요소로 부여
    DIV.className = "dateHeader"
    H3.textContent = `${dateKey}`;
    H3_2.textContent = ` 합계 ${sum}`;
    history.appendChild(DIV)
    //지출목록 컨테이너에 날짜 / 총합 태그 자식으로 부여 (최상단에 위치)

    // 실질적인 지출 아이템 / 입출금 리스트는 forloop로 구현  
 
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

   

             //수입과 지출 표시부분 조건문으로 구분 

        if(obj[i].inOut === "in" )  {
            span2.textContent = `+ ${price}원`
            span2.style.color = "#008000";

          }  
          // 키 inOut의 값이 in일 경우 + 스트링으로 표시하고 Green 색 style도 부여

          else if (obj[i].inOut ===     "out") {
            span2.textContent = `- ${price}원`
          }

        // 키 inOut의 값이 out일 경우 -로 표시함

 
    
    }
  }


 

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

// 범위설정과 DOM 지정 
// 바텀 시트 메뉴인 scroll 박스에는 position absolute를줬고  
//  컨네이너인 bankApp 클래스를 부여한 dom 요소 (태그 section) 에 Position relative 속성를 줘서,  컨테이너 영역에서만 움직일 수 있도록 설정했습니다.



// 그 다음으로 이동에 대한 동작 설정 

// 1. 마우스 버튼 누르고 있는 것 
// 2. 버튼을 누르는 순간 박스 이동 이벤트 발생 전역으로 알림 (버블링)
// 3. 버블링과 동시에 컨테이너를 기준으로 마우스 좌표를 기억 (기준은 항상 왼쪽)

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
    isDragging = true;  // 마우스 이동 시작 이벤트 window로 알림  (버블링?)
    originX = e.clientX; // 브라우저를 기준 마우스 x축  (client는 브라우저에서 사용자에게 웹페이지 보여지는 영역 기준)
    originY = e.clientY; // 브라우저를 기준 마우스 y축
    originLeft = dropMenu.offsetLeft; // 컨테이너를 기준으로 바텀시트의 좌표 x
    originTop = dropMenu.offsetTop; // 컨테이너를 기준으로 버텀시트의 좌표 y
});

//드래깅 true니까 이동가능 




main.addEventListener("mouseup", (e) => {
    isDragging = false;
});
//마우스 버튼 뗐을때는 드래깅 false로 


main.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const diffX = e.clientX - originX;
        const diffY = e.clientY - originY;
        const endOfXPoint = mainWidth - dropMenuWidth;
        const endOfYPoint = mainHeight - dropMenuHeight;
        dropMenu.style.left = `${Math.min(Math.max(0, originLeft + diffX), endOfXPoint)}px`
        dropMenu.style.top = `${Math.min(Math.max(0, originTop + diffY), endOfYPoint)}px`
        //바텀 시트의 left와 Top 값이 음수 값이 되면 바텀 시트 메뉴가 컨테이너 밖으로 나갈 수 없게 설정 
    }
});

//문제 해결을 위한 



 // comment:  드래그는 포기하고 100%펼쳐진 상태와 반쯤 들어간 상태 딱 두가지로 고정하돼 cubic-bezier 효과만 
//   주는 것으로도 임팩트 주는 것도 생각
