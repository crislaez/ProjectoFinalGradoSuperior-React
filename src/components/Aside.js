import React from 'react'
import firebase from 'firebase';
//CSS
import '../css/Aside.css'

class Aside extends React.Component{

    _isMounted = false;
    arr = [];

    constructor(props){
        super(props);
        this.state = 
        {  
            load:'',
            usuario:'',
            array:[],
            arrayUsuario:[]
        }
    }

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted){
            firebase.database().ref().on('value',(snap) => {
                // console.log(snap.val());
                this.setState({array:snap.val()})
                // console.log(this.state.array);
            })
        }        
    }

    componentWillMount(){
        this._isMounted = false;
    }

    handleClick = () => {
        if(!this.state.usuario || !/^[A-Za-z]+$/.test(this.state.usuario)){
            alert('ingrese el usuario correctamente')
        }else{
            let arrAux = [];
            
            for(let valor in this.state.array){
                if (this.state.array[valor].usuario == this.state.usuario){
                   //si coincide el nombre que emos metido en el texto
                   //con el recorrido del array que tenga ese mismo nombre
                   //en el usuario, se añade al array auxiliar

                   //aqui recorremos el array datos donde estan las fotos, que estan dentro del array principal
                   this.state.array[valor].datos.map((dato,key) => {
                    //    console.log(this.state.array[valor].usuario)
                    //    console.log(dato.foto)
                    //     console.log(dato.mensaje)
                        let usuario = 
                            {
                                usuario:this.state.array[valor].usuario,
                                foto:dato.foto,
                                mensaje:dato.mensaje
                            }
                        arrAux.push(usuario);
                   })    
                }
            }
            this.setState({arrayUsuario:arrAux})            
            this.setState({usuario:''});
        }
    }

    render(){
        return(
            <aside className='divAside'>

                <div className='divTituloAside'>    
                    <h2>Buscador</h2>
                </div>

                <div className='divBuscador'>
                    <input className='bTextoBuscador' type='text' onChange={(param) => {this.setState({usuario:param.target.value})}} value={this.state.usuario} placeholder='Ingrese usuario...'></input>
                    <input className='bBuscador' type='button' onClick={this.handleClick} value='Buscar'></input>
                </div>

                <div className='divContenedorBuscador'>
                    {
                        this._isMounted && this.state.arrayUsuario
                        ?
                        this.state.arrayUsuario.map((data, key) => {
                            return(
                                <div className='divCajitaBuscador' key={key}>
                                    <div className='divBuscadorFoto'>
                                        <img src={data.foto}></img>
                                    </div>
                                    <div className='divBuscadorDatos'>
                                        <p style={{textAlign:'center', color:'#245281'}}>{data.usuario}</p>
                                        <p>{data.mensaje}</p>
                                    </div>
                                </div>
                            )
                        })
                        :
                        this._isMounted && this.state.arrayUsuario === 0
                        ?
                        <div>No hay usuarios</div>
                        :
                        <div>Cargando...</div>                        
                    }
                </div>
               
            </aside>
        )
    }
}

export default Aside