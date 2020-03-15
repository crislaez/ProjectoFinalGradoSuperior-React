import React from 'react'
import firebase from 'firebase'
//CSS 
import '../css/Login.css'

class Login extends React.Component{

    _isMounted = false;
    
    constructor(props){
        super(props)
        this.state = 
        {
            nombre:'',
            clave:'',
            array:[]
        }
    }

    componentDidMount(){
        this._isMounted = true;

        firebase.database().ref().on('value',(snap) => {
            // console.log(snap.val())
            this.setState({array:snap.val()});
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleLogin = (event) => {
        event.preventDefault();

        if(!this.state.nombre && !/^[A-Za-z]+$/.test(this.state.nombre)){
            alert('Rellene el nombre correctamente');
        }else if(!this.state.clave){
            alert('Rellene la clave correctamente');
        }else{
            let comprobar = false;
            // console.log(this.state.array)
            for(let valor in this.state.array){
                if(this.state.array[valor].usuario == this.state.nombre && this.state.array[valor].clave == this.state.clave){
                    console.log(this.state.array[valor])    
                    comprobar = true;         
                    localStorage.setItem('usuario',this.state.nombre)    
                }else{
                    comprobar = false
                }
            }

            if(comprobar){
                alert('Correcto')
            }else{
                alert('Datos incorrectos')
            }
            
            this.setState({nombre:'',clave:''})
        }        
    }
    render(){
        return(
            <div className='divContenedorLogin'>
                <div className='divtituloLogin'>
                    <h2>{this.props.titulo}</h2>
                </div> 

                <div className='divContenedorDatos'>
                    <form className='formLogin' onSubmit={this.handleLogin} action='' method='POST'>
                        <input className='inputLogin' type='text' value={this.state.nombre} onChange={(param) => {this.setState({nombre:param.target.value})}} placeholder='nombre...'></input>
                        <br></br>
                        <input className='inputLogin' type='password' value={this.state.clave} onChange={(param) => {this.setState({clave:param.target.value})}} placeholder='clave...'></input>
                        <br></br>
                        <br></br>
                        <input className='bSubmitLogin' type='submit' value='Logear'></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login