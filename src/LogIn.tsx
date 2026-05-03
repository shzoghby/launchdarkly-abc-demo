import { useState } from 'react';
import './App.css';

interface LogInProps {
    newLogo?: any;
}

function LogIn({ newLogo }: LogInProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
    };

    return (
        <form className='logInForm' onSubmit={handleSubmit}>
            <h2 className='title'>Welcome Back</h2>
            <p className='subtitle'>Please enter your details</p>
            <div className='logInInputGroup'>
                <label className='emailLabel'>Email</label>
                <input className='emailInput'
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className='logInInputGroup'>
                <label className='passwordLabel'>Password</label>
                <input className='passwordInput'
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button className='signInButton' type="submit" id="signInButton" name='signInButton'>
                Sign In
            </button>
            <p className='signupText'>
                Don't have an account? <a href="#" className='link' id='signUp'>Sign up</a>
            </p>
        </form>
    );
};

export default LogIn;
