import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import Traproulette from './Traproulette';
import Home from './Home';
import TraprouletteProvider from './TraprouletteContext/TraprouletteProvider';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Configuration from './Configuration';


const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER
};

class App extends Component {
  state = {
    questions: [],
    cptQuestions: 0,
    random: [],
    showResponse: true,
    order: 'id',
    showWindowPortal: false,
  }

  render = () => {
    return (
      <Provider template={AlertTemplate} {...options}>
        <TraprouletteProvider>  
          <Route exact path="/" component={Home} />
          <Route path="/traproulette" component={Traproulette} />
          <Route path="/configuration" component={Configuration} />
        </TraprouletteProvider>
      </Provider>
    );
  }
}

export default App;
