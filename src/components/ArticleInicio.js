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
                indice:''                
            }
    }

    componentDidMount(){
        this._isMounted = true;
        //para que no de fallos de actualizacion, es mejor poner el condicional
        //is mounted dentro del resultado de la database
        //para que no se acualice el array estado cuando se suba a foto      
            const db = firebase.database().ref()
            db.on('value',(snap) => {
                if(this._isMounted){ 
                    this.setState({array:snap.val()})
                    localStorage.setItem('indice',snap.val().length)
                } 
            })                
    }
    
    componentWillUnmount(){
        this._isMounted = false; 
    }

    handleClick = (event) => {
        // console.log(event.target)
        console.log(event.target.dataset.codigo);
        let aux = event.target.dataset.codigo
        this.setState({load:true});

        console.log(`el valor del estado es ${this.state.load}`)
             
        const database = firebase.database().ref(`${aux}`)
        database.on('value',(snap) => {
            // console.log(snap.val())
            // console.log(snap.key)
            this.setState({arrayDos:snap.val()});   
            this.setState({indice:snap.key}) ;
        })
        
    }

    handleClickAtras = () => {
        this.setState({load:false})
       
    }

    render(){
        return(
            <article className='articleInicio'>
                <div className='divTitulo'>
                    <h2>{this.props.titulo}</h2>
                </div>
                
                <div className='divContenedor2'>    
                    {
                        this._isMounted && !this.state.load
                        ?
                        this.state.array.map((dato, key) => {
                            return(
                                <div data-codigo={key} key={key} className='divFotosUsuarios' onClick={this.handleClick}>
                                    <div className='divImangenes'>
                                        <img data-codigo={key} src={dato.foto}></img>
                                    </div>
                                    <div data-codigo={key} className='divParrafo'>
                                        <p data-codigo={key}  className='parrafos'>{dato.usuario}</p>
                                        <p data-codigo={key} >{dato.mensaje}</p> 
                                    </div>                                  
                                </div>
                            )
                        })
                        :
                        this._isMounted && this.state.load
                        ?
                        <div>
                            <input className='bAtras' type='button' value='ATRAS' onClick={this.handleClickAtras}></input>                                              
                            <ComponenteComentarios foto={this.state.arrayDos.foto} indice={this.state.indice}></ComponenteComentarios>
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

