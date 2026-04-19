import React, { useState, useEffect } from 'react';
import './App.css';
import logoApple from './logo-apple.png';
import logoGoogle from './logo-google.png';

interface LogInNewProps {
    newLogo?: any;
}

function LogInNew({ newLogo }: LogInNewProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
        // Add your login logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className='title'>Welcome Back</h2>
            <p className='subtitle'>Please enter your details</p>
            <div className='inputGroup'>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='inputGroup'>
                <label>Password</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button type="submit" id="signInNewButton" name='signInNewButton'>
                Sign In
            </button>
            <ul className='signUpList'>
                <li><p className='signupText'>Don't have an account?</p></li>
                <li> <img src={logoApple} alt="Company Logo" className="logo" /><a href="#" className='signUpAppleLink' id='signUpApple'>Sign up with Apple</a></li>
                <li><img src={logoGoogle} alt="Company Logo" className="logo" /><a href="#" className='signUpGoogleLink' id='signUpGoogle'>Sign up with Google</a></li>
            </ul>
            <p className='signupText'>
                OR
            </p>
            <p className='signupText'>
                <a href="#" className='link' id='signUpEmail'>Sign up with Email</a>
            </p>

        </form>
    );
};

export default LogInNew;
