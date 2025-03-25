import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import validator from 'validator';
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import bg from '../assets/techoo3.jpg';

export default function LoginSignup() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [isLogin, setLoginPage] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordNotMatching, setPasswordNotMatching] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (confirmPassword !== password) {
      setPasswordNotMatching(true);
    } else {
      setPasswordNotMatching(false);
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (validator.isEmail(email) || email === "") {
      setEmailInvalid(false);
    } else {
      setEmailInvalid(true);
    }
  }, [email]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && !emailInvalid && !passwordNotMatching) {
      axios.post('http://localhost:8000/register', {
        CustomerType: customerType,
        Name: name,
        Email: email,
        Password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then((response) => {
        setAuth(response.data);
        if (response.data.CustomerType === "Admin") {
          navigate("/Admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }).catch((error) => console.error("Error:", error.response ? error.response.data : error.message));
    } else if (isLogin && !emailInvalid) {
      axios.post('http://localhost:8000/login', {
        Email: email,
        Password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials:true
      }).then((response) => {
        console.log(response.data);
        
        setAuth(response.data);
        if (response.data.CustomerType === "Admin") {
          navigate("/Admin", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }
      }).catch((error) => {
        error.response.data.message === "Invalid Password!" ? setWrongPassword(true) : setEmailInvalid(true);
      });
    }
  };
  useEffect(() => {
    document.body.style.backgroundImage = `url(${bg})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);
  return (
    <>
      <div className="w-11/12 sm:max-w-sm mx-auto mt-4 sm:mt-10 p-4 sm:p-6 border rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">{isLogin ? <>Login</> : <>Signup</>}</h2>
        <div className="max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleSubmit}>
            {emailInvalid ? <p className="text-xs sm:text-sm font-medium text-red-600">Please enter a valid email</p> : null}
            <Input label="Email" type="email" onChange={handleEmail} name="email" value={email} placeholder="Enter your email" />
            {isLogin && wrongPassword ? <p className="text-xs sm:text-sm font-medium text-red-600">Password Incorrect</p> : null}
            <Input label="Password" type="password" name="password" onChange={handlePassword} value={password} placeholder="Create a password" />
            {!isLogin ? <>
              {passwordNotMatching ? <p className="text-xs sm:text-sm font-medium text-red-600">Passwords do not match</p> : null}
              <Input label="Confirm Password" type="password" onChange={handleConfirmPassword} name="confirmpassword" value={confirmPassword} placeholder="Create a password" />
              <Input label="Name" type="text" name="name" onChange={handleName} value={name} placeholder="Enter your name" />
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <label className="text-xs sm:text-sm font-medium text-gray-700" htmlFor="RegistrationType">Registration Type</label>
                <select
                  className="rounded-lg border border-gray-300 px-2 py-1 text-sm"
                  name="RegistrationType"
                  value={customerType}
                  onChange={(e) => { setCustomerType(e.target.value), console.log(customerType) }}
                >
                  <option value="" disabled selected>Select your option</option>
                  <option value="Individual">Individual</option>
                  <option value="Organization">Organization</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </> : null}
            <Button classes={"w-full"} text={isLogin ? "Login" : "Sign Up"} onClick={handleSubmit} />
          </form>
        </div>
        <p className="mt-4 text-xs sm:text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setLoginPage(!isLogin)}
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </>
  );
}
