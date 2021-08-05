import React from 'react'
import Main from '../template/main'


export default props =>
    <Main icon='home' title='Inicio'
        subtitle='Segundo Projeto.'>
        <div className="display-4">
            Bem-Vindo!
        </div>
        <hr />
        <p className="mb-0">Sistema para exemplificar a 
        construção de um cadastro desenvolvido em React!
        </p>
    </Main>