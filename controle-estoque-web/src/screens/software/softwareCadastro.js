import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import { ApiHardware } from '../../api/hardware';
import { ApiSoftware } from '../../api/software';
import { IsNotNull } from '../../common/Validator';
import SideBar from '../sideBar';

export default function SoftwareCadastro() {

    const [item, setItem] = useState({
        descricao: '',
        dataAquisicao: '',
        licenca: '',
        atribuir: 0,
        tag: ''
    });

    const [hardware, setHardware] = useState(null);

    useEffect(() => {
        loadHardware();
    }, []);

    const loadHardware = async _ => {
        const response = await ApiHardware.getAll();
        setHardware(response.data);
    }

    const cadastrar = async _ => {

        let dataItem = null;

        if (!IsNotNull(item.atribuir) || item.atribuir == 0) {
            dataItem = {
                descricao: item.descricao,
                dataAquisicao: item.dataAquisicao,
                licenca: item.licenca,
                atribuir: 26,
                tag: item.tag,
            };
            await setItem({ ...item, atribuir: 26 })
        } else {
            dataItem = item;
        }

        await ApiSoftware.post(dataItem);

        setItem({
            descricao: '',
            dataAquisicao: '',
            licenca: '',
            atribuir: 0,
            tag: ''
        });
    }


    return (
        <div className='App-container'>
            <SideBar page={'software'} />
            <div className='container-fluid p-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1>Software</h1>
                    </div>
                </div>

                <br />

                <div className='row shadow-simple'>
                    <div className='col-md-12 text-center p-3'>
                        <i className='fas fa-cloud-download-alt icon-size' />
                        <br />
                        <label>CADASTRAR SOFTWARE</label>
                    </div>
                </div>

                <br />

                <div className='row'>
                    <div className='col-md-4'>
                        <input className='form-control' placeholder='Descrição'
                            onChange={e => setItem({ ...item, descricao: e.target.value })}
                            value={item.descricao}
                        />
                    </div>
                    <div className='col-md-4'>
                        <input type='date' className='form-control' placeholder='Data da aquisição'
                            onChange={e => setItem({ ...item, dataAquisicao: e.target.value })}
                            value={item.dataAquisicao}
                        />
                    </div>
                    <div className='col-md-4'>
                        <input className='form-control' placeholder='Licença'
                            onChange={e => setItem({ ...item, licenca: e.target.value })}
                            value={item.licenca}
                        />
                    </div>
                </div>
                <br />

                <div className='row'>
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
                                IsNotNull(hardware) &&
                                hardware.map(hard =>
                                    <option value={hard.id}>{hard.id + ' - ' + hard.tipo + ' ' + hard.modelo}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <br />

                <div className='soft-right-row'>
                    <Link to='software' className='btn btn-danger m-3'>
                        Cancelar
                    </Link>
                    <button onClick={cadastrar} className='btn btn-success m-3'>Salvar</button>
                </div >

            </div >
        </div >
    );
}