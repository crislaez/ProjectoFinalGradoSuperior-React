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
                this.setState({array:snap.val()})
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
            let aux = false;

            for(let valor in this.state.array){

                if (this.state.array[valor].usuario === this.state.usuario){

                    if(this.state.array[valor].datos){

                        this.state.array[valor].datos.map( (dato,key) => {
                    
                            let usuario = 
                                {
                                    indice1:valor,
                                    indice2:key,
                                    usuario:this.state.array[valor].usuario,
                                    foto:dato.foto,
                                    mensaje:dato.mensaje
                                }

                            arrAux.push(usuario);
                        });                                          
                        aux = true;
                    }
                }                              
            }

            if(!aux){
                alert('Usuario no encontrado');
            }

            this.setState({arrayUsuario:arrAux})            
            this.setState({usuario:''});
        }
    }

    handleClickComentario = (event) => {
        // console.log(event.target.dataset.indice1)
        // console.log(event.target.dataset.indice2)
        // console.log(event.target.dataset.foto)
        let usuario = 
            {
                indice1:event.target.dataset.indice1,
                indice2:event.target.dataset.indice2,
                foto:event.target.dataset.foto,
                load:true
            };

        const funcionCargarCatosComentario = this.props.funcionCargarCatosComentario;
        funcionCargarCatosComentario(usuario);
        
    }

    render(){

        console.log(this.state.arrayUsuario);
        // <ComponenteComentarios imagen={this.state.foto} indice1={this.state.indice1} indice2={this.state.indice2}></ComponenteComentarios>

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
                        this.state.arrayUsuario.map((dato, key) => {
                            return(
                                <div className='divCajitaBuscador' key={key} onClick={this.handleClickComentario} data-indice1={dato.indice1} data-indice2={dato.indice2} data-foto={dato.foto}>
                                    <div className='divBuscadorFoto'>
                                        <img src={dato.foto} alt={dato.foto} data-indice1={dato.indice1} data-indice2={dato.indice2} data-foto={dato.foto}></img>
                                    </div>
                                    <div className='divBuscadorDatos' data-indice1={dato.indice1} data-indice2={dato.indice2} data-foto={dato.foto}>
                                        <p style={{textAlign:'center', color:'#245281'}} data-indice1={dato.indice1} data-indice2={dato.indice2} data-foto={dato.foto}>{dato.usuario}</p>
                                        <p data-indice1={dato.indice1} data-indice2={dato.indice2} data-foto={dato.foto}>{dato.mensaje}</p>
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