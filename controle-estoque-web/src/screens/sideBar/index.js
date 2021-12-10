import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import browserHistory from '../history';

export default function SideBar({ page }) {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let user = localStorage.getItem('user');
        user = JSON.parse(user);

        setIsAdmin(user.idGrupoAcesso == 14 ? true : false);
        console.log(user);

    }, []);

    const sair = () => {
        localStorage.setItem('user', null);
        browserHistory.push('/login');
    }

    return (
        <div className='App-side-bar'>
            <Link to='/home'
            >
                <i
                    className="fas fa-home App-menu-icon"
                    style={{ color: page.match(/home/) ? '#000' : '#888' }}
                />
            </Link>
            {isAdmin &&
                <>
                    <Link to='usuario'
                    >
                        <i
                            className="fas fa-user App-menu-icon"
                            style={{ color: page.match(/usuario/) ? '#000' : '#888' }}
                        />
                    </Link>
                    <Link to='hardware'
                    >
                        <i
                            className="fas fa-desktop App-menu-icon"
                            style={{ color: page.match(/hardware/) ? '#000' : '#888' }}
                        />
                    </Link>
                    <Link to='software'
                    >
                        <i
                            className="fas fa-cloud-download-alt App-menu-icon"
                            style={{ color: page.match(/software/) ? '#000' : '#888' }}
                        />
                    </Link>
                    <Link to='dash'
                    >
                        <i
                            className="fas fa-tachometer-alt App-menu-icon"
                            style={{ color: page.match(/dash/) ? '#000' : '#888' }}
                        />
                    </Link>
                </>
            }
            <Link to='solicitacao'
            >
                <i
                    className="fas fa-headset App-menu-icon"
                    style={{ color: page.match(/solicitacao/) ? '#000' : '#888' }}
                />
            </Link>
            <button style={{ border: 'none', backgroundColor: 'rgba(0,0,0,0)' }} onClick={sair}>
                <i
                    className="fas fa-sign-out-alt App-menu-icon"
                />
            </button>
        </div>
    );
}