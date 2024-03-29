import React from 'react';
import PropTypes, { string } from 'prop-types';
import ThalieLogo from './ThalieLogo';
import SvgBrouettechan from './brouettechan';
import FitText from '@kennethormandy/react-fittext';

export default class QuestionDisplay extends React.Component {

  static propTypes = {
    questionObjet: PropTypes.object.isRequired,
    showResponse: PropTypes.bool.isRequired
  };


  render() {
    const questionObjet = this.props.questionObjet,
          categorie = questionObjet.categorie,
          question = questionObjet.question,
          reponse = questionObjet.reponse,
          // sousCategorie = questionObjet.sousCategorie,
          showResponse = this.props.showResponse,
          questionNumero = this.props.questionNumero;

    return (
      <div style={{'height' : '100%'}}>
        <div className="logo-thalie-display"> 
          <ThalieLogo 
            className="logo-thalie-absolute" />
        </div>
        <div className="container">
            <div className="row intitule w-100">
              <div className="col-8 mt-auto">
                N° { questionNumero } : <i> { categorie } </i>
              </div>
              <div className="col-4 mt-auto float-right">
                <SvgBrouettechan 
                  className="brouettechan"/> 
              </div>
            </div>

            <div className="row question">
              <FitText>
                { question }
              </FitText>

              <div className="row mt-auto ml-auto">
                {showResponse ? (
                    <FitText>
                      <React.Fragment>
                      <p className="response-display">Réponse : {reponse}</p>
                      </React.Fragment>
                    </FitText>
                  ) : '' }
              </div>
            </div>

            
        </div>
      </div>
    );
  }

}
