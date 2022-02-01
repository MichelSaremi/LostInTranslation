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
  const props = useParams();
  const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'  
  

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
    if(enteredText != "") {
      setText2Translate(enteredText);
      storeTranslation(props.userId, enteredText);
    }
    document.getElementById('text').value = "";
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
    navigator(`/profile/${props.username}/${props.userId}`) 
  }

  return (
   <>
    <div className="main">
    <div className="header">
        <h1>Lost in translation</h1>
        <h3>Page for {props.username}</h3>
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