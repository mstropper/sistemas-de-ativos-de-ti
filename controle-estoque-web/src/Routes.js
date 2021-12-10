import { Router,  Route, Switch } from "react-router-dom";
import browserHistory from './screens/history';

import Login from './screens/login';
import LoginReset from './screens/login/loginReset';
import Home from './screens/home';
import Hardware from './screens/hardware';
import HardwareCadastro from './screens/hardware/hardwareCadastro';
import Software from './screens/software';
import SoftwareCadastro from './screens/software/softwareCadastro';
import Solicitacao from './screens/solicitacao';
import Usuario from './screens/usuario';
import UsuarioCadastro from "./screens/usuario/usuarioCadastro";
import Dash from "./screens/dash";

export default function Routes() {
    return (
        <Router history={browserHistory}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/loginReset" component={LoginReset} />
                <Route path="/home" component={Home} />
                <Route path="/usuario" component={Usuario} />
                <Route path="/hardware" component={Hardware} />
                <Route path="/hardware-cadastro" component={HardwareCadastro} />
                <Route path="/software" component={Software} />
                <Route path="/software-cadastro" component={SoftwareCadastro} />
                <Route path="/solicitacao" component={Solicitacao} />
                <Route path="/usuario-cadastro" component={UsuarioCadastro} />
                <Route path="/dash" component={Dash} />
            </Switch>
        </Router>
    );
}