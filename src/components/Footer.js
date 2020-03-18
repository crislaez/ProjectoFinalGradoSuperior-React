import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faFacebook, faTwitter} from '@fortawesome/free-solid-svg-icons'
import {faFacebook, faTwitter, faInstagram, faTwitch, faGit} from '@fortawesome/free-brands-svg-icons'
//CSS
import '../css/Footer.css'

class Footer extends React.Component{
    
    render(){
        return(
            <footer>
                <div className='divFooter'>
                    <a style={{marginLeft:'20%'}} href='https://es-es.facebook.com/'><span style={{color:'#579EEB'}}><FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon></span> Facebook</a>
                    <a href='https://www.instagram.com/?hl=es'><span style={{color:'#F95B6E'}}><FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon></span> Instagram</a>
                    <a href='https://twitter.com/'><span style={{color:'#579EEB'}}><FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon></span> Twitter</a>
                    <a href='https://www.twitch.tv/'><span style={{color:'#503EA9'}}><FontAwesomeIcon icon={faTwitch}></FontAwesomeIcon></span> Twitch</a>
                    <a href='https://github.com/crislaez'><span style={{color:'#C1C1C1'}}><FontAwesomeIcon icon={faGit}></FontAwesomeIcon></span> Git Hub</a>
                </div>
            </footer>
        )
    }
}

export default Footer