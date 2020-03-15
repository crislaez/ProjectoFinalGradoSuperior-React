import React from 'react'
//CSS
import '../css/ArticleLoguear.css'

class ArticleLoguear extends React.Component{
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
                        </div>
                        
                        <div className='divLogin'>
                        </div>

                        <div className='divVacio'>
                        </div> 

                        <div className='Registro'>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

export default ArticleLoguear