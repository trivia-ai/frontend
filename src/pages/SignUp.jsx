import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Loading } from '../components'
import { API } from '../utilities';

function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleNameChange = (e) => setName(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, password }
      setIsLoading(true)
      const res = await API.signup(data)
      setIsLoading(false)
      console.log('SIGN UP SUCCESS --- ', res)
      toast('User created Successfully', { 
        theme: "dark",
        autoClose: 500,
        onClose: () =>  navigate('/signin')
      });
    } catch (error) {
      console.error('Error calling Create User:', error);
      toast.error('Bad Request: User could not be created', { theme: "dark" });
      setIsLoading(false)
    }
  }

  return (
    <div className="auth_container">
      <h2 className='page_heading'>Sign Up</h2>

      <ToastContainer />
      <Loading isLoading={isLoading} />

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

export default SignUpPage;
