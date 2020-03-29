import React, { useState } from "react";
import QuestionnaireView from "./QuestionnaireView";

const QuestionnaireContainer = () => {
  const [innerCurSlide, setInnerCurSlide] = useState(0);
  const [isContactPeopleModalOn, setContactPeopleModal] = useState(false);
  return (
    <QuestionnaireView
      innerCurSlide={innerCurSlide}
      setInnerCurSlide={setInnerCurSlide}
      setContactPeopleModal={setContactPeopleModal}
      isContactPeopleModalOn={isContactPeopleModalOn}
    />
  );
};

export default QuestionnaireContainer;
