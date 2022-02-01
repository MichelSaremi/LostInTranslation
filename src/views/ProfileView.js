import './ProfileView.css';
import TranslationList from "../components/TranslationList";
import { useParams } from "react-router-dom";
import { useState , useEffect} from 'react';
import CheckUser from "../components/CheckUser";
import { useNavigate } from "react-router-dom";

//---Delete your translations from API
function DeleteTranslations(userId){

    let url = "https://ms-oh-trivia-api.herokuapp.com/";
    const key = "hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge";
    url += `translations/${userId}`;
  
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
      const params = useParams()
      const navigator = useNavigate()

      /* check whether username matches userID 
        the user could cheat by visiting the translation url 
        by directly typing into the browser: 
        http://gameURL/translations/Username/UserID
        hence ist must be doublechecked wether username and userID actually
        builds a match...
      */
      useEffect(() => {
        //const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
        // fetch(`${apiURL}translations?username=${props.username}`)
        // .then(response => response.json())
        // .then(results => {
        //   setTranslations(results[0].translations)
        const translationHistory = localStorage.getItem("translations");
        if(
          translationHistory != undefined && 
          translationHistory != null &&
          translationHistory != "") {
          setTranslations(JSON.parse(translationHistory));
        }
        // })
        // .catch(error => {
        // })
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

      /* handles onClick event on the "Delete your translations" button
      */
      const handleDeleteClick = () => {
        DeleteTranslations(params.userId);
        setTranslations([])
        //--- also remove translations from localStorage
        localStorage.setItem("translations", "");
      }

      /* handles onClick event on the "LogOut" button
      */
      const handleLogOutClick = () => {
        // DeleteTranslations(params.userId);
        setTranslations([]);
        //--- also remove translationHistory from localStorage
        localStorage.setItem("translations", "");
        //--- reset username in localStore to signal end of user session
        localStorage.setItem("userName", "");
        navigator(`/`);
      }

      /* handles onClick event on the "LogOut" button
      */
      const handleBackClick = () => {
        navigator(`/translation/${params.username}/${params.userId}`);
      }

      return (
        <div className='main'>
          <div className='header'>
            <h1>The most recent translations you have done!</h1>
          </div>
          <div className='lines'>
            {lines}
          </div>
            <button className='delete' onClick={ handleDeleteClick } type="button">Delete your translations</button>
            <button className ='logout' onClick={ handleLogOutClick } type="button">Logout</button>
            <button onClick={ handleBackClick } type="button">Back to translation page</button>
          
          <div className="footer">
            <h4 className='authors'>Made by Oliver Hauck and Michel Saremi</h4>
          </div>
        </div>
      );
};

export default CheckUser(ProfileView);