import './TranslationView.css';
import { createElement } from 'react';
import ReactDOM from 'react-dom';

const imgPath = `${process.env.PUBLIC_URL}/assets/signs/`;

let text2Translate = "";
const alphabet = "abcdefghijklmnopqrstuvwxyz"

/* function to store the entered text in variable "text2Translate" */
const onTextChanged = (event) => {
  console.log(event.target.value);
  text2Translate = event.target.value;
}

/* function when the user clicked on the "Translate* button */
const OnTranslateClicked = (event) => {
  console.log("Translate was clicked");
  const imgArray = [];
  /* iterate through each character of entered text */
  for (const char of text2Translate.split("")) {
    /* if current character is a letter of the alphabet */
    if(alphabet.indexOf(char.toLowerCase()) > -1) {
      /* create an <img> element for the respective letter */
      const img = createElement("img", { 
        src: `${imgPath}${char.toLowerCase()}.png`,
        //class: "TranslatedText",
        style: { width: "50px" },
        key: imgArray.length
        }, null);  
      imgArray.push(img);
    }
  }
  ReactDOM.render(
    imgArray, 
    document.getElementById("divTranslatedText")
  )
}

function TranslationView() {
  return (
   <>
    <div>
      <input type="text" onChange={onTextChanged} />
      <button onClick={OnTranslateClicked} type="button">Translate</button>
    </div>
    <div id="divTranslatedText" className="TranslatedText">

    </div>
   </> 
  );
}

export default TranslationView;