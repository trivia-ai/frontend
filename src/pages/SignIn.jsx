import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../utilities';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password }
      const res = await API.login(data);
      console.log(res)
      navigate('/')
    } catch (error) {
      console.error('Error calling Create User:', error);
    }
  }

  return (
    <div className="auth_container">
      <h2 className='page_heading'>Sign In</h2>

      <form className="authForm_container">

        <input 
          className="input" 
          type="email" 
          name="email" 
          placeholder='Email Address...' 
          required 
          value={email}
          onChange={handleEmailChange} 
        />

        <input 
          className="input" 
          type="password" 
          name="password" 
          placeholder='Password...' 
          required 
          value={password}
          onChange={handlePasswordChange} 
        />

        <br/>
        <br/>
        <button className="btn" type="submit" onClick={handleSignin}>Sign In</button>
        <p className='authForm_subtext'>Don't have an account? <Link className='authForm_link' to="/signup">Sign Up</Link></p>
      </form>

    </div>
  );
}

export default SignIn;
