import React, { useEffect, useState } from 'react';
import SideBar from '../sideBar';
import ApiSolicitacao from '../../api/solicitacao';
import { Doughnut, Bar } from 'react-chartjs-2';
import { IsNotNull } from '../../common/Validator';
import './styles.css';

export default function Dash() {

    const [dados, setDados] = useState(null);

    const [dataChart, setDataChart] = useState(
        {
            valores: [],
            labels: [],
        }
    );
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async _ => {
        const responseDados = await ApiSolicitacao.getIndicadores();
        const responseIndicadores = await ApiSolicitacao.getCadastrados();

        const charValuesTemp = [];
        const charLabelTemp = [];

        await responseIndicadores.data.map(indic => {
            charValuesTemp.push(indic.total);
            charLabelTemp.push(indic.mes + '/' + indic.ano + ': ' + indic.total);
        });

        console.log(dataChart);

        setDataChart({
            valores: charValuesTemp,
            labels: charLabelTemp,
        })

        console.log(dataChart);


        await setDados(responseDados.data[0]);
    }

    return (
        <div className='App-container'>
            <SideBar page={'dash'} />
            <div className='container-fluid p-5'>
                <h1>Dashboard</h1>
                <br /> <br />
                {IsNotNull(dados) &&
                    <>
                        <div className='row'>
                            <div className='col-md-6 chart-col-center'>

                                <div className='chart'>
                                    <Doughnut data={{
                                        labels: [`Software atribuído: ${dados.softAtribuido}`, `Software não atribuído: ${dados.softEstoque}`],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [dados.softAtribuido, dados.softEstoque],
                                                backgroundColor: [
                                                    'rgb(168,205,109)',
                                                    'rgb(130,179,89)',
                                                ],
                                                borderColor: [
                                                    'rgb(140,180,89)',
                                                    'rgb(110,150,60)',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                            <div className='col-md-6 chart-col-center'>
                                <div className='chart'>
                                    <Doughnut data={{
                                        labels: [`Hardware atribuído: ${dados.hardAtribuido}`, `Hardware não atribuído: ${dados.hardEstoque}`],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [dados.hardAtribuido, dados.hardEstoque],
                                                backgroundColor: [
                                                    'rgb(168,205,109)',
                                                    'rgb(130,179,89)',
                                                ],
                                                borderColor: [
                                                    'rgb(140,180,89)',
                                                    'rgb(110,150,60)',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>

                        </div>

                        <br /> <br /> <br /> <br />

                        <div className='row'>
                            <div className='col-md-6 chart-col-center'>

                                <div className='chart'>
                                    <Doughnut data={{
                                        labels: [`Solicitações abertas: ${dados.solicitacaoAberta}`, `Solicitações fechadas: ${dados.solicitacaoFechada}`],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [dados.solicitacaoAberta, dados.solicitacaoFechada],
                                                backgroundColor: [
                                                    'rgb(168,205,109)',
                                                    'rgb(130,179,89)',
                                                ],
                                                borderColor: [
                                                    'rgb(140,180,89)',
                                                    'rgb(110,150,60)',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} />
                                </div>
                            </div>
                            <div className='col-md-6  chart-col-center' >

                                <div className='chart' style={{height:'30rem',width:'30rem'}}>
                                    <Bar data={{
                                        labels: dataChart.labels,
                                        datasets: [
                                            {
                                                label: `Usuarios ativos ${dados.usuariosCadastrados}`,
                                                data: dataChart.valores,
                                                backgroundColor: ['rgb(82,90,217)'],
                                                borderColor: ['rgb(82,90,217)'],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}