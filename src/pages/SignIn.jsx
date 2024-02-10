import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Loading } from '../components'
import { API } from '../utilities';

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password }
      setIsLoading(true)
      const res = await API.login(data);
      setIsLoading(false)
      console.log('SIGN IN SUCCESS --- ', res)
      toast('User logged in Successfully', { 
        theme: "dark",
        autoClose: 500,
        onClose: () =>  navigate('/')
      });
    } catch (error) {
      console.error('Error calling Create User:', error);
      toast.error('Bad Request: User could not login', { theme: "dark" });
      setIsLoading(false)
    }
  }

  return (
    <div className="auth_container">
      <h2 className='page_heading'>Sign In</h2>

      <ToastContainer />
      <Loading isLoading={isLoading} />

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
