import React, { useEffect, useState } from 'react';
import './styles.css';
import { IsNotNull, FormatPhoneMask } from '../../common/Validator';
import ApiUsuario from '../../api/usuario';

export default function HardwareEdicao({ dataItem, refresh }) {

    const [grupos, setGrupos] = useState(null);

    const [usuario, setUsuario] = useState({
        id: 0,
        nome: '',
        fone: '',
        email: '',
        senha: '',
        idGrupoAcesso: 0,
    });

    useEffect(() => {
        setUsuario(dataItem);
        loadGruposAcesso();
    }, []);

    const loadGruposAcesso = async _ => {
        const response = await ApiUsuario.getGruposAcesso();
        setGrupos(response.data);
    }

    const editar = async _ => {
        const validSenha = await validarSenha();

        if (validSenha.status) {
            await ApiUsuario.put(usuario);

            setUsuario({
                id: 0,
                nome: '',
                fone: '',
                email: '',
                senha: '',
                confirmSenha: '',
                idGrupoAcesso: 0,
            });

            await refresh();
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
        <div className="modal-dialog modal-lg" role="document" >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Alteração de cadastro</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="col col-md-12 p-5">
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
                            <label>EDITAR USUÁRIO</label>
                        </div>
                    </div>
                    <br />

                    <div className='row'>
                        <div className='col-md-4'>
                            <input className='form-control'
                                value={'Usuário ID: ' + usuario.id}
                            />
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
                    <br />
                </div >
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={editar} data-dismiss="modal">Salvar</button>
                </div>
            </div >
        </div >
    );
}