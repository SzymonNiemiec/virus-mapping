import React, { useState } from "react";
import QuestionnaireView from "./QuestionnaireView";

const QuestionnaireContainer = () => {
    const [innerCurSlide, setInnerCurSlide] = useState(0);
    return (
        <QuestionnaireView innerCurSlide={innerCurSlide} setInnerCurSlide={setInnerCurSlide} />
    )
}

export default QuestionnaireContainer;