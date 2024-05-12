import React from "react";
import "../styles/illlustration.scss";

interface illustration {
  Element: React.FunctionComponent<any>;
}
function Illustration({ Element }: illustration) {
  return <Element className="illustration" />;
}

export default Illustration;
