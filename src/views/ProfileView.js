import TranslationList from "../components/TranslationList";
import { useParams } from "react-router-dom";
import { useState , useEffect} from 'react';


//---Delete your translations from API
function DeleteTranslations(){

    const props = useParams()

    let url = "https://ms-oh-trivia-api.herokuapp.com/";
    const key = "hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge";
    url += `translations/${props.userId}`;
  
    fetch(url, {
      method: 'PATCH', // NB: Set method to PATCH
      headers: {
        'X-API-Key': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Provide new translations to add to user with userId
        translations: []
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

function ProfileView() {
      //---Get user translations from username 
      const [translationlist, setTranslations ] = useState([]);
      const props = useParams()

      useEffect(() => {
        const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
        fetch(`${apiURL}translations?username=${props.username}`)
        .then(response => response.json())
        .then(results => {
           console.log("results "+results[0].translations)
          setTranslations(results[0].translations)
        })
        .catch(error => {
        })
      }, [])
      console.log("list "+translationlist)
      console.log("list single "+translationlist[0])
      console.log(props.userId)
     
 
      //---split translations into seperate lines and list them one at a time
      const lines = translationlist.map((line, index) => {
        
        return (
          <div key={index}>
            <TranslationList  line={line} />
          </div>
        )
      });

      return (
        <div>
          <h1>The most recent translations you have done!</h1>
          {lines}
          {props.userId}
          <button onClick={DeleteTranslations} type="button">Delete your translations</button>
        </div>
      );
};

export default ProfileView;