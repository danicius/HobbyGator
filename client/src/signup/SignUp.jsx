import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  // this defines every single parameter for the user that we need to send back to the backend
  // each line creates a variable and function depending on what is passed in
  const [userName, setUserName] = useState(''); //(existingUser.userName || "");
  const [email, setEmail] = useState('');//existingUser.email || "");
  const [password, setPassword] = useState('');//existingUser.password || "");
  const [confirmPassword, setConfirmPassword] = useState('');//existingUser.confirmPassword || "");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
	          // stops page from refreshing
        e.preventDefault()
        // creates a data list that we will need to pass to the backend
        const data = {
            userName,
            email,
            password,
            confirmPassword
        }
        // this defines our URL so that we correctly access the backend with the right user and are able to change it
        const url = "http://127.0.0.1:5000/api/signup"// + (updating ? `update_user/${existinguser.id}` : "create_user")

        // tells the website what method we plan to use and jsonifies the data so that backend can read it
        const options = {
            method: "POST",//updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        // waits for the fetch command to finish running and saves the data in response
        const response = await fetch(url, options)

        // depending on if this was successful we get a status back
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } 
	};

  return (
    <div>
      <h1 className='signUp'>{'Sign Up to Hobby Gator'}</h1>

      <form className='form' onSubmit={handleSubmit}>

        <label htmlFor="userName">User Name:</label>
        <input type="text" id="userName" value={userName} onChange={handleUserName}/>

        <label className='label'>Email:</label>
        <input type="email" value={email} onChange={handleEmail} />

        <label className='label'>Password:</label>
        <input type="password" value={password} onChange={handlePassword} />

        <label className='label'>Password:</label>
        <input type="password" value={confirmPassword} onChange={handleConfirmPassword} />

        <button type="submit">{'Sign Up'}</button>
        <button type="button">Continue with Google</button>
        
      </form>
    </div>
  );
};

export default SignUp;
