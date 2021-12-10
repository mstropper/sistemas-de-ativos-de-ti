import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import { IsNotNull } from '../../common/Validator';
import { ApiHardware } from '../../api/hardware';
import ApiUsuario from '../../api/usuario';

export default function HardwareEdicao({ dataItem, refresh }) {

    const [item, setItem] = useState(
        {
            tipo: '',
            dataAquisicao: '',
            modelo: '',
            quantidade: '',
            tag: '',
            atribuir: ''
        }
    );

    const [usuarios, setUsuarios] = useState(null);

    useEffect(() => {
        setItem(dataItem);
        loadUsuarios();
    }, []);

    const editar = async _ => {

        if (!IsNotNull(item.atribuir) || item.atribuir === 0) {
            setItem({ ...item, atribuir: 8 })
        }

        await ApiHardware.put(item);

        setItem({
            id: 0,
            tipo: '',
            dataAquisicao: '',
            modelo: '',
            quantidade: '',
            tag: '',
            atribuir: ''
        });

        await refresh();
    }

    const loadUsuarios = async _ => {
        const response = await ApiUsuario.getAll();
        console.log(response.data)
        setUsuarios(response.data);
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
                            <h1>Hardware</h1>
                        </div>
                    </div>

                    <br />

                    <div className='row shadow-simple'>
                        <div className='col-md-12 text-center p-3'>
                            <i className='fas fa-desktop icon-size' />
                            <br />
                            <label>EDITAR HARDWARE</label>
                        </div>
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col-md-4'>
                            <input className='form-control'
                                value={'Hardware ID: ' + item.id}
                            />
                        </div>
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col-md-4'>
                            <input className='form-control' placeholder='Tipo'
                                onChange={e => setItem({ ...item, tipo: e.target.value })}
                                value={item.tipo}
                            />
                        </div>
                        <div className='col-md-4'>
                            <input className='form-control' placeholder='Data da aquisição'
                                type='date'
                                onChange={e => setItem({ ...item, dataAquisicao: e.target.value })}
                                value={item.dataAquisicao}
                            />
                        </div>
                        <div className='col-md-4'>
                            <input className='form-control' placeholder='Modelo'
                                onChange={e => setItem({ ...item, modelo: e.target.value })}
                                value={item.modelo}
                            />
                        </div>
                    </div>
                    <br />

                    <div className='row'>
                        <div className='col-md-4'>
                            <input className='form-control' placeholder='Quantidade'
                                onChange={e => setItem({ ...item, quantidade: e.target.value })}
                                value={item.quantidade}
                            />
                        </div>
                        <div className='col-md-4'>
                            <input className='form-control' placeholder='Tag'
                                onChange={e => setItem({ ...item, tag: e.target.value })}
                                value={item.tag}
                            />
                        </div>
                        <div className='col-md-4'>
                            <select className='form-control' name="grupoAcesso" id="grupoAcesso"
                                onChange={e => setItem({ ...item, atribuir: e.target.value })}
                                value={item.atribuir}
                            >
                                <option value="0">Atribuir</option>
                                {
                                    IsNotNull(usuarios) &&
                                    usuarios.map(usuario =>
                                        <option key={usuario.id} value={usuario.id}>{usuario.id + ' - ' + usuario.nome}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
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