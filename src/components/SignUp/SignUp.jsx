import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SignUp.scss';

import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import { signUpUserStart } from '../../store/Actions/user.actions';

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignUp = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {currentUser, userErr} = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errors, setError] = useState([]);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }
    }, [currentUser, history, dispatch]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setError(userErr);
        }
    }, [userErr]);

    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password, 
            confirmpassword
        }));
    }

    const configurWrapper = {
        headline: 'Sign UP'
    }
    return (
        <AuthWrapper {...configurWrapper}>                   
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index} className="errorMessage">{err}</li>
                            )
                        })}
                    </ul>
                )}
                <form onSubmit={handleFormSubmit}>
                    <FormInput type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full Name"
                                handleChange={e => setDisplayName(e.target.value)} />

                    <FormInput type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                handleChange={e => setEmail(e.target.value)} />
                    
                    <FormInput type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                handleChange={e => setPassword(e.target.value)} />
                            
                    <FormInput type="password"
                                name="confirmpassword"
                                value={confirmpassword}
                                placeholder="Confirm Password"
                                handleChange={e => setConfirmPassword(e.target.value)} />

                    <Button type="submit">Register</Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default SignUp;