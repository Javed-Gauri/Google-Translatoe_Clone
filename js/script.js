const selectTag = document.querySelectorAll("select");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const translateBtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i ");

selectTag.forEach((tag,id)=>{
   
        for (const country_code in countries) { 
          let selected;
          if( id == 0 && country_code == "en-GB"){
            selected ="selected";
          }
          else if( id == 1 && country_code == "tr-TR"){
            selected ="selected";
          }
           let option =`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend",option);
        }
      } 
       )
       translateBtn.addEventListener("click",()=>{
        let text = fromText.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
        // console.log(text,translateFrom, translateTo);
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
        fetch(apiUrl).then(res => res.json()).then(data => {
            console.log(data);
             toText.value = data.responseData.translatedText;
             
        })
    });

exchangeIcon.addEventListener("click",() =>{
    let tempText = fromText.value;
    tempLang = selectTag[0].value;
    selectTag[0].value =selectTag[1].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})
icons.forEach(icon => {
    icon.addEventListener("click",({target})=>{
        if(target.classList.contains("ri-file-copy-fill")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value)
            }
            else {
                navigator.clipboard.writeText(toText.value)
            }
        }
		else if(target.classList.contains("ri-close-line")){
			 if(target.id == "from"){
                 function clearContent() {
						document.getElementById("myDiv").textContent = "";
						}
            }
            else {
               function clearContent() {
							  document.getElementsByClassNameByClass("myDiv").textContent = "";
							}
            }
		}
        else {
            let utternace ;
            if(target.id =="from"){
                utternace = new SpeechSynthesisUtterance(fromText.value);
                utternace.lang = selectTag[0].value;
            }
            else {
                utternace = new SpeechSynthesisUtterance(toText.value);
                utternace.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utternace);
        }
    });
 } )