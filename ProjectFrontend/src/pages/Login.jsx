import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function Login () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { saveToken, authenticateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const reqBody = {email, password};

        axios.post()
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login