import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../utilities';

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, password }
      const res = await API.signup(data);
      console.log(res)
      navigate('/signin')
    } catch (error) {
      console.error('Error calling Create User:', error);
    }
  }

  return (
    <div className="auth_container">
      <h2 className='page_heading'>Sign Up</h2>

      <form className="authForm_container">

        <input 
          className="input" 
          type="text" 
          name="name" 
          placeholder='Name...' 
          required 
          value={name}
          onChange={handleNameChange} 
        />

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

        <button 
          className="btn" 
          type="submit"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className='authForm_subtext'>Already have an account? <Link className='authForm_link' to="/signin">Sign In</Link></p>
      </form>

    </div>
  );
}

export default SignUp;
