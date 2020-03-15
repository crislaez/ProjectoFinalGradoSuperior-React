import React from 'react'
//COMPONENTES
import ArticleInicio from './ArticleInicio'
import Aside from './Aside'
import AticleIngresarFoto from './AticleIngresarFoto'
// import ArticlePerfiles from './ArticlePerfiles'
import ArticleLoguear from './ArticleLoguear'
//CSS
import '../css/Section.css'


class Section extends React.Component{

    _isMounter = false;

    constructor(props){
        super(props)
        this.state = 
        {
            dato:'LOGIN'
        }
    }

    handleClick = (event) =>{
     
        if(event.target.id == 'bInicio'){
            this.setState({dato:'INICIO'})
        }else if(event.target.id == 'bSubirFoto'){
            this.setState({dato:'SUBIR FOTO'})
        }else if(event.target.id == 'bLogin'){
            this.setState({dato:'LOGIN'})
        }
        // console.log(this.state.dato)
    }

    componentDidMount(){
        console.log('Montado')
        this._isMounter = true;
        setInterval(() => {
            let usuarioLocal = localStorage.getItem('usuario')
            if(usuarioLocal){
                this.setState({dato:'INICIO'})
                // console.log(this.state.dato)
            }else{
                // console.log('no esta logeado')
            }
        },1000)
    }

    componentWillUnmount(){
        console.log('Desmontado')
        this._isMounter = false;
    }
    
    render(){
        return(
            <section>
                <nav>
                    <input style={{marginLeft:'25%'}} id='bInicio' type='button' onClick={this.handleClick} value='INICIO'></input>
                    <input id='bSubirFoto' type='button' onClick={this.handleClick} value='SUBIR FOTOS'></input>
                    <input id='bLogin' type='button' onClick={this.handleClick} value='LOGIN'></input>
                </nav>
                {this.state.dato == 'INICIO'
                ?
                <ArticleInicio titulo={this.state.dato}></ArticleInicio>
                :
                this.state.dato == 'SUBIR FOTO'
                ?
                <AticleIngresarFoto titulo={this.state.dato}></AticleIngresarFoto>
                :
                this.state.dato == 'LOGIN'
                ?
                <ArticleLoguear titulo={this.state.dato}></ArticleLoguear>
                :
                <div></div>
                }
                <Aside></Aside>
            </section>
        )
    }
}

export default Section