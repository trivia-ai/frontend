import React from 'react';
import { Link } from 'react-router-dom'

function SignIn() {
  return (
    <div className="auth_container">
      <h2 className='page_heading'>Sign In</h2>

      <form className="authForm_container">
        <input className="input" type="email" name="email" placeholder='Email Address...' required />
        <input className="input" type="password" id="password" name="password" placeholder='Password...' required />
        <br/>
        <br/>
        <button className="btn" type="submit">Sign Up</button>
        <p className='authForm_subtext'>Don't have an account? <Link className='authForm_link' to="/signup">Sign Up</Link></p>
      </form>

    </div>
  );
}

export default SignIn;
