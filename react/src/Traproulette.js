import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // you used 'react-dom' as 'ReactDOM'
import { Link } from 'react-router-dom'
import ArrowKeysReact from 'arrow-keys-react';

import Question from './Question';
import QuestionDisplay from './QuestionDisplay';
import Alert from './Alert';

import { withTraproulette } from "./TraprouletteContext/withTraproulette";
import ThalieLogo from './ThalieLogo';

import './App.css';

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // true for inline styles
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) { // true for stylesheets loaded from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

class MyWindowPortal extends Component {
  constructor(props) {
    super(props);
    this.containerEl = document.createElement('div'); // STEP 1: create an empty div
    this.externalWindow = null;
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    this.externalWindow.document.body.appendChild(this.containerEl);
    this.externalWindow.document.title = 'Traproulette Affichage';
    copyStyles(document, this.externalWindow.document);
    
    // update the state in the parent component if the user closes the 
    // new window
    this.externalWindow.addEventListener('beforeunload', () => {
      this.props.closeWindowPortal();
    });
  }

  componentWillUnmount() {
    // This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by just closing the window
    this.externalWindow.close();
  }
  
  render() {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }
}

class Traproulette extends Component {
  componentDidMount = () => {
    window.addEventListener('beforeunload', () => {
      this.closeWindowPortal();
    });

    this.getRandomQuestionOrNext();
  }

  toggleWindowPortal = () => {
    this.props.traprouletteContext.setShowWindowPortal(!this.props.traprouletteContext.showWindowPortal);
  }
    
  closeWindowPortal = () => {
    this.props.traprouletteContext.setShowWindowPortal(false);
  }
  
  markQuestionAsError = (idQuestion) => {
    if (!this.props.traprouletteContext.questionsInError.map((x, y) => Number(x.id)).incluces(Number(this.props.traprouletteContext.random[idQuestion].id))) {
      var newErrorArray = this.props.traprouletteContext.questionsInError.slice();
      newErrorArray.push(this.props.traprouletteContext.random[idQuestion]);
      this.props.traprouletteContext.setQuestionsInError(newErrorArray);
    }
  }

  getPreviousRandomQuestion = () => {
    if (this.props.traprouletteContext.cptQuestions > 1) {
      if (!this.props.traprouletteContext.showResponse) {
        this.props.traprouletteContext.setShowResponse(true);
      } 
      let cptQuestionsMinus = this.props.traprouletteContext.cptQuestions - 1;
      this.props.traprouletteContext.setCptQuestions(cptQuestionsMinus);
    }
  }

  getRandomQuestionOrNext = () => {
    if(this.props.traprouletteContext.showResponse) {
      if (this.props.traprouletteContext.cptQuestions === this.props.traprouletteContext.random.length) {
        var randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * this.props.traprouletteContext.questions.length) + 1;
        } while(this.props.traprouletteContext.random.map((x,y) => Number(x.id)).includes(Number(randomNumber)));
    
        var newRandomArray = this.props.traprouletteContext.random.slice();
        newRandomArray.push(this.props.traprouletteContext.questions[randomNumber]);   
        let cptQuestionsPlus = this.props.traprouletteContext.cptQuestions + 1;
        this.props.traprouletteContext.setShowResponse(false);
        this.props.traprouletteContext.setCptQuestions(cptQuestionsPlus);
        this.props.traprouletteContext.setRandom(newRandomArray);

      } else {
        let cptQuestionsPlus = this.props.traprouletteContext.cptQuestions + 1;
        let showResponse = true;
        if (cptQuestionsPlus === this.props.traprouletteContext.random.length) {
          showResponse = false;
        }

        this.props.traprouletteContext.setShowResponse(showResponse);
        this.props.traprouletteContext.setCptQuestions(cptQuestionsPlus);
      }
    } else {
      this.props.traprouletteContext.setShowResponse(true);
    } 
  } 

  render = () => {
    ArrowKeysReact.config({
      left: () => {
        this.getPreviousRandomQuestion();
      },
      right: () => {
        this.getRandomQuestionOrNext();
      }
    });

    return (
      <div {...ArrowKeysReact.events} tabIndex="1" className="app">
        { this.renderContent() }
        {this.props.traprouletteContext.showWindowPortal && (
              <MyWindowPortal closeWindowPortal={this.closeWindowPortal} >
                <QuestionDisplay
                  questionObjet={ this.props.traprouletteContext.random[this.props.traprouletteContext.cptQuestions - 1] }
                  showResponse={ this.props.traprouletteContext.showResponse }
                  questionNumero = { this.props.traprouletteContext.cptQuestions } />
              </MyWindowPortal>
            )}
      </div>
    );
  }

  renderContent = () => {
    const questions = this.props.traprouletteContext.questions;

    if (questions && questions.length && this.props.traprouletteContext.random.length) {
      return (
        <div className="row">
          <div className="col col-lg-3">
            <ThalieLogo 
              className="logo-thalie" />
          </div>
          <div className="col col-lg-9 page">
            <Question
              questionObjet={ this.props.traprouletteContext.random[this.props.traprouletteContext.cptQuestions - 1] }
              showResponse={ this.props.traprouletteContext.showResponse }
              questionNumero = { this.props.traprouletteContext.cptQuestions }
             />

            <div className="row">
              <div className="col-12 text-center">
                <button onClick={ this.getPreviousRandomQuestion } className="btn btn-primary">Précédente question</button>
                <button onClick={ this.getRandomQuestionOrNext } className="btn btn-primary">
                  {this.props.traprouletteContext.showResponse ? 'Prochaine question' : 'Afficher la réponse'}
                </button>
              </div>

              <div className="col-12 text-center">
                <button onClick={() => this.markQuestionAsError(this.props.traprouletteContext.cptQuestions - 1)} className="btn btn-danger">Marquer la question</button>
              </div>

              <div className="col-12 text-center">
                <button onClick={this.toggleWindowPortal} className={"btn " + (this.props.traprouletteContext.showWindowPortal ? 'btn-danger' : 'btn-info')}>
                  {this.props.traprouletteContext.showWindowPortal ? 'Fermer la' : 'Ouvrir la'} fenetre d'affichage
                </button>
              </div>

              <div className="col-12 text-center">
                <Link to="/configuration">Aller à la configuration</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (this.props.traprouletteContext.error) {
      return (
        <Alert error={ this.props.traprouletteContext.error } />
      );
    }
    else {
      return (
        <div>
          <ThalieLogo className="logo-thalie" style={{'height' : '300px'}} />
          Avez-vous bien chargé les questions? <br />
          <div className="loader" />

          <div className="col-12 text-center">
                <Link to="/configuration">Aller à la configuration</Link>
              </div>
        </div>
      );
    }
  }
}

export default withTraproulette(Traproulette);