import React, { useEffect, useState } from 'react';
import './styles.css';
import { ApiHardware } from '../../api/hardware';
import { ApiSoftware } from '../../api/software';
import { IsNotNull } from '../../common/Validator';

export default function SoftwareEdicao({ dataItem, refresh }) {

    const [item, setItem] = useState({
        id: 0,
        descricao: '',
        dataAquisicao: '',
        licenca: '',
        atribuir: 0,
        tag: ''
    });

    const [hardware, setHardware] = useState(null);

    useEffect(() => {
        setItem(dataItem);
        loadHardware();
    }, []);

    const loadHardware = async _ => {
        const response = await ApiHardware.getAll();
        setHardware(response.data);
    }

    const editar = async _ => {
        await ApiSoftware.put(item);

        setItem({
            id: 0,
            descricao: '',
            dataAquisicao: '',
            licenca: '',
            atribuir: 0,
            tag: ''
        });

        await refresh();
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
                            <h1>Software</h1>
                        </div>
                    </div>

                    <br />

                    <div className='row shadow-simple'>
                        <div className='col-md-12 text-center p-3'>
                            <i className='fas fa-cloud-download-alt icon-size' />
                            <br />
                            <label>EDITAR SOFTWARE</label>
                        </div>
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col-md-4'>
                            <input className='form-control'
                                value={'Software ID: ' + item.id}
                            />
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
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={editar} data-dismiss="modal">Salvar</button>
                    </div>
                </div >
            </div >
        </div >
    );
}