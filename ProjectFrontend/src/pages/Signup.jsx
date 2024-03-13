import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";


function Signup () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { signup } = authService;

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        const reqBody = {email, password, username};

        signup(reqBody)
        .then(() => {
            navigate("/login");
        })
        .catch((error) => {
            const errorDescription = error.data.message;
            setError(errorDescription);
        })
    }

    return (
        <div>
            <h1>Sign-Up</h1>
            <form onSubmit={handleSignUpSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
                {error && <p>{error}</p>}
            </form>
            <p>Already got an account?</p>
            <Link to={"/login"}>Login</Link>
        </div>
    )
}

export default Signup;