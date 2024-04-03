import React from "react";
import "../styles/login.css";
import logo from "../assets/img/reachinbox.png";
import google from "../assets/img/g.png";

const Login = () => {

  const handleGoogleLogin = () => {
    // Redirect user to Google login page
    window.location.href = "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:3000/onebox";
  };

  return (
    <div className="login">
      <header style={{ backgroundImage: `url(${logo})`, backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat" }}>
      </header>
      <main>
        <div className="login-box">
          <h3>Create a new account</h3>
          <button
            onClick={handleGoogleLogin}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "300px", color: "#858586", padding: "12px", border: "2px solid #292a2b", backgroundColor: "#121213", borderRadius: "12px" }}
          >
            <img src={google} alt="Google Logo" style={{ marginRight: "10px", width: "20px", height: "20px" }} />
            Sign Up with Google
          </button>
          <button className="gradient-button">Create an Account</button>
          <p style={{ color: "#616265" }}>Already have an account? Sign In</p>
        </div>
      </main>
      <footer>
        <p>© 2023 Reachinbox. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
