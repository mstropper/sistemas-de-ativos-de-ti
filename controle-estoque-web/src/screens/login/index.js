import React, { useState } from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import ApiUsuario from '../../api/usuario';
import { IsNotNull } from '../../common/Validator';
import browserHistory from '../history';

export default function Login() {

    const [login, setLogin] = useState({
        email: '',
        senha: ''
    });

    const entrar = async _ => {
        if (IsNotNull(login) && IsNotNull(login.senha)) {
            const response = await ApiUsuario.postLogin(login);
            console.log(response.data);
            if (IsNotNull(response?.data[0])) {

                setLogin({
                    email: '',
                    senha: ''
                });

                localStorage.setItem('user', JSON.stringify(response.data[0]));
                browserHistory.push('home');
            } else {
                alert('Login inválido.');
            }
        } else {
            alert('Por favor, informe os dados de acesso.');
        }
    }
    return (
        <div className='login-content'>
            <div className='row login-center' >
                <div className='col-md-3'>
                    <input className='form-control' placeholder='Usuário'
                        onChange={e => setLogin({ ...login, email: e.target.value })}
                        value={login.email}
                    />
                </div>
            </div>
            <br />
            <div className='row login-center'>
                <div className='col-md-3'>
                    <input className='form-control' placeholder='Senha'
                        type='password'
                        onChange={e => setLogin({ ...login, senha: e.target.value })}
                        value={login.senha}
                    />
                </div>
            </div>
            <br />
            <div className='row login-center'>
                <div className='col-md-3'>
                    <Link to='loginReset'>Esqueci minha senha</Link>
                </div>
            </div>
            <br />
            <div className='row login-center'>
                <div className='col-md-3'>
                    <button onClick={entrar} className='btn login-btn'>ENTRAR
                        <i className="fas fa-arrow-right" style={{ marginLeft: '1rem' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}