import React from 'react'
//CSS
import '../css/ArticleLoguear.css'
//COMPONENTES
import Login from './Login'
import Registro from './Registro'

class ArticleLoguear extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props)

        this.state = 
            {
                load:false

            }
    }

    handleClick = (event) => {
        if(event.target.id == 'bLogin'){
            this.setState({load:true})
        }else{
            this.setState({load:false})
        }
    }

    componentDidMount(){
        this._isMounted = true;
        console.log(this._isMounted)
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    render(){
        return(
            <article className='divArticleLoguear'>
                <div className='divTitulos'>
                    <h2>{this.props.titulo}</h2>
                </div>

                <div className='divContenedorLoguin'>
                    <div className='divContenedorLoguear'>
                        <div className='divLoginRegistro'>
                            <h3>Login | Registro</h3>
                            <input id='bLogin' type='button' value='Login' onClick={this.handleClick}></input>
                            <input id='bRegistro' type='button' value='Registro' onClick={this.handleClick}></input>
                        </div>
                        {
                            this._isMounted && this.state.load
                            ?
                            <Login titulo='Login'></Login>
                            :
                            this._isMounted || !this.state.load
                            ?
                            <Registro titulo='Registro'></Registro>
                            :
                            <div>Cargando...</div>
                        }
                      
                    </div>
                </div>
            </article>
        )
    }
}

export default ArticleLoguear