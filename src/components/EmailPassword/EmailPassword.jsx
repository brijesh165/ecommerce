import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EmailPassword.scss';

import AuthWrapper from '../AuthWrapper/AuthWrapper';
import FormInput from '../Forms/FormInput/FormInput';
import Button from '../Forms/Button/Button';
import { resetPasswordStart, resetUserState } from '../../store/Actions/user.actions';

const mapState = ({user}) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {resetPasswordSuccess, userErr} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSuccess, history, dispatch]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetPasswordStart({email}));

    }

    const configurWrapper = {
        headline: 'Email Password'
    };

    return (
        <AuthWrapper {...configurWrapper}>
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, index) => {
                            return (
                                <li key={index} className="errorMessage">{e}</li>
                            )
                        })}
                    </ul>
                )}
                <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    handleChange={e => setEmail(e.target.value)} />

                <Button type="submit">Email Password</Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default EmailPassword;