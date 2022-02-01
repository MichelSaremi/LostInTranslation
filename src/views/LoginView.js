import './LoginView.css';
import { useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import React from "react";

function LoginView() {
    const navigator = useNavigate()
    const input = createRef()
    
    //--- When register button is clicked
    const onSubmit = event => {
        const apiURL = 'https://ms-oh-trivia-api.herokuapp.com/'
        const apiKey = 'hezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge67zshhezgdhzet5jkiuztge'
        const username = input.current.value
        event.preventDefault();
        //--- check if string is empty
        if (username==''){
            alert("Write your name")
        }
        else {
            localStorage.setItem("userName", username);
            //--- fetch user
            fetch(`${apiURL}translations?username=${username}`)
            .then(response => response.json())
            .then(results => {
                let userId = 0;
                //---if user exists
                if (!(Object.keys(results).length===0)){
                    alert("Welcome back "+ username)
                    //--- get latest translation for this user
                    const translations = results[0].translations;
                    localStorage.setItem("translations", JSON.stringify(translations));
                    userId = results[0].id;
                    //--Take user to translation view
                    const translationUrl = `/translation/${username}/${userId}`;
                    navigator(translationUrl);
                }
                else {
                    alert("Welcome "+ username)
                    //---if not create a new profile
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
                    .then(results => {
                        userId = results.id;
                        //--Take user to translation view
                        navigator(`/translation/${username}/${userId}`);
                    })
                    .catch(error => {
                    })
                }
            })
            .catch(error => {
            })
        }
    }
    //--- diplaying html
  return (
    <>
    <div className="main">

        <div className="header">
            <h1>Lost in translation</h1>
        </div>

        <div className="textButton">
            <h1 className="greeting">Welcome to the text to sign language translator</h1>
            <div className='info'>
                <h3>Type in a phrase you wish to translate into sign language.</h3>
                <h3>To start type in your name and register</h3>
            </div>
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