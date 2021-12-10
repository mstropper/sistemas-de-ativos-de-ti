import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ApiHardware from '../../api/hardware';
import { IsNotNull, FormateDate } from '../../common/Validator';
import SideBar from '../sideBar';
import HardwareEdicao from './hardwareEdicao';

export default function Hardware() {

    const [items, setItems] = useState(null);

    const [filtro, setFiltro] = useState({
        key: 0,
        value: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async _ => {
        const responseItems = await ApiHardware.getAll();
        setItems(responseItems.data);
    }

    const deletarHardware = async id => {
        await ApiHardware.delete(id);
        loadData();
    }


    const search = async _ => {
        if (filtro.key === 0) {
            alert('Por favor, selecione o filtro de pesquisa.');
            return;
        }
        const response = await ApiHardware.getSearch(filtro);
        console.log(response);
        setItems(response.data);
    }

    const limpar = async _ => {
        setFiltro({
            key: 0,
            value: ""
        });

        await loadData();
    }

    return (
        <div className='App-container'>
            <SideBar page={'hardware'} />
            <div className='container-fluid p-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>Hardware</h1>
                    </div>
                    <div className='col-md-6 usuario-right'>
                        <Link to='hardware-cadastro' className='btn btn-primary p-2 shadow-simple'>
                            CADASTRAR NOVO HARDWARE
                            <i className="fas fa-user-plus" style={{ marginLeft: '.6rem' }} />
                        </Link>
                    </div>
                </div>

                <br />

                <div className='row'>
                    <div className='col-md-3'>
                        <br /><br />
                        <input className='form-control' placeholder={'Pesquisar'}
                            value={filtro.value}
                            onChange={e => setFiltro({ ...filtro, value: e.target.value })} />
                        <br />
                        <select className='form-control'
                            onChange={e => setFiltro({ ...filtro, key: e.target.value })}
                            value={filtro.key}
                        >
                            <option value={0}>Selecione o filtro</option>
                            <option value={1}>Tipo</option>
                            <option value={2}>Modelo</option>
                            <option value={3}>Usuário</option>
                        </select>
                        <br />
                        <button className='btn btn-primary' onClick={search}>
                            Pesquisar
                        </button>
                        &nbsp; &nbsp; &nbsp;
                        <button className='btn btn-primary' onClick={limpar}>
                            Limpar filtros
                        </button>
                    </div>
                    <div className='col-md-9'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Data de aquisição</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Quantidade</th>
                                    <th scope="col">Tag</th>
                                    <th scope="col">Usuário</th>
                                    <th scope="col" className='text-center'>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    IsNotNull(items) &&
                                    items.map(item =>
                                        <Fragment key={item.id}>
                                            <tr >
                                                <th scope="row">{item.id}</th>
                                                <td>{item.tipo}</td>
                                                <td>{FormateDate(item.dataAquisicao)}</td>
                                                <td>{item.modelo}</td>
                                                <td>{item.quantidade}</td>
                                                <td>{item.tag}</td>
                                                <td>{item.usuarioId + ' - ' +item.usuarioNome}</td>
                                                <td className='text-center'>
                                                    <button className='btn btn-outline-primary element-space'
                                                        data-toggle="modal" data-target={'#modal' + item.id}
                                                    >
                                                        <i className='fas fa-pencil-alt' />
                                                    </button>
                                                    <button onClick={_ => deletarHardware(item.id)} className='btn btn-outline-danger element-space'>
                                                        <i className='fas fa-times-circle' />
                                                    </button>
                                                </td>
                                            </tr>
                                            <div className="modal fade" id={'modal' + item.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                                                <HardwareEdicao dataItem={item} refresh={loadData} />
                                            </div>
                                        </Fragment>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </div >
    )
}