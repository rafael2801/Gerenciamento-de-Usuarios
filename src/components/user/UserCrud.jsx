import React, { useEffect, useState } from 'react'
import Main from '../template/main'
import axios from 'axios'

const headerProps = {
    icon:'users',
    title:'Usuarios',
    subtitle:'Cadastro de usuarios: Incluir, Listar, Alterar e Excluir '
}

const baseUrl = 'http://localhost:3001/users'
const initialUser = {
    user:{name:'',email:''},
    list:[]
}

export default props =>{
    
    const [user,setUser] = useState({...initialUser.user})
    const [list,setList] = useState([])

    useEffect(()=>{
        axios(baseUrl).then(res => {
            setList(res.data)
        })
    },[])

    function limpar(){
        setUser(initialUser.user)
    }
    function save(){
        const userFalse = user
        const method = userFalse.id ? 'put' : 'post'
        const url = userFalse.id ? `${baseUrl}/${userFalse.id}` : baseUrl
        axios[method](url,userFalse)
        .then(res => {
            const list = getUpdated(res.data)
            setUser(initialUser.user)
            setList(list)
        })
    }

    function getUpdated(user,add = true){
        const lista = list.filter(u => u.id !== user.id )
       if(add) lista.unshift(user)
        return lista
    }
    function updateField(event){
        const userFalse = {...user}
        userFalse[event.target.name] = event.target.value
        setUser(userFalse)
    }
    function RenderForm(){

        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className='form-control'
                            name='name'
                            value={user.name} 
                            onChange={e => updateField(e) }
                            placeholder='Digite o nome'/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="text" className='form-control'
                            name='email'
                            value={user.email} 
                            onChange={e => updateField(e) }
                            placeholder='Digite o email'/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button 
                        onClick={(e)=>save(e)}
                        className="btn btn-primary">
                            Salvar
                        </button>
                        <button
                        onClick={(e)=>limpar(e)} 
                        className="btn btn-secondary ml-2">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    function load(user){
        console.log(user)
        setUser(user)
    }
    function remove(user){
        axios.delete(`${baseUrl}/${user.id}`)
        .then(resp => {
            const listFalse = getUpdated(user,false)
            setList(listFalse)
        })
    }
    function renderTable(){

        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Açoes</th>
                    </tr>
                </thead>
                <tbody>
                        {renderRow()}
                </tbody>
            </table>
        )
    }
    function renderRow(){
        return list.map(user => {
            return(
                <tr key={user.id}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        <button 
                        onClick={()=>load(user)}
                        className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button 
                        onClick={()=>remove(user)}
                        className="btn btn-danger ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <Main {...headerProps}>
            {RenderForm()}
            {renderTable()}
        </Main>
    )
}