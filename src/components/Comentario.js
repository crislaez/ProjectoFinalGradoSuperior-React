import React from 'react'

//CSS
import '../css/Comentario.css'

class Comentario extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='divCajita'>
                <p className='divCajitaParrafoUno'>{this.props.usuarios}:</p>
                <p className='divCajitaComentario'>{this.props.comentarios}</p>
            </div>
        )
    }
}

export default Comentario;