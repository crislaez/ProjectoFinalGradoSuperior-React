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
            usuario:'',
            comentario:'',
            arrayPrincipar:[],
            indiceDos:''
        }
    }
    
    componentDidMount(){
       this._isMounted = true;
       this.setState({indice:this.props.indice})

       console.log(this.props.indice)
       let datamensaje = firebase.database().ref(`${this.props.indice}`).child('comentarios');
       datamensaje.on('value',(snap) => {
           if(snap.val()){
            this.setState({arrayPrincipar:snap.val()});
            this.setState({indiceDos:this.state.arrayPrincipar.length});
           }          
       })       
    }

    componentWillMount(){
        this._isMounted = false
    }

    handleClickComentarios = () => {
        console.log(this.state.arrayPrincipar)
        if(!this.state.usuario || !/^[A-Za-z]+$/.test(this.state.usuario)){
            alert('Rellene el usuario correctamente')
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
            let datamensaje = firebase.database().ref(`${aux}`).child(`/comentarios/${longitud}`);
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
            this.setState({usuario:''})
            this.setState({comentario:''})            
        }        
    }

    render(){
        return(
            <div className='divCajaFoto'>

                <div className='divContenedorFoto'>
                    <img src={this.props.foto}></img>
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
                    <input className='btextoDos' type='text' value={this.state.usuario} onChange={(param) => {this.setState({usuario:param.target.value})}}  placeholder='usuario...'></input>
                    <br></br>
                    <input className='btextoDos' type='text' value={this.state.comentario} onChange={(param) => {this.setState({comentario:param.target.value})}}  placeholder='comentario...'></input>
                    <br></br>
                    <input className='botonEnviarDos' type='button' value='Enviar' onClick={this.handleClickComentarios}></input>
                </div>
            </div>
        )
    }
}

export default ComponenteComentarios