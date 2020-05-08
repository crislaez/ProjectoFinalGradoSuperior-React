import React from 'react'
import firebase from 'firebase'

//CSS
import '../css/ArticlePerfiles.css'
class ArticlePerfiles extends React.Component{
    
    _isMounth = false;

    constructor(props){
        super(props)
        this.state = 
            {
                usuario:'',
                arrayCompleto:[],
                arrayUsuario:[]

            }
    }

    componentDidMount(){
        this._isMounth = true;
        if(localStorage.getItem('usuario')){

            this.setState({usuario:localStorage.getItem('usuario')});

            firebase.database().ref().on('value',(snap) => {

                if(this._isMounth){
                    console.log(snap.val());
                    this.setState({arrayCompleto:snap.val()});
                    console.log(this.state.arrayCompleto)
                }                
            })

        }
    }

    componentWillUnmount(){
        this._isMounth = false;
    }

    handleClick = (event) => {
        console.log(event.target.dataset.indice1)
        console.log(event.target.dataset.indice2)
        let confirmacion = window.confirm('Seguro que desea borrar la foto?');

        if(confirmacion){
            firebase.database().ref(`${event.target.dataset.indice1}/datos/`).child(`${event.target.dataset.indice2}`).remove();
            alert('Foto borrada')
        }
    }

    render(){
        const aux = [];
        this.state.arrayCompleto.map((dato,key) => {
            // console.log(dato)
            // console.log(this.state.usuario)            
            if(dato.usuario == this.state.usuario){
                if(dato.datos){
                    dato.datos.map((d,k) => {
                        let us = 
                            {
                                indice1:key,
                                indice2:k,
                                usuario:this.state.usuario,
                                foto:d.foto,
                                mensaje:d.mensaje
                            }
                        aux.push(us);
                    })
                }             
            }
        })

        return(
            <article className='divArticlePerfiles' style={{width:this.props.cambiarTamanoVentanas}}>
                <div className='divTitulo'>
                    <h2>{this.props.titulo}</h2>
                </div>

                <div className='divContenedor'>
                    {
                        this._isMounth && aux
                        ?
                        aux.map((dato,key) => {
                            return(
                                <div className='divCajitaBuscado' key={key}>
                                    <div className='divBuscadorFoto'>
                                        <img src={dato.foto} alt={dato.foto}></img>
                                    </div>
                                    <div className='divBuscadorDatos'>
                                        <p style={{textAlign:'center', color:'#245281'}}>{dato.usuario}</p>
                                        <p>{dato.mensaje}</p>
                                        <input className='botonBorrar' data-indice1={dato.indice1} data-indice2={dato.indice2} type='button' value='Borrar' onClick={this.handleClick}></input>
                                    </div>
                                </div>
                            )
                        })

                        :
                        <div>No hay datos</div>

                    }
                </div>           
            </article>
        )
    }
}

export default ArticlePerfiles