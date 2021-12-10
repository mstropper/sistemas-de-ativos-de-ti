import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import { IsNotNull } from '../../common/Validator';
import { ApiHardware } from '../../api/hardware';
import ApiUsuario from '../../api/usuario';
import SideBar from '../sideBar';

export default function HardwareCadastro() {

    const [item, setItem] = useState(
        {
            tipo: '',
            dataAquisicao: '',
            modelo: '',
            quantidade: '',
            tag: '',
            atribuir: 0
        }
    );

    const [usuarios, setUsuarios] = useState(null);

    useEffect(() => {
        loadUsuarios();
    }, []);

    const cadastrar = async _ => {

        let dataItem = null;

        if (!IsNotNull(item.atribuir) || item.atribuir == 0) {
            dataItem = {
                tipo: item.tipo,
                dataAquisicao: item.dataAquisicao,
                modelo: item.modelo,
                quantidade: item.quantidade,
                tag: item.tag,
                atribuir: 8,
            };
            await setItem({ ...item, atribuir: 8 })
        } else {
            dataItem = item;
        }
        await console.log(dataItem);

        await ApiHardware.post(dataItem);

        await setItem({
            tipo: '',
            dataAquisicao: '',
            modelo: '',
            quantidade: '',
            tag: '',
            atribuir: 0
        });
    }

    const loadUsuarios = async _ => {
        const response = await ApiUsuario.getAll();
        console.log(response.data)
        setUsuarios(response.data);
    }

    return (
        <div className='App-container'>
            <SideBar page={'hardware'} />
            <div className='container-fluid p-5'>
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
                        <label>CADASTRAR HARDWARE</label>
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
                                    <option value={usuario.id}>{usuario.id + ' - ' + usuario.nome}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <br />

                <div className='hard-right-row'>
                    <Link to='hardware' className='btn btn-danger m-3'>
                        Cancelar
                    </Link>
                    <button className='btn btn-success m-3' onClick={cadastrar}>Salvar</button>
                </div >

            </div >
        </div >
    );
}