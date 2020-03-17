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
            if(this._isMounted){
                this.setState({array:snap.val()});
            }            
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
            var comprobar = false;
            // console.log(this.state.array)
            for(let valor in this.state.array){
                if(this.state.array[valor].usuario == this.state.nombre && this.state.array[valor].clave == this.state.clave){
                    // console.log(this.state.array[valor])    
                    comprobar = true;    

                    //ingresamos en el localstorage el nombre del usuario y el indice para saber donde subir las fotos    
                    localStorage.setItem('usuario',this.state.nombre)  
                    localStorage.setItem('primarykey',valor)   
                    console.log(comprobar)           
                    
                    //aqui activamos la funcion de section para que su estado sea INICIo y se carge ese componente
                    const funcionPadreSection  = this.props.cambioEstado;
                    funcionPadreSection();
                    //esta funcion es la de ArticleLoguear para cambiar el estado y se renderice el componente boton cerrar sesion
                    const functionPadreLogear = this.props.cambioEstadoLogear
                    functionPadreLogear();
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