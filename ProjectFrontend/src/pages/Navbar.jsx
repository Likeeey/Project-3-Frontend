import { Link } from 'react-router-dom';

function Navbar () {
    return (
        <nav>
           <div>
                <Link to="/"><h4>Home</h4></Link>
                <Link to="/about"><h4>About</h4></Link>
                <Link to="/challenges"><h4>Challenges</h4></Link>
                <Link to="/membersresults"><h4>Members Results</h4></Link>
                <Link to="/coaches"><h4>Coaches</h4></Link>
                <Link to="/login"><h4>Login</h4></Link>
           </div>
        </nav>
    )
}