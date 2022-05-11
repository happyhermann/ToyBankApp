

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
 
 
 
  
// comment: html파일에서 스크립트를 분리하여 js파일 단독으로 사용하는 경우, 브라우저 소스보기시 한글 인코딩이 깨져나올 수 있음.
// comment: 변수명은 영문, 숫자, 하이픈, 언더바, 달러($) 사용 권장
const url = "https://jytrack64.github.io/data.json"
const req = new XMLHttpRequest();
req.open('GET', url);
req.responseType = 'json';
req.send();
req.onload = () => {
    const obj = req.response;
    const groupedResult = groupByDate(obj);
     console.log('groupedResult',groupedResult);
=======
    //array하나에 날짜별로 객체 걸러줄 함수먼저 선언
    // result 배열값의 인자로 Obj 데이터 받아오고 grouping해주는 함수를 groupedResult라는 변수에 할당 
    console.log(groupByDate(obj));
 

    //그루핑된 객체의 프로퍼티중 key 키값 즉, 프로퍼티 네임들만 묶어서 배열로 반환해주는 Object.keys(obj)를 변수에 할당
    const groupKeys = Object.keys(groupedResult)
    // i<groupKeys.length-1은 마지막 요소를 누락하게 됨. i<=groupKeys.length-1 또는 i<groupKeys.length 권장
    // 다음의 코드로 동일 효과 가능 => for(key in groupedResult){ List(key, groupedResult[key]) }
    for (let i=0; i<groupKeys.length-1; i++) {
        const dateKey = groupKeys[i]
        const groupedItems = groupedResult[dateKey]
        List(dateKey, groupedItems)


    }

     // List(obj);
    // List(obj);
    // 1. list 반복
}

// comment: 함수를 작성할 경우 주석을 달면서 진행 권장. 데이터의 경우 간략한 샘플을 남겨주면 협업팀원과 미래의 나에게도 좋음
// comment: 함수명은 이름에 목적이 드러나도록 알기 쉽게 쓰기를 권장.
// comment: 이름짓기 힘들땐 이 사이트 추천. 필요한 단어 입력시 개발자들이 선호하는 변수명을 순서대로 보여줌 => https://www.curioustore.com/#!/
/**
 * 배열 형태의 무작위 소비 기록을 날짜값(date)을 key로 하는 json object로 변환합니다.
 * @param itemList [{},{},{}] => {"":[], "":[]}
 * @return json object
 * <pre>
 *   {
 *       "2022.5.1": [
 *           {
 *               "date": "2022.5.1"
 *               ,"inOut":"in"
 *               ,"type":""
 *               ,"item":"용돈"
 *               ,"price":50000
 *           },{
 *               "date":"2022.5.1",
 *               "inOut":"out",
 *               "type":"mart",
 *               "item":"알람시계",
 *               "price":12000
 *           }
 *       ],
 *       "2022.5.2": [
 *           {
 *               "date":"2022.5.2",
 *               "inOut":"out",
 *               "type":"eatout",
 *               "item":"광어회",
 *               "price":30000
 *           },{
 *               "date":"2022.5.2",
 *               "inOut":"out",
 *               "type":"cafe",
 *               "item":"빽스치노",
 *               "price":4500
 *           }
 *       ]
 *   }
 * </pre>
 */
 
  
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
        // comment: 양자택일인 상황에선 else if 또는 삼항 연산자 가능. 위의 경우 'else' 누락
        // comment: 삼항연산자 예시 => sum = (obj[i].inOut === 'in') ? (sum + price) : (sum - price);
    }
     // comment: 변수명명 규칙중 실무에서 종종 마주하게 될 몇가지를 달아둠. 코드 가독성을 위한 약속이므로 지켜주는게 좋음
    // comment: 1. 상수(변경불가한 값)는 대문자와 언더바(_) 사용
    // comment: 2. DOM엘리먼트 또는 jQuery 객체임을 알리기 위해 변수명 첫글자에 달러($) 기호를 붙이기도 함. 예시) const $DIV = document...
    // comment: 3. 지역변수임을 나타내기 위해 변수명 첫글자에 언더바(_) 기호를 붙이기도 함. 예시) let _temp = 0;
    const DIV = document.createElement("DIV"); // comment: 이 경우 DIV는 상수가 아니며 DOM요소 이므로 소문자 또는 달러($)로 시작할 것을 권장
 
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
     const UL = document.querySelector('.list') // comment: 미사용 변수 UL, spendingText는 즉시 제거 권장
    const spendingText = document.querySelector('.history_spending')
    
     //지출목록 컨테이너에 날짜 / 총합 태그 자식으로 부여 (최상단에 위치)

    // 실질적인 지출 아이템 / 입출금 리스트는 forloop로 구현  
 
     for (let i = 0; i < obj.length; i++) {

        // comment: HTML에서 태그이름은 대소문자를 구분하지 않으나, 다음 사유로 소문자 통일을 권장 ( LI -> li, SPAN -> span )
        // comment: 1. <DiV>, <TabLe>과 같이 혼용해 쓸 경우 리눅스 시스템에서는 오류 발생 소지가 있음
        // comment: 2. HTML의 기원인 XML은 대소문자를 구분하며, 향우 XHTML은 소문자만을 사용함
        // comment: 3. W3C에서 일반적인 HTML 표준 케이스로 소문자 사용을 명시 (https://dev.w3.org/html5/html-author/   3.2.2.1 Tags 참조)
        const creLi = document.createElement('LI');
        creLi.className = "creLi";
        const span1 = document.createElement("SPAN");
        const span2 = document.createElement("SPAN");
        span1.textContent = obj[i].item
        // span2.textContent = obj[i].price
        let price = obj[i].price;
        creLi.style.borderBottom = "1px solid #dcdcdc";  // comment: 인라인 스타일 대신 class 스타일 사용을 권장
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

         } else if (obj[i].inOut ===     "out") {
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
// comment: querySelector 사용시 첫번째 요소만 반환되며 그 순서는 보장되지 않음. 코드상 제일 위에 있는 태그라고 항상 그것만 선택되라는 법은 없음.
// comment: 지금의 경우 .scroll이 여러개 임에도 맨 첫페이지만 먹히는 버그 발생

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


// comment: 퀴즈. addEventListener는 하면서 removeEventListener는 왜 안할까요?
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
        const endOfYPoint = mainHeight - dropMenuHeight; // 840 - 530 = 310
        dropMenu.style.left = `${Math.min(Math.max(0, originLeft + diffX), endOfXPoint)}px`
        dropMenu.style.top = `${Math.min(Math.max(0, originTop + diffY), endOfYPoint)}px`
        //바텀 시트의 left와 Top 값이 음수 값이 되면 바텀 시트 메뉴가 컨테이너 밖으로 나갈 수 없게 설정 
    }
});
 // comment: 드래그 구현 아이디어 좋음. 아래에서 끌어올리는 팝업을 bottom sheet 라고 부르니 관련 예제를 찾아 완성도를 높여보면 좋을 것
// comment: 시간이 촉박하면 드래그는 포기하고 100%펼쳐진 상태와 반쯤 들어간 상태 딱 두가지로 고정하돼 cubic-bezier 효과만 주는 것으로도 임팩트 주기 가능
 
//문제 해결을 위한 

 

 // comment:  드래그는 포기하고 100%펼쳐진 상태와 반쯤 들어간 상태 딱 두가지로 고정하돼 cubic-bezier 효과만 
//   주는 것으로도 임팩트 주는 것도 생각
