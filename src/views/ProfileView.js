import TranslationList from "../components/TranslationList";
import { useParams } from "react-router-dom";
import { useState , useEffect} from 'react';


function ProfileView() {
      //---Get user translations from username 
      const props = useParams()
      const [translationlist, setTranslations ] = useState([]);

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
        </div>
      );
};

export default ProfileView;