import React from 'react'
//COMPONENTES
import Header from './Header'
import Section from './Section'
import Footer from './Footer'
//CSS
import '../css/App.css'

class App extends React.Component{
    
    render(){
        return(
            <div>
            <Header></Header>
            <Section></Section>
            <Footer></Footer>
            </div>
        )
    }
}

export default App