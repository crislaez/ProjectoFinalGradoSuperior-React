import React from 'react'
import firebase from 'firebase'
//CSS
import '../css/AticleIngresarFoto.css'

class AticleIngresarFoto extends React.Component{

    __isMounted = false;

    constructor(props){
        super(props)
        this.state = 
        {
            usuario:'',
            mensaje:'',
            foto:'',
            ruta:'',
            indice:'',
            array:[]
        }
    }

    componentDidMount(){
        this.__isMounted = true;
        console.log(this._isMounted)    
        var dato = localStorage.getItem('indice')
        this.setState({indice:dato})
    }

    componentWillUnmount(){
        this.__isMounted = false;
        console.log(this._isMounted)    
    }

    handleClick = () => {
        console.log(this.state.indice)
        if(!this.state.usuario){
            alert('Rellene el usuario');
        }else if(!this.state.mensaje){
            alert('Rellene el mensaje');
        }else if(!this.state.foto){
            alert('Escoja la foto');
        }else{
            let botonEnvio = document.querySelector('#botonEnvio');
            //ponemos el boton disabled para que el usuario no siga tocando el boton
            botonEnvio.disabled = true;
             //vaciamos el array
            this.setState({array:[]});
            //creamos una referencia del storage de firebase
            const storage = firebase.storage().ref(`/imagenes/${this.state.foto.name}`)
            storage.put(this.state.foto)
            .then(res => {
                //hacemos la promesa porque la peticion es asincrona y entonces
                //sin la promesa falaria
                storage.getDownloadURL().then(ruta => {
                    //creamos un objeto donde meteremos todos los datos
                    var datos = 
                    {
                        usuario:this.state.usuario,
                        mensaje:this.state.mensaje,
                        foto:ruta
                    }
                    firebase.database().ref(`${this.state.indice}`).set(datos)
                    alert('Datos ingresados correctamente')
                    //cuando esten los datos subidos, abilitaremos denuevo el boton
                    botonEnvio.disabled = false;
                    //borramos los estados
                    this.setState({mensaje:'',usuario:'',foto:''})
                })
            })
            .catch(error => {
                alert(error.message)
            })
        }
        
    }

    render(){
        return(
            <article className='articleIngresar'>
                <div className='divTitulo'>
                    <h2>{this.props.titulo}</h2>
                </div>
                
                <div className='divContenedor'>
                    <div className='divContenedorBotones'>  
                        <h3>Ingrese los datos</h3>              
                        <input className='btexto' type='text' onChange={(param) => {this.setState({usuario:param.target.value})}} value={this.state.usuario} placeholder='usuario...'></input>
                        <br></br>
                        <input className='btexto' type='text' onChange={(param) => {this.setState({mensaje:param.target.value})}} value={this.state.mensaje} placeholder='mensaje...'></input>
                        <br></br>
                        <input type='file' onChange={(param) => {this.setState({foto:param.target.files[0]})}}></input>
                        <br></br>
                        <input id='botonEnvio' className='botonEnviar' type='button' onClick={this.handleClick} value='Enviar'></input>
                    </div>
                </div>
            </article>
        )
    }
}

export default AticleIngresarFoto