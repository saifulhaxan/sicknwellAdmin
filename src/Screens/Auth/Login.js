/**
    * @description      : 
    * @author           : Saif
    * @group            : 
    * @created          : 27/11/2023 - 22:33:10
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 27/11/2023
    * - Author          : Saif
    * - Modification    : 
**/
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"


const AdminLogin = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

  

    console.log(formData.password);

    useEffect(() => {
        document.title = 'SicknWell | Login';
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.setItem('login', true);
        document.querySelector('.loaderBox').classList.remove("d-none");
        
        const formDataMethod = new FormData();
        formDataMethod.append('username', formData.username);
        formDataMethod.append('password', formData.password);
        console.log(formData)

        const apiUrl = 'http://member.sicknwell.com:8000/api/v1/login/';


        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataMethod
            });

            if (response.ok) {
               
                const responseData = await response.json();
                localStorage.setItem('login', responseData.token);
                console.log('Login Response:', responseData);
                document.querySelector('.loaderBox').classList.add("d-none");
                navigate('/dashboard')
                
            } else {
                document.querySelector('.loaderBox').classList.add("d-none");
                alert('Invalid Credentials')
                console.error('Login failed');
            }
        } catch (error) {
            document.querySelector('.loaderBox').classList.add("d-none");
            console.error('Error:', error);
        }

        // navigate('/dashboard')
    };


    return (
        <>
            <AuthLayout authTitle='Login' authPara='Login into your Account'>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        label='UserName'
                        required
                        id='userEmail'
                        type='text'
                        placeholder='Enter UserName'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, username: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <CustomInput
                        label='Password'
                        required
                        id='pass'
                        type='password'
                        placeholder='Enter Password'
                        labelClass='mainLabel'
                        inputClass='mainInput'
                        onChange={(event) => {
                            setFormData({ ...formData, password: event.target.value });
                            console.log(event.target.value);
                        }}
                    />
                    <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <div className="checkBox">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='me-1' />
                            <label htmlFor="rememberMe" className='fw-semibold'>Remember Me</label>
                        </div>
                        <Link to={'/forget-password'} className='text-dark text-decoration-underline'>Forget Password?</Link>
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Login' type='submit' />
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}


export default AdminLogin
