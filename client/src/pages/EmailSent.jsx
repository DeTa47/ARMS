import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//import useAxiosPrivate from "../hooks/useAxiosPrivate";

import OTPInput from "../components/OTPInput";
import icon from '../assets/otp-icon.png';
import Button from '../components/Button';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';


export default function EmailSent(){

    const {auth} = useAuth();
    const [emailOTP, setEmailOTP] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [notMatchingError, setNotMatchingError] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [countdown, setCountDown] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    //const axios = axios();

    const from = location.state?.from?.pathname;

    async function sendMail () {

        let timeLeft = 10;

        setDisabledButton(true);
        setCountDown(timeLeft);

        try{
            const response = await axios.post('http://localhost:8000/sendVerifMail', {
                    Email: auth?.data?.Email
            }, 
            {headers: {
                'Content-Type':'application/json'
                }
            })
            if (response?.data?.code) {
                
                setEmailOTP(response.data.code);
            }

            else {
                console.log(response);
            }

        }
        catch(error){
            console.error(error);
        }

        const interval = setInterval(() => {
          timeLeft -= 1;
          setCountDown(timeLeft);
          if (timeLeft <= 0) {
            clearInterval(interval);
            setDisabledButton(false);
          }
        }, 1000);   
    };

    

    const handleOTPComplete = (otp) => {
        try{
            setIsLoading(true);
            otp = Number(otp);
           
            setTimeout(async () => {
                
                if (otp === emailOTP) {
                    setNotMatchingError(false);
                    const response = await axios.patch('http://localhost:8000/verifyUser', 
                        {
                            Email: auth?.data?.Email,
                        },

                        { 
                            headers: {
                            'Content-Type':'application/json'
                            } 
                        }                                     
                    );

                    if (response.data.msg === "User Verified"){
                        auth.data.EmailVerified = true; 
                        navigate(from, {replace: true});
                    }

                    else {
                        console.error(response.msg);
                    }
                
                } else {
                    
                    setNotMatchingError(true);
              }
                
            }, 1500);

        }
        finally {
            setIsLoading(false);
        }
        
      };

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex flex-col w-full max-w-xl mx-auto px-4 py-8 items-center justify-center">
                <img 
                    className="w-24 sm:w-32 md:w-40 h-auto mb-8" 
                    alt="email-otp-icon" 
                    src={icon}
                />
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <OTPInput onComplete={handleOTPComplete} />
                    {isLoading && 
                        <FaSpinner className="animate-spin text-blue-500 text-xl" />
                    }       
                </div>
                
                {notMatchingError && 
                    <p className="text-red-600 mt-6 text-sm sm:text-base text-center">
                        The OTP is incorrect
                    </p>
                }
                
                <p className="mt-6 text-sm sm:text-base text-center px-4 max-w-md">
                    Click on sen code. An OTP will be sent to your registered email ID.
                    Please enter the correct OTP to proceed further
                </p>   
                
                <Button 
                    countdown={countdown} 
                    disabled={disabledButton} 
                    classes="w-full sm:w-auto min-w-[120px] mt-6" 
                    onClick={sendMail} 
                    text="Send Code"
                    type='OTP'
                />
            </div>
        </div>
    )
}