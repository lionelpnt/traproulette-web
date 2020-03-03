import * as React from "react";
export const TraprouletteContext = React.createContext(
  // default values used by a Consumer when it does not have a
  // matching Provider above it in the tree, useful for testing
  {
    traprouletteContext: {
      questions: [],
      setQuestions: () => {},
      cptQuestions: 0,
      setCptQuestions: () => {},
      random: [],
      setRandom: () => {},
      questionsInError: [],
      setQuestionsInError: () => {},
      categories: [],
      setCategories: () => {},
      sousCategories: [],
      setSousCategories: () => {},
      showResponse: true,
      setShowResponse: () => {},
      order: 'id',
      setOrder: () => {},
      showWindowPortal: false,
      setShowWindowPortal: () => {}
    }
  }
);
