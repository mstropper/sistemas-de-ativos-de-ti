import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import ApiUsuario from '../../api/usuario';
import { IsNotNull, FormateDate } from '../../common/Validator';
import SideBar from '../sideBar';
import UsuarioEdicao from './usuarioEdicao';

export default function Usuario() {

    const [usuarios, setUsuarios] = useState(null);

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async _ => {
        const response = await ApiUsuario.getAll();
        setUsuarios(response.data);
    }

    const deletarUsuario = async (id) => {
        await ApiUsuario.delete(id);
        loadUsuarios();
    }

    return (
        <div className='App-container'>
            <SideBar page={'usuario'} />
            <div className='container-fluid p-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>Usuários</h1>
                    </div>
                    <div className='col-md-6 usuario-right'>
                        <Link to='usuario-cadastro' className='btn btn-primary p-2 shadow-simple'>
                            CADASTRAR NOVO USUÁRIO
                            <i className="fas fa-user-plus" style={{ marginLeft: '.6rem' }} />
                        </Link>
                    </div>
                </div>

                <br />

                <div className='row shadow-simple'>
                    <div className='col-md-12 text-center p-3'>
                        <i className='fas fa-portrait icon-size' />
                        <br />
                        <label>USUÁRIOS CADASTRADOS</label>
                    </div>
                </div>

                <br />
                {/*
            <div className='row'>
                <div className='col-md-3'>
                    <div className="input-group" >
                        <div className="input-group-text">
                            <i className="fas fa-search" />
                        </div>
                        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Pesquisa" />
                    </div>
                </div>
            </div>
            */}

                <br />

                <div className='row'>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Data Cadastro</th>
                                <th scope="col">Grupo de acesso</th>
                                <th scope="col" className='text-center'>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                IsNotNull(usuarios) &&
                                usuarios.map(usuario =>
                                    <Fragment key={usuario.id}>
                                        <tr >
                                            <th scope="row">{usuario.id}</th>
                                            <td>{usuario.nome}</td>
                                            <td>{FormateDate(usuario.dataCadastro)}</td>
                                            <td>{usuario.nomeGrupoAcesso}</td>
                                            <td className='text-center'>
                                                <button className='btn btn-outline-primary element-space'
                                                    data-toggle="modal" data-target={'#modal' + usuario.id}
                                                >
                                                    <i className='fas fa-pencil-alt' />
                                                </button>
                                                <button onClick={_ => deletarUsuario(usuario.id)} className='btn btn-outline-danger element-space'><i className='fas fa-times-circle' /></button>
                                            </td>
                                        </tr>
                                        <div className="modal fade" id={'modal' + usuario.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                            <UsuarioEdicao dataItem={usuario} refresh={loadUsuarios} />
                                        </div>
                                    </Fragment>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    )
}