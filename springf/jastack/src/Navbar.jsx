import link from 'react-router-dom';
export default function Navbar(){
    return(
        <div>
            <link to="/about">About</link>
            <link to="/contact">Contact</link>
        </div>
    )
}