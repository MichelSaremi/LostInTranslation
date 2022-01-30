import './LoginView.css';
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

        //--- fetch user
        fetch(`${apiURL}translations?username=${username}`)
        .then(response => response.json())
        .then(results => {
            
            //---if user exists
            if (!(Object.keys(results).length===0)){
                alert("Welcome back "+username)
                
            //---if not create a new profile
            }else{
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
                .catch(error => {
                })
            //---set username
            setUsername(username)
            }   
        // results will be an array of users that match the username of victor.
        })
        .catch(error => {
        })
        
        //--Take user to translation view
        navigator(`/translation/${username}`)
        



  }
  return (
    <>
    <div className="main">

    <div className="header">
        <h1>Lost in translation</h1>
    </div>

    <div className="textButton">
        <h1 className="greeting">Welcome to the text to sign language translator</h1>
        <form onSubmit={onSubmit}>
            <input ref={input} placeholder="What is your name?" />
            <button className='button' type="submit" >Register</button>
        </form>
    </div>
    <div className="footer">
        <h4 className='authors'>Made by Oliver Hauck and Michel Saremi</h4>
    </div>

    </div>
    </>
  );
}

export default LoginView;