import { Link } from 'react-router-dom'

function Profile () {
    
    return (
        <aside>
            <div>
                <Link to ="/profile"><p>My Profile</p></Link>
            </div>
            <div>
                <Link to ="/myplan"><p>My Plan</p></Link>
            </div>
            <div>
                <Link to ="/tracking"><p>Tracking</p></Link>
            </div>
        </aside>
    )
}

export default Profile;