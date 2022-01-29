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

/*  function when the user clicked on the "Translate* button 
    creates one img element per entered char that contains the 
    respective sign language and
    renders the resulting array of elements to the <div> element
    with id "divTranslatedText".
    Finally it stores the translation text into JSON DB via HTTP PATCH request
*/
const OnTranslateClicked = (event) => {
  console.log("Translate was clicked");
  const elementArray = [];
  /* iterate through each character of entered text */
  for (const char of text2Translate.split("")) {
    /* if current character is a letter of the alphabet */
    if(alphabet.indexOf(char.toLowerCase()) > -1) {
      /* create an <img> element for the respective letter */
      const img = createElement("img", { 
        src: `${imgPath}${char.toLowerCase()}.png`,
        //class: "TranslatedText",
        style: { width: "50px" },
        key: elementArray.length
        }, null);  
      elementArray.push(img);
    }
    else if (char == " ") {
      const whitespace = createElement("label", { 
        key: elementArray.length, 
        style: { 
          width: "20px",
          display: "inline-block"
        }
      }, null );  
      elementArray.push(whitespace);
    }
  }
  ReactDOM.render(
    elementArray, 
    document.getElementById("divTranslatedText")
  )
  storeTranslation(1, text2Translate);
}

/* start test data */
const translationHistory = [];

/* end test data */

const storeTranslation = (userId, newTranslation) => {
  translationHistory.push(newTranslation);
  let url = "https://ms-oh-trivia-api.herokuapp.com/";
  const key = "hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge";
  url += `translations/${userId}`;
  console.log("userId:", userId);
  console.log("newTranslation:", newTranslation);
  console.log("translationHistory:", translationHistory);
  console.log("url:", url);
  fetch(url, {
    method: 'PATCH', // NB: Set method to PATCH
    headers: {
      'X-API-Key': key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // Provide new translations to add to user with userId
        translations: translationHistory 
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not update translations history");
    }
    return response.json();
  })
  .then(updatedUser => {
    // updatedUser is the user with the Patched data
    console.log("updatedUser",updatedUser);
  })
  .catch(error => {
  })
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
    <label>&nbsp;</label>
   </> 
  );
}

export default TranslationView;