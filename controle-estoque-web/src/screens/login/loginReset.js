import React from 'react';

export default function LoginReset() {
    return (
        <div className='login-content'>
            <h2>Esqueci minha senha</h2>

            <br />
            <h5>Insira o e-mail da sua conta</h5>
            <h5>para enviarmos uma nova senha!</h5>
            <br />

            <div className='row login-center'>
                <div className='col-md-3'>
                    <input className='form-control' placeholder='E-mail' />
                </div>
            </div>
            <br />

            <div className='row login-center'>
                <div className='col-md-3'>
                    <button className='btn login-btn'>ENVIAR
                        <i className="fas fa-arrow-right" style={{ marginLeft: '1rem' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}