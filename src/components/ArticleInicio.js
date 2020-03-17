import React from 'react'
import firebase from 'firebase'
//CSS
import '../css/ArticleInicio.css'
import '../css/ComponenteComentarios.css'
import '../css/loader.css'
//COMPONENTE 
import ComponenteComentarios from './ComponenteComentarios.js'

class ArticleInicio extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state = 
            {
                load:false,
                botonAtras:false,
                array:[],
                arrayDos:[],
                indice1:'',
                indice2:'',
                foto:''              
            }
    }

    componentDidMount(){
        this._isMounted = true;
        //para que no de fallos de actualizacion, es mejor poner el condicional
        //is mounted dentro del resultado de la database
        //para que no se acualice el array estado cuando se suba a foto       
            firebase.database().ref().on('value',(snap) => {
                if(this._isMounted){ 
                    this.setState({array:snap.val()})
                } 
            })                
    }
    
    componentWillUnmount(){
        this._isMounted = false; 
    }

    handleClick = (event) => {
     
        let p1 = event.target.dataset.posicion1
        let p2 = event.target.dataset.posicion2
        let cfoto = event.target.dataset.foto
        let cmensaje = event.target.dataset.mensaje
        let cusuario = event.target.dataset.usuario;
        // console.log('posicion 1 '+p1)
        // console.log('posicion 2 '+p2)
        // console.log(cfoto)
        // console.log(cmensaje)
        // console.log(cusuario)
        this.setState({foto:cfoto, load:true, indice1:p1, indice2:p2})        
    }

    handleClickAtras = () => {
        this.setState({load:false})       
    }

    render(){
        const arrayDatos = [];
        this.state.array.map((dato,key) => {
            if(dato.datos){
                dato.datos.map((d,k) => {
                    let aux = 
                        {
                         posicion1:key,
                         posicion2:k,
                         usuario:dato.usuario,
                         foto:d.foto,
                         mensaje:d.mensaje
                            
                        }
                    arrayDatos.push(aux)
                })
            }           
        })

        return(
            <article className='articleInicio'>
                <div className='divTitulo'>
                    <h2>{this.props.titulo}</h2>
                </div>
                
                <div className='divContenedor2'>    
                    {
                        this._isMounted && !this.state.load
                        ?                  
                            arrayDatos.map((dato, key) => {
                                return(
                                    <div data-codigo={key} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario} data-posicion1={dato.posicion1} data-posicion2={dato.posicion2} key={key} className='divFotosUsuarios' onClick={this.handleClick}>
                                        <div className='divImangenes'>
                                            <img data-codigo={key} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario} data-posicion1={dato.posicion1} data-posicion2={dato.posicion2} src={dato.foto}></img>
                                        </div>
                                        <div data-codigo={key} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario} data-posicion1={dato.posicion1} data-posicion2={dato.posicion2} className='divParrafo'>
                                            <p data-codigo={key} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario} data-posicion1={dato.posicion1} data-posicion2={dato.posicion2}  className='parrafos'>{dato.usuario}</p>
                                            <p data-codigo={key} data-foto={dato.foto} data-mensaje={dato.mensaje} data-usuario={dato.usuario} data-posicion1={dato.posicion1} data-posicion2={dato.posicion2} >{dato.mensaje}</p> 
                                        </div>                                  
                                    </div>
                                )
                            })                          
                        :
                        this._isMounted && this.state.load
                        ?
                        <div>
                            <input className='bAtras' type='button' value='ATRAS' onClick={this.handleClickAtras}></input>                                              
                            <ComponenteComentarios imagen={this.state.foto} indice1={this.state.indice1} indice2={this.state.indice2}></ComponenteComentarios>
                        </div> 
                        :
                        // <div className="loader">Loading...</div> 
                        <div>Cargando...</div>                      
                    }
                </div>
            </article>
        )
    }
}

export default ArticleInicio

