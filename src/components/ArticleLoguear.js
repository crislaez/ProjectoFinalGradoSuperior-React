import React from 'react'
//CSS
import '../css/ArticleLoguear.css'
//COMPONENTES
import Login from './Login'
import Registro from './Registro'

class ArticleLoguear extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props)

        this.state = 
            {
                load:false,
                estadoBoton:true

            }
    }

    handleClick = (event) => {
        if(event.target.id == 'bLogin'){
            this.setState({load:true})
        }
        else if(event.target.id == 'bRegistro'){
            this.setState({load:false})
        }
        else if(event.target.id == 'bCerrarSesion'){
            alert('Has cerrado sesion')
            localStorage.removeItem('primarykey');
            localStorage.removeItem('usuario');
            this.setState({estadoBoton:true})
        }
    }

    componentDidMount(){
        this._isMounted = true;
        console.log(localStorage.getItem('primarykey'))
        if(localStorage.getItem('primarykey')){
            this.setState({estadoBoton:false})
        }       
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    cambioEstadoLogin = () => {
        this.setState({estadoBoton:false})
    }

    render(){
        return(
            <article className='divArticleLoguear'>
                <div className='divTitulos'>
                    <h2>{this.props.titulo}</h2>
                </div>

                <div className='divContenedorLoguin'>
                    <div className='divContenedorLoguear'>
                        <div className='divLoginRegistro'>
                            <h3>Login | Registro</h3>
                            {
                                this.state.estadoBoton
                                ?
                                <input id='bLogin' type='button' value='Login' onClick={this.handleClick}></input>
                                :
                                <input id='bCerrarSesion' type='button' value='Cerrar Sesion' onClick={this.handleClick}></input>
                            }
                            
                            <input id='bRegistro' type='button' value='Registro' onClick={this.handleClick}></input>
                        </div>
                        {
                            this._isMounted && this.state.load
                            ?
                            <Login titulo='Login' cambioEstado = {this.props.eventoEstado} cambioEstadoLogear={this.cambioEstadoLogin}></Login>
                            :
                            this._isMounted || !this.state.load
                            ?
                            <Registro titulo='Registro'></Registro>
                            :
                            <div>Cargando...</div>
                        }
                      
                    </div>
                </div>
            </article>
        )
    }
}

export default ArticleLoguear