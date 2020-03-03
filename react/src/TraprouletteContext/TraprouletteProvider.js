import { TraprouletteContext } from "./traproulette-context";
import * as React from "react";
export default class TraprouletteProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      setQuestions: this.setQuestions.bind(this),
      cptQuestions: 0,
      setCptQuestions: this.setCptQuestions.bind(this),
      random: [],
      setRandom: this.setRandom.bind(this),
      questionsInError: [],
      setQuestionsInError: this.setQuestionsInError.bind(this),
      categories: [],
      setCategories: this.setCategories.bind(this),
      sousCategories: [],
      setSousCategories: this.setSousCategories.bind(this),
      showResponse: true,
      setShowResponse: this.setShowResponse.bind(this),
      order: 'id',
      setOrder: this.setOrder.bind(this),
      showWindowPortal: false,
      setShowWindowPortal: this.setShowWindowPortal.bind(this)
    };
  }

  setQuestions(questions) {
    this.setState({
      questions: questions
    });
  }

  setCptQuestions(cptQuestions) {
    this.setState({
      cptQuestions: cptQuestions
    });
  }

  setRandom(random) {
    this.setState({
      random: random
    });
  }

  setShowResponse(showResponse) {
    this.setState({
      showResponse: showResponse
    });
  }

  setOrder(order) {
    this.setState({
      order: order
    });
  }

  setShowWindowPortal(showWindowPortal) {
    this.setState({
      showWindowPortal: showWindowPortal
    });
  }

  setQuestionsInError(questionsInError) {
    this.setState({
      questionsInError: questionsInError
    });
  }

  setCategories(categories) {
    this.setState({
      categories: categories
    });
  }

  setSousCategories(sousCategories) {
    this.setState({
      sousCategories: sousCategories
    });
  }

  render() {
    return (
      <TraprouletteContext.Provider
        value={{
          traprouletteContext: {
            ...this.state
          }
        }}
      >
        {this.props.children}
      </TraprouletteContext.Provider>
    );
  }
}
