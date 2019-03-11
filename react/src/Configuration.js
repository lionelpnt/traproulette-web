import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { checkAuth, load, updateCell } from './helpers/spreadsheet';
import { withTraproulette } from './TraprouletteContext/withTraproulette';
import { withAlert } from 'react-alert';
import QuestionInError from './QuestionInError';

import {
  CheckboxGroup,
  Form,
  Row,
  } from 'formsy-react-components';
  

class Configuration extends Component {
  state = {
    authenticated: false
  }
  categories = [];
  souscategories = [];
  actualCategories = [];
  actualSousCategories = [];

  constructor(props) {
    super(props);
    this.chargerCategories();
  }

  authenticate = (e) => {
    e.preventDefault();
    window.gapi.load('client', () => {
      checkAuth(false, this.handleAuth.bind(this));
    });
  }

  handleAuth = (authResult) => {
    if (authResult && !authResult.error) {
      this.setState({
        authenticated: true
      });

      load(this.onLoad.bind(this));
    } else {
      this.setState({
        authenticated: false
      });
    }
  }

  onLoad = async (data, error) => {
    if (data) {
      let questionsSorted = data.questions.sort((a, b) => a.id - b.id);

      await this.deleteQuestionsFromBase();
      await this.postQuestionsOnBase(questionsSorted);
      await this.chargeQuestionsFromBase();
    }
    else {
      this.props.alert.error('Erreur lors du chargement des questions.');
    }
  }

  chargeQuestionsFromBase = async () => {
    let res = await axios.get("http://localhost:4000/api/questions");
    let data = await res.data;
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

    this.props.traprouletteContext.setQuestions(data);
    this.props.traprouletteContext.setCategories(categories);
    this.props.traprouletteContext.setSousCategories(sousCategories);
    this.props.alert.success('succès lors de l\'import des questions');
  };

  deleteQuestionsFromBase = async () => {
    await axios.delete("http://localhost:4000/api/questions/all");
    this.props.alert.success('succès lors de la suppression des questions de la base');
  };

  postQuestionsOnBase = async (questionsSorted) => {
    await axios.post("http://localhost:4000/api/questions", questionsSorted);
    this.props.alert.success('succès lors du post en base des questions');
  };

  putQuestionOnBase = async (question) => {
    await axios.put("http://localhost:4000/api/questions/" + question.id, question);
    this.props.alert.success('succès lors du post en base de la question');
  }

  sendQuestion = (dataFromChild) => {
    var questionArrayToSend = [
      dataFromChild.newcategorie === '' ? dataFromChild.categorie : dataFromChild.newcategorie,
      dataFromChild.question,
      dataFromChild.reponse,
      dataFromChild.newsousCategorie === '' ? dataFromChild.sousCategorie : dataFromChild.newsousCategorie
    ];
    
    window.gapi.load('client', () => {
      checkAuth(false, () => {
        updateCell(dataFromChild.id, questionArrayToSend, (data) => {
          this.props.alert.success('update de la question en erreur réussie');
          var question = {};
          question.question = dataFromChild.question;
          question.reponse = dataFromChild.reponse;
          question.id = dataFromChild.id;
          if (dataFromChild.newcategorie === '') {
            question.categorie = dataFromChild.categorie;
          } else {
            question.categorie = dataFromChild.newcategorie;
          }

          if (dataFromChild.newsousCategorie === '') {
            question.sousCategorie = dataFromChild.sousCategorie;
          } else {
            question.sousCategorie = dataFromChild.newsousCategorie;
          }

          this.putQuestionOnBase(question);
          this.props.traprouletteContext.setQuestionsInError(this.props.traprouletteContext.questionsInError.filter( el => el.id !== question.id ));
          this.chargeQuestionsFromBase();
        }, 
        (err) => {
          this.props.alert.error('echec de l\'update de la question en erreur');
          console.log(err);
        });
      });
    });
  }

  filterCategories = (data) => {
    let questionsFiltrees = this.props.traprouletteContext.questions.filter((el) => {
      return data.categories.includes(el.categorie);   
    });

    this.props.traprouletteContext.setQuestions(questionsFiltrees);
  }

  chargerCategories = () => {
    this.props.traprouletteContext.questions.forEach(element => {
      if (this.actualCategories.indexOf(element.categorie) === -1) {
        this.actualCategories.push(element.categorie);
      }

      if (this.actualSousCategories.indexOf(element.sousCategorie) === -1) {
        this.actualSousCategories.push(element.sousCategorie);
      }
    });

    this.actualCategories.sort();
    this.actualSousCategories.sort();

    this.categories = this.props.traprouletteContext.categories.map((categorie, i) => {
      return {"value" : categorie, "label" : categorie};
    });

    this.souscategories = this.props.traprouletteContext.sousCategories.map((souscategorie, i) => {
      return {"value" : souscategorie, "label" : souscategorie};
    });
  }

  filterSousCategories = (data) => {
    let questionsFiltrees = this.props.traprouletteContext.questions.filter((el) => {
      return data.souscategories.includes(el.sousCategorie);   
    });

    this.props.traprouletteContext.setQuestions(questionsFiltrees);
  }

  resetFormCategories = () => {
    this.formsyFormCategories.formsyForm.reset(this.categories);
  }

  resetFormSousCategories = () => {
    this.formsyFormSousCategories.formsyForm.reset(this.souscategories);
  }

  render = () => {
    return (
      <div>
        <h4 className="brand">Configuration</h4>
        <div>
          <button onClick={ this.authenticate } className="btn">Connect with Google</button>
          <button onClick={ this.chargeQuestionsFromBase } className="btn">Charger les questions depuis la base</button>
        </div>

        <div>
          <h5>Catégories</h5>
          <Form
            onSubmit={this.filterCategories}
            className="custom-classname-is-rendered"
            ref={(formsyForm) => { this.formsyFormCategories = formsyForm; }}>
            <fieldset>
            <CheckboxGroup
              name="categories"
              value={this.actualCategories}
              label="Categories"
              options={this.categories}
              />
            </fieldset>
            <fieldset>
              <Row>
                <input
                  className="btn btn-secondary"
                  onClick={this.resetFormCategories}
                  type="reset"
                  defaultValue="Reset"
                />{' '}
                <input
                  className="btn btn-primary"
                  formNoValidate
                  type="submit"
                  defaultValue="Submit"
                />
              </Row>
            </fieldset>
          </Form>
          <h5>Sous catégories</h5>
          <Form
            onSubmit={this.filterSousCategories.bind(this)}
            className="custom-classname-is-rendered"
            ref={(formsyForm) => { this.formsyFormSousCategories = formsyForm; }}>
            <fieldset>
            <CheckboxGroup
              name="souscategories"
              value={this.actualSousCategories}
              label="Sous Categories"
              options={this.souscategories}
              />
            </fieldset>
            <fieldset>
              <Row>
                <input
                  className="btn btn-secondary"
                  onClick={this.resetFormSousCategories}
                  type="reset"
                  defaultValue="Reset"
                />{' '}
                <input
                  className="btn btn-primary"
                  formNoValidate
                  type="submit"
                  defaultValue="Submit"
                />
              </Row>
            </fieldset>
          </Form>
        </div>

        <div>
          { this.props.traprouletteContext.questionsInError.length > 0 ?
            this.props.traprouletteContext.questionsInError.map((question, index) => {
            return <QuestionInError 
                        key={question.id} 
                        question={question}
                        disabledChoice={false}
                        sendQuestion={this.sendQuestion}
                        categories={this.props.traprouletteContext.categories}
                        sousCategories={this.props.traprouletteContext.sousCategories} />;
          }) : <p>Pas d'erreurs!</p>
          }
        </div>

        <Link to="/traproulette">Retour à la Traproulette</Link>
      </div>
    );
  }
}

export default withTraproulette(withAlert()(Configuration));
