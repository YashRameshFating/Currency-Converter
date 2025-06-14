const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

  const dropdowns=document.querySelectorAll(".dropdown select");
  const btn=document.querySelector("form button");
  const formcurr = document.querySelector("select[name='form']");
const tocurr = document.querySelector("select[name='to']");

  // const flags=document.querySelector("");
  for(select of dropdowns){
    for(currcode in countryList){
      let newOption=document.createElement("option");
      newOption.innerText=currcode;
      newOption.value=currcode;
      if(select.name ==="form"&& currcode==="USD"){
              newOption.selected="selected";
      }else if(select.name ==="to"&& currcode==="INR"){
              newOption.selected="selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
         updateFlag(evt.target);
    });
  }
  const updateFlag=(element)=>{

       let currcode=element.value;
       let countryCode= countryList[currcode];
       let newsrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
      let img= element.parentElement.querySelector("img");
      img.src=newsrc;

  }
  btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval===""||amtval<1){
      amtval=1;
      amount.value="1";
    }
    // console.log(formcurr.value,tocurr.value);
   const url = `${BASE_URL}/${formcurr.value}`;
    let response=await fetch(url);
   let data=await response.json();
   let rate = data.rates[tocurr.value];
let finalAmount = amtval * rate;
 console.log(finalAmount);
const msg = document.querySelector(".msg");
msg.innerText = `${amtval} ${formcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;

  })