import React from 'react'
import firebase from 'firebase'
//CSS
//COMPO_NENTES
import Comentario from './Comentario.js'

class ComponenteComentarios extends React.Component{

    _isMounted = false;
 
    constructor(props){
        super(props);
        this.state = 
        {
            indice:'',
            indice2:'',
            usuario:'',
            comentario:'',
            arrayPrincipar:[]
            
        }
    }

    cargarDataBase = () => {

       let datamensaje = firebase.database().ref(`${this.props.indice1}`).child(`datos/${this.props.indice2}/comentarios`);
       datamensaje.on('value',(snap) => {    
            if(this._isMounted){
                if(snap.val()){
                    // console.log(snap.val())
                this.setState({arrayPrincipar:snap.val()});           
                } 
            }                    
       })  
    }
    
    componentDidMount(){
       this._isMounted = true;
       this.setState({indice:this.props.indice1,indice2:this.props.indice2, usuario:localStorage.getItem('usuario')})
       //console.log(this.props.indice1);
       //console.log(this.props.indice2)
       this.cargarDataBase();
                   
    }

    componentDidUpdate(prevProps){     
        if(this.props !== prevProps){
            this.setState({indice:this.props.indice1,indice2:this.props.indice2, usuario:localStorage.getItem('usuario')})
            this.cargarDataBase();
         }        
     }   

    componentWillMount(){
        this._isMounted = false
    }

    handleClickComentarios = () => {
        if(!this.state.usuario){
            alert('Tienes que estar logueado')
        }else if(!this.state.comentario){
            alert('Rellene el comentario')
        }else{            
            let aux = this.state.indice;                    
            let longitud;

            if(this.state.arrayPrincipar){
                longitud = this.state.arrayPrincipar.length
            }
            else{
                longitud = 0;
            }
            //creamos una varaible donde esta el indice y la foto donde ingresaremos los comentarios
            let datamensaje = firebase.database().ref(`${aux}`).child(`datos/${this.props.indice2}/comentarios/${longitud}`);
            //creamos elobjeto donde van los datos
            const datos = 
                {
                    usuario:this.state.usuario,
                    comentario:this.state.comentario
                };
            //ingresamos con set en el objeto donde esta la referencia de la base de datos
            datamensaje.set(datos)
            .then(res => {
                alert('Mensaje subido')
            })
            .catch(error => {
                console.log(error.message)
            })           
            
            this.setState({comentario:''})            
        }        
    }

    render(){


        return(
            <div className='divCajaFoto'>

                <div className='divContenedorFoto'>
                    <img src={this.props.imagen} alt={this.props.imagen}></img>
                </div>
                
                <div className='Comentarios'>
                {
                    this._isMounted && this.state.arrayPrincipar
                    ?
                        this.state.arrayPrincipar.map((dato, key) => {
                            return(
                            <Comentario key={key} usuarios={dato.usuario} comentarios={dato.comentario}></Comentario>
                            )
                        })
                    :
                    <div>Cargando...</div>
                    
                }
                </div>
                <div className='divCajaFormulario'>
                    <input className='btextoDos' type='text' value={this.state.comentario} onChange={(param) => {this.setState({comentario:param.target.value})}}  placeholder='comentario...'></input>
                    <br></br>
                    <input className='botonEnviarDos' type='button' value='Comentar' onClick={this.handleClickComentarios}></input>
                </div>
            </div>
        )
    }
}

export default ComponenteComentarios