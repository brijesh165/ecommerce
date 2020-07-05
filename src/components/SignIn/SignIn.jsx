import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import './SignIn.scss';
import Button from '../Forms/Button/Button';
import FormInput from '../Forms/FormInput/FormInput';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import {GoogleLoginButton} from 'react-social-login-buttons';
import {emailSignInStart, googleSignInStart} from './../../store/Actions/user.actions.';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const SignIn = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
         if (currentUser) {
            resetForm();
            history.push('/');
         }
    }, [currentUser, history, dispatch]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    }

    const configurWrapper = {
        headline: 'LogIn'
    };

    return (
        <AuthWrapper {...configurWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)} />
                        
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)} />

                        <Button type="submit">LogIn</Button>

                        <div className="socialSignIn">
                            <div className="row">
                                {/* <Button onClick={signInWithGoogle}>
                                    Sign In with Google
                                </Button> */}
                                <GoogleLoginButton className="mt-3 mb-3" onClick={handleGoogleSignIn}/>
                            </div>
                        </div>

                        <div className="links">
                            <Link to="/recovery">
                                Reset Password
                            </Link>
                        </div>
                    </form>
            </div>
        </AuthWrapper>
    )
}

export default SignIn;