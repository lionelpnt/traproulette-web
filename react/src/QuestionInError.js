import React, { Component } from 'react';

/* eslint-disable import/extensions, import/no-unresolved, import/no-extraneous-dependencies */
import {
Input,
Row,
Select,
Textarea,
Form,
} from 'formsy-react-components';

class QuestionInError extends Component {
  categories = [];
  souscategories = [];

  constructor(props) {
    super(props);

    this.categories = this.props.categories.map(function(categorie, i) {
      return {"value" : categorie, "label" : categorie};
    });

    this.souscategories = this.props.sousCategories.map(function(souscategorie, i) {
      return {"value" : souscategorie, "label" : souscategorie};
    });
  }

  componentDidMount() {
    this.handleReset();
  }
  handleReset = () => {
    this.formsyForm.formsyForm.reset(this.props.question);
  }

  resetForm = () => {
      console.log('Reset called'); // eslint-disable-line no-console
      this.formsyForm.reset();
  };

  submitForm = (data) => {
      console.log(data); // eslint-disable-line no-console
  };

  refCallback = (form) => {
      this.myform = form;
  };

  legend = (str) => (
      <legend className="pb-2 mt-4 mb-3 border-bottom">{str}</legend>
  );

  render = () => {
    return (
        <Form
          onSubmit={this.props.sendQuestion}
          layout='horizontal'
          className="custom-classname-is-rendered"
          validatePristine={false}
          disabled={this.props.disabledChoice}
          ref={(formsyForm) => { this.formsyForm = formsyForm; }}>
        <fieldset>  
          <Input name="id" value="1" type="hidden" />
          {this.legend('Catégorie')}
          <Select
            name="categorie"
            label="Catégorie"
            options={this.categories}
            required
          />

          {this.legend('Nouvelle catégorie')}
          <Input
            name="newcategorie"
            id="newcategorie"
            value=""
            label="Nouvelle catégorie"
            type="text"
            placeholder="Nouvelle catégorie de la question si nécessaire."
          />
          
          {this.legend('Question')}
          <Textarea
            name="question"
            id="question"
            value=""
            label="Question"
            type="text"
            placeholder="L'intitulé de la question."
            required
          />

          {this.legend('Réponse')}
          <Textarea
            name="reponse"
            id="reponse"
            value=""
            label="Réponse"
            type="text"
            placeholder="L'intitulé de la réponse."
            required
          />

          {this.legend('Sous catégorie')}
          <Select
            name="sousCategorie"
            label="Sous catégorie"
            options={this.souscategories}
            required
          />

          {this.legend('Nouvelle sous catégorie')}
          <Input
            name="newsousCategorie"
            id="newsousCategorie"
            value=""
            label="Nouvelle sous catégorie"
            type="text"
            placeholder="La nouvelle sous catégorie, si nécessaire."
          />
        </fieldset>
        <fieldset>
            <Row layout='horizontal'>
            <input
                className="btn btn-secondary"
                onClick={this.resetForm}
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
    );
  }
};

export default QuestionInError;