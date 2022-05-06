 

const 요청url = "https://eulsoo.github.io/list.json"
const 요청객체 = new XMLHttpRequest();
요청객체.open('GET', 요청url);
요청객체.responseType = 'json';
요청객체.send();
요청객체.onload = () => {
    const obj = 요청객체.response;
    할일(obj);
}



fetch("https://eulsoo.github.io/list.json")
.then(function (res) {
 return res.json()
}).then(function(obj) {
    console.log(obj);
})


const history = document.querySelector(".history");

 
function 할일 (obj) {
    const UL = document.querySelector('.list')
    const spendingText = document.querySelector('.history_spending')
  
     
    for (let i = 0; i < obj.length; i++) {
        const creLi = document.createElement('LI');
        creLi.className = "creLi";
        const span1 = document.createElement("SPAN");
        const span2 = document.createElement("SPAN");
        span1.textContent = obj[i].item
        span2.textContent = obj[i].price
        creLi.style.borderBottom = "1px solid #dcdcdc";
        creLi.style.padding ="3px 17px"
        creLi.style.fontSize ="18px"
        creLi.style.fontWeight = "300";
        creLi.style.lineHeight = "27px";
        history.appendChild(creLi);
        creLi.appendChild(span1);
        creLi.appendChild(span2);
        
        var sum =+ obj[i].price
        spendingText.textContent = sum += "지출";
        
    }
  return sum;
    

};
 
 
 
//  드랍다운 

const main = document.querySelector(".bankApp")
const dropMenu = document.querySelector('.scroll');




const {width:mainWidth, height:mainHeight} = 
main.getBoundingClientRect();
const {width:dropMenuWidth, height:dropMenuHeight} =
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
    if(isDragging) {
        const diffX = e.clientX - originX;
        const diffY = e.clientY -originY;
        const endOfXPoint = mainWidth - dropMenuWidth;
        const endOfYPoint = mainHeight - dropMenuHeight; 
        dropMenu.style.left = `${Math.min(Math.max(0, originLeft+ diffX), endOfXPoint)}px`
        dropMenu.style.top = `${Math.min(Math.max(0, originTop+ diffY), endOfYPoint)}px`

    }
});


 