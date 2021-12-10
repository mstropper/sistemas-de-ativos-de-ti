import React from "react";
import Routes from "./Routes";
import './App.css';
import { IsNotNull } from './common/Validator';
import browserHistory from './screens/history';

export default class App extends React.Component {

  componentDidMount() {
    this.validLogin();
  }

  validLogin = () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);


    if (IsNotNull(user) && user?.id > 0) {
      browserHistory.push('home');
    } else {
      browserHistory.push('login');
    }
  }

  render() {
    return (
      <div className='App-row'>
        <Routes />
      </div>
    );
  }
};
