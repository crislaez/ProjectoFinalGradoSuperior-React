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
    _Menu = false;

    constructor(props){
        super(props)
        this.state = 
        {
            dato:'LOGIN',
            datoUsuario:'',
            aparecerMenu:'0%',
            heightMenu: '0px',
            cambiarTamanoVentanas:'100%'
        }
    }

    handleClick = (event) =>{
     
        if(event.target.id === 'bInicio'){
            this.setState({dato:'INICIO'})
        }else if(event.target.id === 'bSubirFoto'){
            this.setState({dato:'SUBIR FOTO'})
        }else if(event.target.id === 'bLogin'){
            this.setState({dato:'LOGIN'})
        }else if(event.target.id === 'bPerfil'){
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

    //funcion para qeu aparezca y desaparezca el menu
    funcionAparecerMenu = () => {
        if(!this._Menu){
            this.setState({aparecerMenu:'20%',heightMenu:'800px',cambiarTamanoVentanas:'75%'})
            this._Menu = true;
        }else{
            this.setState({aparecerMenu:'0%',heightMenu:'0px',cambiarTamanoVentanas:'100%'})
            this._Menu = false;
        }
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
                    <input style={{marginLeft:'10%'}} id='bInicio' type='button' onClick={this.handleClick} value='INICIO'></input>
                    <input id='bSubirFoto' type='button' onClick={this.handleClick} value='SUBIR FOTOS'></input>
                    <input id='bLogin' type='button' onClick={this.handleClick} value='LOGIN'></input>
                    <input id='bPerfil' type='button' onClick={this.handleClick} value='PERFIL' ></input>
                    <input id='bMenu' type='button' onClick={this.funcionAparecerMenu} value='MENU' ></input>
                </nav>
                {this.state.dato === 'INICIO'
                ?
                <ArticleInicio titulo={this.state.dato} funcionCargarCatosComentario={this.funcionCargarCatosComentario} datoUsuario={this.state.datoUsuario} cambiarTamanoVentanas={this.state.cambiarTamanoVentanas}></ArticleInicio>
                :
                this.state.dato === 'SUBIR FOTO'
                ?
                <AticleIngresarFoto titulo={this.state.dato} redireccionInicio={this.redireccionInicio} cambiarTamanoVentanas={this.state.cambiarTamanoVentanas}></AticleIngresarFoto>
                :
                this.state.dato === 'LOGIN'
                ?
                <ArticleLoguear titulo={this.state.dato} eventoEstado = {this.redireccionInicio} cambiarTamanoVentanas={this.state.cambiarTamanoVentanas}></ArticleLoguear>
                :
                this.state.dato === 'PERFIL'
                ?
                <ArticlePerfiles titulo={this.state.dato} cambiarTamanoVentanas={this.state.cambiarTamanoVentanas}></ArticlePerfiles>
                :
                <div></div>
                }
                <Aside funcionCargarCatosComentario={this.funcionCargarCatosComentario} aparecerMenu={this.state.aparecerMenu} heightMenu={this.state.heightMenu}></Aside>
            </section>
        )
    }
}

export default Section