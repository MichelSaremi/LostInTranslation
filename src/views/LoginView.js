import { useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import React from "react";

function LoginView() {
    const [username, setUsername] = useState();
    const navigator = useNavigate()
    const input = createRef()

    //--- When button is clicked
    const onSubmit = event => {
        const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
        const apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'
        event.preventDefault()
        const username=input.current.value
        //--- check if string is empty
        if (username==''){
            alert("Write your name")
        }
        else {
            //--- fetch user
            fetch(`${apiURL}translations?username=${username}`)
            .then(response => response.json())
            .then(results => {
                //---if user exists
                if (!(Object.keys(results).length===0)){
                    alert("Welcome back "+ username)
                    //---if not create a new profile
                }
                fetch(`${apiURL}translations`, {
                    method: 'POST',
                    headers: {
                    'X-API-Key': apiKey,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                    username: username, 
                    translations: [] 
                    })
                })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Could not create new user')
                    }
                    return response.json()
                })
                .then(newUser => {
                // newUser is the new user with an id
                })
                .catch(error => {
                })
                setUsername(username)
                localStorage.setItem("userName", username);
        // results will be an array of users that match the username of victor.
            })
            .catch(error => {
            })
        

        //--Take user to translation view
        navigator(`/translation/${username}`)
    }
  }
  return (
    <div>
        <h1>Hello and welcome to the translator</h1>
    <form onSubmit={onSubmit}>
        <input ref={input} placeholder="What is your name?" />
        <button type="submit" >Register</button>
    </form>
    </div>
  );
}

export default LoginView;