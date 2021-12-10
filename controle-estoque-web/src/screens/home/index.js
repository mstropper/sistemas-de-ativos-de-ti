import React from 'react';
import SideBar from '../sideBar';

export default function Home() {
    return (
        <div className='App-container'>
            <SideBar page={'home'} />
            <div className='container'>
                <div className='col text-center'>
                    <br />
                    <h1>Bem vindo!</h1>
                    <br />
                    <h3>Selecione um item no menu lateral.</h3>
                </div>
            </div>
        </div>
    );
}