import './ProfileView.css';
import TranslationList from "../components/TranslationList";
import { useParams } from "react-router-dom";
import { useState , useEffect} from 'react';
import CheckUser from "../components/CheckUser";
import { useNavigate } from "react-router-dom";

//---Deleting translations from API
const DeleteTranslations = (userId) =>{

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
    .catch(error => {
    })
}

function ProfileView() {
      //---Get user translations
      const [translationlist, setTranslations ] = useState([]);
      const params = useParams()
      const navigator = useNavigate()

      useEffect(() => {
        const translationHistory = localStorage.getItem("translations");
        if(
          translationHistory != undefined && 
          translationHistory != null &&
          translationHistory != "") {
          setTranslations(JSON.parse(translationHistory));
        }
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
        //--- Deleting from the useState
        setTranslations([]);
        //--- also remove translationHistory from localStorage
        localStorage.setItem("translations", "");
        //--- reset username in localStore to signal end of user session
        localStorage.setItem("userName", "");
        navigator(`/`);
      }

      /* handles onClick event on the "Back to translation page" button
      */
      const handleBackClick = () => {
        navigator(`/translation/${params.username}/${params.userId}`);
      }


      //---displaying html
      return (
        <>
        <div className='main'>
          <div className='header'>
            <h1>The most recent translations you have done!</h1>
            <h3>Page for {params.username}</h3>
          </div>
          <div className='lines'>
            {lines}
          </div>
          <div className='buttons'>
            <button className='trans' onClick={ handleBackClick } type="button">Back to translation page</button>
            <button className='delete' onClick={ handleDeleteClick } type="button">Delete your translations</button>
            <button className ='logout' onClick={ handleLogOutClick } type="button">Logout</button>
          </div>
          <div className="footer">
            <h4 className='authors'>Made by Oliver Hauck and Michel Saremi</h4>
          </div>
        </div>
        </>
      );
};

export default CheckUser(ProfileView);