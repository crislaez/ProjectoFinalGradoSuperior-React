import React from 'react'
//CSS
import '../css/Header.css'
//imagenes
import slider1 from '../imagenes/slider1.jpg'
import slider2 from '../imagenes/slider2.jpg'
import slider3 from '../imagenes/slider3.jpg'
import slider4 from '../imagenes/slider4.jpg'

class Header extends React.Component{
    
    render(){
        return(
            <header>
                <div className='divTituloPrincipal'>
                    <h1>THE TRAVELLER</h1>
                </div>
                <div className="slider">	
                    <ul>
                        <li><img src={slider1}></img></li>
                        <li><img src={slider2}></img></li>
                        <li><img src={slider3}></img></li>
                        <li><img src={slider4}></img></li>
                    </ul>
                </div>	
            </header>
        )
    }
}

export default Header