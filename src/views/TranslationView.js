import App from "../App";
import { useParams, useNavigate } from "react-router-dom";
import './TranslationView.css';
import { useState } from 'react';

const imgPath = `${process.env.PUBLIC_URL}/assets/signs/`;
const alphabet = "abcdefghijklmnopqrstuvwxyz"

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

let enteredText = "";

function TranslationView() {
  
  const navigator = useNavigate()
  
  //---Get user id from username
  const props = useParams()
  const [ userId, setUserID ] = useState("");
  console.log("name "+props.username)
  const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
  fetch(`${apiURL}translations?username=${props.username}`)
    .then(response => response.json())
    .then(results => {
       console.log("results "+results[0].id)
       setUserID(results[0].id)
    })
    .catch(error => {
    })
  
  
  const [ text2Translate, setText2Translate ] = useState("");

  /* function to store the entered text in variable "text2Translate" */
  const onTextChanged = (event) => {
    console.log(event.target.value);
    enteredText = event.target.value;
    //setText2Translate(event.target.value);
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
    console.log("enteredText", enteredText);
    setText2Translate(enteredText);
    storeTranslation(userId, enteredText);
  }

  const translated = text2Translate.split("").map(
    (char, index) => {
      console.log("setting translated...");
      if(alphabet.indexOf(char.toLowerCase()) > -1) {
        return (
          <img key={index} src={`${imgPath}${char.toLowerCase()}.png`} style={ { width: "50px" } } />
        )
      }
      else {
        return (
          <label key={ index } style={ {width: "20px", display: "inline-block" }} /> 
        )
      }
    }
  )

  const GoToProfile=()=>{
    navigator(`/profile/${props.username}`) 
  }

  return (
   <>
    <div>
      <input type="text" onChange={onTextChanged} />
      <button onClick={OnTranslateClicked} type="button">Translate</button>
    </div>
    <div>
      <button onClick={GoToProfile} type="button">Go to profile page</button>
    </div>
    <div className="TranslatedText">
     { translated }
    </div>
   </> 

  );
}

export default TranslationView;