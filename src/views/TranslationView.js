import { useParams, useNavigate } from "react-router-dom";
import './TranslationView.css';
import { useState } from 'react';
import CheckUser from "../components/CheckUser";

const imgPath = `${process.env.PUBLIC_URL}/assets/signs/`;
const alphabet = "abcdefghijklmnopqrstuvwxyz"

/* this function stores the text entered by the user to the JSON DB
  --- gets translationHistory from localStorage
  --- appends the latest user input to that array
  --- writes the new translationHistory back to local storage
  --- uses the new array for the API call to store the entire array
*/
const storeTranslation = (userId, newTranslation) => {
  const translationHistoryValue = localStorage.getItem("translations");
  //---stores an array with translation history
  let translationHistory = [];
  if(
    translationHistoryValue != undefined && 
    translationHistoryValue != null &&
    translationHistoryValue != "") {
      translationHistory = JSON.parse(localStorage.getItem("translations"));
  }
  translationHistory.push(newTranslation);
  localStorage.setItem("translations",JSON.stringify(translationHistory));
  let url = "https://ms-oh-trivia-api.herokuapp.com/";
  const key = "hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge";
  url += `translations/${userId}`;

  fetch(url, {
    method: 'PATCH', 
    headers: {
      'X-API-Key': key,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        //--- Translations history is added to API object for user with userId
        translations: translationHistory 
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Could not update translations history");
    }
    return response.json();
  })
  .catch(error => {
  })
}

let enteredText = "";

//---translationsview component
function TranslationView() {
  
  const navigator = useNavigate()
  const params = useParams();
  const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'  
  

  const [ text2Translate, setText2Translate ] = useState("");

  /* function to store the entered text in variable "text2Translate" */
  const onTextChanged = (event) => {
    enteredText = event.target.value;
  }
  
  /*  function when the user clicked on the "Translate* button 
      creates one img element per entered char that contains the 
      respective sign language and
      renders the resulting array of elements to the <div> element
      with id "divTranslatedText".
      Finally it stores the translation text into JSON DB via HTTP PATCH request
  */
  const OnTranslateClicked = (event) => {
    if(enteredText != "") {
      setText2Translate(enteredText);
      storeTranslation(params.userId, enteredText);
    }
    document.getElementById('text').value = "";
  }

  /* This function creates a component that displays the translated sign-language at {translated}.
    iterates though the text2Translate string and finds the respective png image per letter
  */
  const translated = text2Translate.split("").map(
    (char, index) => {
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
  
  //---navigator that takes user to profile view
  const GoToProfile=()=>{
    navigator(`/profile/${params.username}/${params.userId}`) 
  }
  //---displaying html
  return (
   <>
    <div className="main">
    <div className="header">
        <h1>Lost in translation</h1>
        <h3>Page for {params.username}</h3>
    </div>
  
    <div className="console">   
    <div className="textButton">
      <input type="text" id="text" onChange={onTextChanged} />
      <button className="translate" onClick={OnTranslateClicked} type="button">Translate</button>
    </div>
    
    <div className="TranslatedText">
     { translated }
    </div>
    <button className="profile" onClick={GoToProfile} type="button">Go to profile page</button>
    </div> 

    <div className="footer">
        <h4 className='authors'>Made by Oliver Hauck and Michel Saremi</h4>
    </div>

    </div>
   </> 

  );
}

export default CheckUser(TranslationView);