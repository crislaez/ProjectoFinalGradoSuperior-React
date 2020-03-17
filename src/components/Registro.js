import React from 'react'
import firebase from 'firebase'
//CSS
import '../css/Registro.css'

class Registro extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props)
        this.state = 
        {
            nombre:'',
            apellido:'',
            sexo:'',
            correo:'',
            clave:'',
            claveDos:'',
            indice:''

        }
    }

    componentDidMount(){
        this._isMounted = true;
       
        firebase.database().ref().on('value',(snap) => {
            if(this._isMounted){
                // console.log(snap.val().length)
                this.setState({indice:snap.val().length})
                // console.log(snap.val().length);
            }            
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.nombre && !/^[A-Za-z]+$/.test(this.state.nombre)){
            alert('Rellene el nombre correctamente');
        }else if(!this.state.apellido && !/^[A-Za-z]+$/.test(this.state.apellido)){
            alert('Rellene el apellido correctamente');
        }else if(!this.state.sexo || this.state.sexo == '0' ){
            alert('Rellene el sexo correctamente');
        }else if(!this.state.correo){
            alert('Rellene el correo correctamente');
        }else if(!this.state.clave){
            alert('Rellene la clave correctamente');
        }else if(!this.state.claveDos || this.state.claveDos != this.state.clave ){
            alert('Rellene las claves no coinciden');
        }else{
            console.log(this.state.nombre);
            console.log(this.state.apellido);
            console.log(this.state.sexo);
            console.log(this.state.correo);
            console.log(this.state.clave);
            console.log(this.state.claveDos); 

            const usuario = 
                {
                    usuario:this.state.nombre,
                    apellido:this.state.apellido,
                    sexo:this.state.sexo,
                    correo:this.state.correo,
                    clave:this.state.clave
                }
            firebase.database().ref(`${this.state.indice}`).set(usuario);
            alert('Datos ingresados correctamente');
            //vaciamos los inputs y los estados
            this.setState({nombre:'',apellido:'',sexo:'',correo:'',clave:'',claveDos:''});
        }               
    }

    render(){
        return(
            <div className='divContenedorRegistro'>
                <div className='divtituloRegistro'>
                    <h2>{this.props.titulo}</h2>
                </div>   
                
                <div className='divContenedorDatos'>

                    <form className='formRegistro' onSubmit={this.handleSubmit} action='' method='POST'>
                        <input className='inputRegistro' type='text' name='nombre' value={this.state.nombre} onChange={(param) => {this.setState({nombre:param.target.value})}} placeholder='nombre...'></input>
                        <br></br>
                        <input className='inputRegistro' type='text' name='apellido'value={this.state.apellido} onChange={(param) => {this.setState({apellido:param.target.value})}} placeholder='apellido...'></input>
                        <br></br>
                        <select className='inputRegistro' name='sexo' onChange={(param) => {this.setState({sexo:param.target.value})}}>
                            <option value='0'>--Seleccione Sexo--</option>
                            <option value='hombre'>Hombre</option>
                            <option value='mujer'>Mujer</option>
                        </select>
                        <br></br>
                        <input className='inputRegistro' type='email' name='correo' value={this.state.correo} onChange={(param) => {this.setState({correo:param.target.value})}} placeholder='correo...'></input>
                        <br></br>
                        <input className='inputRegistro' type='password' name='clave' value={this.state.clave} onChange={(param) => {this.setState({clave:param.target.value})}} placeholder='clave...'></input>
                        <br></br>
                        <input className='inputRegistro' type='password' name='claveDos' value={this.state.claveDos} onChange={(param) => {this.setState({claveDos:param.target.value})}} placeholder='repetir clave...'></input>
                        <br></br>
                        <br></br>
                        <input className='bSubmit' type='submit' value='Enviar'></input>
                    </form>

                </div>
            
            </div>
        )
    }
}

export default Registro