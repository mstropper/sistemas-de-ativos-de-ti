import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ApiUsuario from '../../api/usuario';
import { IsNotNull, FormatPhoneMask } from '../../common/Validator';
import SideBar from '../sideBar';

export default function UsuarioCadastro() {

    const [grupos, setGrupos] = useState(null);

    const [usuario, setUsuario] = useState({
        nome: '',
        fone: '',
        email: '',
        senha: '',
        confirmSenha: '',
        idGrupoAcesso: 0,
    });

    useEffect(() => {
        loadGruposAcesso();
    }, []);

    const loadGruposAcesso = async _ => {
        const response = await ApiUsuario.getGruposAcesso();
        console.log(response);
        setGrupos(response.data);
    }

    const cadastrar = async _ => {

        const validSenha = await validarSenha();

        if (validSenha.status) {
            await ApiUsuario.post(usuario);

            setUsuario({
                nome: '',
                fone: '',
                email: '',
                senha: '',
                confirmSenha: '',
                idGrupoAcesso: 0,
            });
        } else {
            alert(validSenha.msg);
        }
    }

    const validarSenha = async _ => {
        const data = {
            status: false,
            msg: ''
        };

        if (usuario.senha !== usuario.confirmSenha) {
            data.msg = 'Confirmação de senha inválida.';
        }
        if (usuario.senha.length < 6) {
            data.msg = 'Senha deve ter no mínimo 6 caracteres.';
        }
        if (usuario.senha === usuario.confirmSenha) {
            data.status = true;
        }

        return data;
    }

    return (
        <div className='App-container'>
            <SideBar page={'usuario'} />
            <div className='container-fluid p-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>Usuários</h1>
                    </div>
                </div>

                <br />

                <div className='row shadow-simple'>
                    <div className='col-md-12 text-center p-3'>
                        <i className='fas fa-portrait icon-size' />
                        <br />
                        <label>CADASTRAR USUÁRIOS</label>
                    </div>
                </div>

                <br />

                <div className='row'>
                    <div className='col-md-4'>
                        <input className='form-control'
                            onChange={e => setUsuario({ ...usuario, nome: e.target.value })}
                            value={usuario.nome}
                            placeholder='Nome do usuário' />
                    </div>
                    <div className='col-md-4'>
                        <input className='form-control'
                            onChange={e => setUsuario({ ...usuario, fone: FormatPhoneMask(e.target.value) })}
                            value={usuario.fone}
                            placeholder='Telefone' />
                    </div>
                    <div className='col-md-4'>
                        <input className='form-control'
                            onChange={e => setUsuario({ ...usuario, email: e.target.value })}
                            value={usuario.email}
                            placeholder='E-mail' />
                    </div>
                </div>
                <br />

                <div className='row'>
                    <div className='col-md-4'>
                        <select className='form-control'
                            onChange={e => setUsuario({ ...usuario, idGrupoAcesso: e.target.value })}
                            value={usuario.idGrupoAcesso}
                            name="grupoAcesso" id="grupoAcesso">
                            <option value="0">Escolha o grupo de acesso</option>
                            {
                                IsNotNull(grupos) &&
                                grupos.map(grupo =>
                                    <option key={grupo.id} value={grupo.id}
                                    >{grupo.nome}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className='col-md-4'>
                        <input className='form-control'
                            type='password'
                            onChange={e => setUsuario({ ...usuario, senha: e.target.value })}
                            value={usuario.senha}
                            placeholder='Senha (mín. 6 caracteres)' />
                    </div>
                    <div className='col-md-4'>
                        <input className='form-control'
                            type='password'
                            onChange={e => setUsuario({ ...usuario, confirmSenha: e.target.value })}
                            value={usuario.confirmSenha}
                            placeholder='Confirmar senha' />
                    </div>
                </div>
                <br />

                <div className='usuario-right-row'>
                    <Link to='usuario' className='btn btn-danger m-3'>
                        Cancelar
                    </Link>
                    <button onClick={cadastrar} className='btn btn-success m-3'>Salvar</button>
                </div >

            </div >
        </div >
    );
}