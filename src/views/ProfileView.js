import './ProfileView.css';
import TranslationList from "../components/TranslationList";
import { useParams } from "react-router-dom";
import { useState , useEffect} from 'react';
import CheckUser from "../components/CheckUser";
import { useNavigate } from "react-router-dom";

//---Deleting translations from API
function DeleteTranslations(userId){

    let url = "https://ms-oh-trivia-api.herokuapp.com/";
    const key = "hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge";
    url += `translations/${userId}`;

    //---Fething user
    fetch(url, {
      method: 'PATCH', 
      headers: {
        'X-API-Key': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          //---resetting translations
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
      const navigator = useNavigate()

      useEffect(() => {
        const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
        fetch(`${apiURL}translations?username=${props.username}`)
        .then(response => response.json())
        .then(results => {
          setTranslations(results[0].translations)
        })
        .catch(error => {
        })
      }, [])
      
      //---only take the 10 latest translations
      const ListOf10 = [];
      for (let i=translationlist.length; i>translationlist.length-11; i--){
        if (translationlist[i]!=null){
        ListOf10.push(translationlist[i])
      }}
      
      //---split translations into seperate lines and list them one at a time
      const lines = ListOf10.map((line, index) => {
        
        return (
          <div key={index+1}>
            <TranslationList index={index+1} line={line} />
          </div>
        )
      });
      //---displaying html
      return (
        <div className='main'>
        <div className='header'>
          <h1>The most recent translations you have done!</h1>
        </div>
        <div className='lines'>
          {lines}
        </div>
          <button className='delete' onClick={() => {DeleteTranslations(props.userId);setTranslations([])}} type="button">Delete your translations</button>
          <button className ='logout' onClick={() => {DeleteTranslations(props.userId);setTranslations([]);navigator(`/`)}} type="button">Logout</button>
        
        <div className="footer">
          <h4 className='authors'>Made by Oliver Hauck and Michel Saremi</h4>
        </div>
        </div>
      );
};

export default CheckUser(ProfileView);