import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withAlert } from 'react-alert';
import SvgBrouettechan from './brouettechan';

import { withTraproulette } from "./TraprouletteContext/withTraproulette";

import './App.css';

class Home extends Component {
  componentDidMount() {
    this.chargeQuestionsFromBase();
  }

  chargeQuestionsFromBase = async () => {
    let res = await axios.get("http://localhost:4000/api/questions");
    let data = await res.data;
    this.props.traprouletteContext.setQuestions(data);
    
    let categories = [], sousCategories = [];
    data.forEach(question => {
        if (categories.indexOf(question.categorie) === -1) {
          categories.push(question.categorie);
        }

        if (sousCategories.indexOf(question.sousCategorie) === -1) {
          sousCategories.push(question.sousCategorie);
        }

        categories.sort((a, b) => a.id - b.id);
        sousCategories.sort((a, b) => a.id - b.id);
    });

    this.props.traprouletteContext.setCategories(categories);
    this.props.traprouletteContext.setSousCategories(sousCategories);
    this.props.alert.success('succès lors de l\'import des questions');
  };

  render = () => {
    return (
      <div>
        <SvgBrouettechan style={{
          width: '100px'
        }}/>
        <h2>Traproulette</h2> 
        <br />
        <Link to="/traproulette">Traproulette jeu</Link>
      </div>
    );
  }
}

export default withTraproulette(withAlert()(Home));
