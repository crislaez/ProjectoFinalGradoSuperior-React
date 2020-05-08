import React from 'react'
//COMPONENTES
import ArticleInicio from './ArticleInicio'
import Aside from './Aside'
import AticleIngresarFoto from './AticleIngresarFoto'
import ArticlePerfiles from './ArticlePerfiles'
import ArticleLoguear from './ArticleLoguear'
//CSS
import '../css/Section.css'


class Section extends React.Component{

    _isMounter = false;

    constructor(props){
        super(props)
        this.state = 
        {
            dato:'LOGIN',
            datoUsuario:''
        }
    }

    handleClick = (event) =>{
     
        if(event.target.id == 'bInicio'){
            this.setState({dato:'INICIO'})
        }else if(event.target.id == 'bSubirFoto'){
            this.setState({dato:'SUBIR FOTO'})
        }else if(event.target.id == 'bLogin'){
            this.setState({dato:'LOGIN'})
        }else if(event.target.id == 'bPerfil'){
            this.setState({dato:'PERFIL'})
        }
    }

    componentDidMount(){
        this._isMounter = true;
        if(localStorage.getItem('usuario') && localStorage.getItem('primarykey')){
            this.setState({dato:'INICIO'})
        }
    }

    componentWillUnmount(){
        this._isMounter = false;
    }

    //funcion para qeu cuando subamos una foto, se carge el componente inicio
    redireccionInicio = () => {
        this.setState({dato:'INICIO'})
    }
        
    //fucion para cargar el componente comentario cuando pinchemos en un div del aside buscador
    funcionCargarCatosComentario = (objetoUsuario) => {
        console.log(objetoUsuario.indice1);
        console.log(objetoUsuario.indice2);
        console.log(objetoUsuario.foto);
        console.log(objetoUsuario.load);
        console.log('desde section')

        this.setState({datoUsuario:objetoUsuario})
    }

    render(){
        return(
            <section>
                <nav>
                    <input style={{marginLeft:'19%'}} id='bInicio' type='button' onClick={this.handleClick} value='INICIO'></input>
                    <input id='bSubirFoto' type='button' onClick={this.handleClick} value='SUBIR FOTOS'></input>
                    <input id='bLogin' type='button' onClick={this.handleClick} value='LOGIN'></input>
                    <input id='bPerfil' type='button' onClick={this.handleClick} value='PERFIL' ></input>
                </nav>
                {this.state.dato === 'INICIO'
                ?
                <ArticleInicio titulo={this.state.dato} funcionCargarCatosComentario={this.funcionCargarCatosComentario} datoUsuario={this.state.datoUsuario}></ArticleInicio>
                :
                this.state.dato === 'SUBIR FOTO'
                ?
                <AticleIngresarFoto titulo={this.state.dato} redireccionInicio={this.redireccionInicio}></AticleIngresarFoto>
                :
                this.state.dato === 'LOGIN'
                ?
                <ArticleLoguear titulo={this.state.dato} eventoEstado = {this.redireccionInicio}></ArticleLoguear>
                :
                this.state.dato === 'PERFIL'
                ?
                <ArticlePerfiles titulo={this.state.dato}></ArticlePerfiles>
                :
                <div></div>
                }
                <Aside funcionCargarCatosComentario={this.funcionCargarCatosComentario}></Aside>
            </section>
        )
    }
}

export default Section