import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import { ApiUsuario } from '../../api/usuario';
import { ApiSolicitacao } from '../../api/solicitacao';
import { IsNotNull } from '../../common/Validator';
import SideBar from '../sideBar';

export default function Solicitacao() {

    const [usuarios, setUsuarios] = useState(null);

    const [item, setItem] = useState({
        idUsuario: 0,
        descricao: ''
    });

    const [solicitacao, setSolicitacao] = useState(null);

    useEffect(() => {
        loadUsuarios();
        loadSolicitacoes();
    }, []);

    const loadUsuarios = async _ => {
        const response = await ApiUsuario.getAll();
        setUsuarios(response.data);
    }

    const loadSolicitacoes = async _ => {
        const response = await ApiSolicitacao.getAll();
        console.log(response.data);
        setSolicitacao(response.data);
    }

    const cadastrar = async _ => {
        await ApiSolicitacao.post(item);

        setItem({
            idUsuario: 0,
            descricao: ''
        });
        await loadSolicitacoes();
    }

    const deletarSolicitacao = async id => {
        await ApiSolicitacao.delete(id);
        await loadSolicitacoes();
    }

    const alterarSolicitacao = async id => {
        await ApiSolicitacao.putStatus(id);
        await loadSolicitacoes();
    }


    return (
        <div className='App-container'>
            <SideBar page={'solicitacao'} />
            <div className='container-fluid p-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>Solicitação</h1>
                    </div>
                </div>

                <br />

                <div className='row shadow-simple'>
                    <div className='col-md-12 text-center p-3'>
                        <i className='fas fa-headset icon-size' />
                        <br />
                        <label>CADASTRAR SOLICITAÇÂO</label>
                    </div>
                </div>

                <br />

                <div className='col-md-4'>
                    <select className='form-control' name="idUsuario" id="idUsuario"
                        onChange={e => setItem({ ...item, idUsuario: e.target.value })}
                        value={item.idUsuario}
                    >
                        <option value="0">Nome do usuário</option>
                        {
                            IsNotNull(usuarios) &&
                            usuarios.map(usuario =>
                                <option value={usuario.id}>{usuario.id + ' - ' + usuario.nome}</option>
                            )
                        }
                    </select>

                    <br />

                    <textarea className='form-control' placeholder='Descreva a solicitação'
                        rows="6"
                        onChange={e => setItem({ ...item, descricao: e.target.value })}
                        value={item.descricao}
                    ></textarea>
                    <br />
                </div>


                <div className='solicitacao-right-row'>
                    <Link to='/' className='btn btn-danger m-3'>
                        Cancelar
                    </Link>
                    <button onClick={cadastrar} className='btn btn-success m-3'>Salvar</button>
                </div >

                <div className='col-md-12'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Usuário</th>
                                <th scope="col">Status</th>
                                <th scope="col">Descrição</th>
                                <th scope="col" className='text-center'>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                IsNotNull(solicitacao) &&
                                solicitacao.map(sl =>
                                    <tr key={sl.id}>
                                        <th scope="row">{sl.id}</th>
                                        <td>{sl.usuarioId + ' - ' + sl.usuarioNome}</td>
                                        <td>{sl.descricao}</td>
                                        <td>{sl.statusSolicitacao == 0 ? 'Em Aberto' : 'Concluída'}</td>
                                        <td className='text-center'>
                                            {sl.statusSolicitacao == 0 &&
                                                <button className='btn btn-outline-success element-space' onClick={_ => alterarSolicitacao(sl.id)}>
                                                    <i className='fas fa-check' />
                                                </button>
                                            }
                                            <button onClick={_ => deletarSolicitacao(sl.id)} className='btn btn-outline-danger element-space'>
                                                <i className='fas fa-times-circle' />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}