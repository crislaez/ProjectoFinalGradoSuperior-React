import React from 'react'
import firebase from 'firebase'
//CSS
import '../css/AticleIngresarFoto.css'

class AticleIngresarFoto extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props)
        this.state = 
        {
            mensaje:'',
            foto:'',
            ruta:'',
            indice:'',
            array:[],
            indiceFoto:'',
            usuaro:''
        }
    }

    componentDidMount(){
        this._isMounted = true;
      
        this.setState({usuaro:localStorage.getItem('usuario'),indice:localStorage.getItem('primarykey')})
        
    }

    componentWillUnmount(){
        this._isMounted = false;
        console.log(this._isMounted)    
    }

    handleClick = () => {
        console.log(this.state.indice)

        if(!this.state.usuaro){
            alert('Tienes estar logueado')
        }else if(!this.state.mensaje){
            alert('Rellene el mensaje');
        }
        else if(!this.state.foto){
            alert('Escoja la foto');
        }
        else{
            //aqui cogemos el indice del array que devuelve para saber en qeu indice
            //ingresar al nueva foto
            firebase.database().ref(`${this.state.indice}/datos`).on('value',(snap) => {                
                //si este valor nos da falso significa que /datos aun no existe
                //asique le asignamos el valor 0, y si no cogerla la posicion
                //qsigueinte donde ingresara la foto nueva
                if(!snap.val()){
                    this.setState({indiceFoto:0})
                }else{
                    this.setState({indiceFoto:snap.val().length})
                    console.log(this.state.indiceFoto);
                }
            })

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
                    const datos = 
                        {
                            mensaje:this.state.mensaje,
                            foto:ruta
                        }

                    firebase.database().ref(`${this.state.indice}/datos/${this.state.indiceFoto}`).set(datos)
                    alert('Datos ingresados correctamente')
                    //cuando esten los datos subidos, abilitaremos denuevo el boton
                    botonEnvio.disabled = false;
                    //borramos los estados
                    this.setState({mensaje:'',foto:''})
                })
                //llamamos a la funcion que esta en el section para que cuando subamos una foto, nos redirecciona al componente inicio
                const redireccionInicio = this.props.redireccionInicio;
                redireccionInicio();
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