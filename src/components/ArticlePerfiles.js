import React from 'react'
//CSS
import '../css/ArticlePerfiles.css'
class ArticlePerfiles extends React.Component{
    render(){
        return(
            <article className='divArticlePerfiles'>
            <h2>{this.props.titulo}</h2>
            </article>
        )
    }
}

export default ArticlePerfiles