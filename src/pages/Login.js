import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"


function Login ({ setCurrentUser, setCurrentToken, setCurrentUserEmail, setCurrentUserId }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [signupError, setSignupError] = useState("")
  const [displayPassword, setDisplayPassword] = useState(false)
  const [passwordType, setPasswordType] = useState("password")
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate();

  const login = async (email, password) => {
    let baseURL = "https://store-backend-arv3.onrender.com/api/user/login"
    // let baseURL = `http://localhost:4000/api/user/login`


    let reqBody = {
      email: email,
      password: password
    };

    try {
      // console.log('baseURL: ', baseURL)
      // console.log('reqBody: ', reqBody)
      const res = await axios.post(baseURL, reqBody)
      // res.data is an object with keys of 'username', 'email', "token" and 'token'
      // console.log(res.data)
      // console.log(res.data.email)
      localStorage.setItem("store-user", JSON.stringify(res.data))
      setCurrentUserEmail(res.data.email)
      setCurrentUser(res.data.username)
      setCurrentToken(res.data.token)
      setCurrentUserId(res.data._id)
      // console.log('currentUser: ', res.data.username)
      // console.log('currentUser token: ', res.data.token)
      navigate("/")
    } catch (error) {
      setSignupError(error.response.data.error)
      // console.log(error)
    }
  };

  const handlePasswordDisplay = async () => {
    if (displayPassword === true) {
      setDisplayPassword(false);
      setPasswordType("password");
    } else if (displayPassword === false) {
      setDisplayPassword(true);
      setPasswordType("text");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('login handleSubmit called')
    setIsLoading(true)
    setSignupError("");
    login(email, password)
    setIsLoading(false)
  };

  return (
    <div>
      <br />
      <br />
      <div >
        <div>
          <form onSubmit={handleSubmit}>
            <h4 >Login </h4>
            <label >Email:</label>
            <div >
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <label >Password:</label>
            <div>
              <input
                type={passwordType}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div >
              <input
                type="checkbox"
                onChange={() => {
                  handlePasswordDisplay();
                }}
              />
              {displayPassword && <span >Hide password</span>}
              {!displayPassword && <span >Show password</span>}
            </div>

            <div >
              {signupError ? <p>**{signupError}</p> : <p></p>}
              {isLoading ? <p>Loading...</p> : <p></p>}
              <p>Note: the password must contain at least one capital letter, one lowercase letter, one special character, and a number. It must also be at least 8 characters long.</p>
            </div>

            <div >
              <button >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;