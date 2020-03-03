import * as React from "react";
import { TraprouletteContext } from "./traproulette-context";
export function withTraproulette(Component) {
  return function TraprouletteComponent(props) {
    return (
      <TraprouletteContext.Consumer>
        {contexts => <Component {...props} {...contexts} />}
      </TraprouletteContext.Consumer>
    );
  };
}
