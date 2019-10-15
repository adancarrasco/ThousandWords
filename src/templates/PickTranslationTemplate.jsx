import React, { useState } from "react";

import Button from "../atoms/Button";
import ButtonSet from "../molecules/ButtonSet";
import Modal from "../organisms/Modal";

const PickTranslation = ({
  items,
  englishWord,
  onNextClick,
  asserts,
  fails
}) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <h3>{englishWord}</h3>
      <ButtonSet items={items}></ButtonSet>
      <Button onClick={onNextClick}>Next</Button>
      <Button onClick={() => setIsShown(!isShown)}>Show score</Button>
      <Modal isShown={isShown} setIsShown={setIsShown} header="Score">
        <p>Asserts: {asserts}</p>
        <p>Fails: {fails}</p>
      </Modal>
    </div>
  );
};

export default PickTranslation;
