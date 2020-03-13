import React from 'react'
//COMPONENTES
import ArticleInicio from './ArticleInicio'
import Aside from './Aside'
import AticleIngresarFoto from './AticleIngresarFoto'
//CSS
import '../css/Section.css'


class Section extends React.Component{

    constructor(props){
        super(props)
        this.state = 
        {
            dato:'INICIO'
        }
    }

    handleClick = (event) =>{
     
        if(event.target.id == 'bInicio'){
            this.setState({dato:'INICIO'})
        }else if(event.target.id == 'bSubirFoto'){
            this.setState({dato:'SUBIR FOTO'})
        }else if(event.target.id == 'bPerfiles'){
            this.setState({dato:'PERFIES'})
        }
        // console.log(this.state.dato)
    }

    componentDidMount(){
        console.log('Montado')
    }

    componentWillUnmount(){
        console.log('Desmontado')
    }
    
    render(){
        return(
            <section>
                <nav>
                    <input style={{marginLeft:'25%'}} id='bInicio' type='button' onClick={this.handleClick} value='INICIO'></input>
                    <input id='bSubirFoto' type='button' onClick={this.handleClick} value='SUBIR FOTOS'></input>
                    <input id='bPerfiles' type='button' onClick={this.handleClick} value='PERFILES'></input>
                </nav>
                {this.state.dato == 'INICIO'
                ?
                <ArticleInicio titulo={this.state.dato}></ArticleInicio>
                :
                this.state.dato == 'SUBIR FOTO'
                ?
                <AticleIngresarFoto titulo={this.state.dato}></AticleIngresarFoto>
                :
                this.state.dato == 'PERFIES'
                ?
                <div></div>
                :
                <div></div>
                }
                <Aside></Aside>
            </section>
        )
    }
}

export default Section