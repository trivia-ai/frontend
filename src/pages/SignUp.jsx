import React from 'react';
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className="auth_container">
      <h2 className='page_heading'>Sign Up</h2>

      <form className="authForm_container">
        <input className="input" type="email" name="email" placeholder='Email Address...' required />
        <input className="input" type="password" id="password" name="password" placeholder='Password...' required />
        <br/>
        <br/>
        <button className="btn" type="submit">Sign In</button>
        <p className='authForm_subtext'>Already have an account? <Link className='authForm_link' to="/signin">Sign In</Link></p>
      </form>

    </div>
  );
}

export default SignUp;
