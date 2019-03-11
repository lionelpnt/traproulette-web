import React from 'react';
import PropTypes from 'prop-types';

export default class Question extends React.Component {

  static propTypes = {
    questionObjet: PropTypes.object.isRequired
  };

  render() {
    const questionObjet = this.props.questionObjet,
          categorie = questionObjet.categorie,
          question = questionObjet.question,
          reponse = questionObjet.reponse,
          sousCategorie = questionObjet.sousCategorie,
          questionNumero = this.props.questionNumero;

    return (
        <div className="container row-centered">
          <div className="row mx-auto">
            <div className="question-horizontal">
              <h3>Question aléatoire n°{ questionNumero }</h3>
              <p>Catégorie : { sousCategorie }<br />
                  Sous catégorie : { categorie }</p>
              <p className="question-interface">{ question }</p>
              <p className="response">
                { reponse }
              </p>
            </div>
          </div>
        </div>
    );
  }

}
