import React, { useState } from "react";

import PickTranslationTemplate from "../templates/PickTranslationTemplate";
import { shuffle } from "../utils";
import data from "../data.json";

const sessionStgAssertedKey = "ltwAsserted";
const sessionStgFailedKey = "ltwFailed";

const getRandomItem = item => {
  let randomItem = data[Math.floor(Math.random() * 100)]; //* Math.floor(data.length))];
  if (item && randomItem.english === item.english) {
    randomItem = getRandomItem(item);
  }

  const { german } = randomItem;
  const audio = new Audio(`./assets/_${german}.ogg__${german}.ogg.mp3`);

  randomItem.children = german;
  randomItem.props = {
    onClick: () => {
      setSelected(german);
      audio.play();
    }
  };
  return randomItem;
};

const getItems = () => {
  const item = getRandomItem();
  const randomItems = [getRandomItem(item), getRandomItem(item), item]; // Enhance it so these two cannot be repeated
  shuffle(randomItems);
  return { input: item.english, correct: item.german, randomItems };
};

const addAssertOrFailed = isAssert => {
  const key = isAssert ? sessionStgAssertedKey : sessionStgFailedKey;
  const current = sessionStorage.getItem(key);
  const val = current === null ? 0 : parseInt(current, 10) + 1;
  sessionStorage.setItem(key, val);
};

const addAsserted = () => {
  addAssertOrFailed(true);
};

const addFailed = () => {
  addAssertOrFailed(false);
};

const getAssertedOrFailedCount = isAssert => {
  const key = isAssert ? sessionStgAssertedKey : sessionStgFailedKey;
  return parseInt(sessionStorage.getItem(key), 10);
};

const getAssertedCount = () => getAssertedOrFailedCount(true);
const getFailedCount = () => getAssertedOrFailedCount(false);

const onNextClick = (selected, correct, setItems, setAsserted, setFailed) => {
  if (selected === correct) {
    addAsserted();
    setAsserted(getAssertedCount() + 1);
  } else {
    addFailed();
    setFailed(getFailedCount() + 1);
  }
  setItems(getItems());
};

let selected = null;

const setSelected = newSelection => {
  selected = newSelection;
};

const PickTranslationPage = props => {
  const [items, setItems] = useState(getItems());
  const [asserts, setAsserted] = useState(getAssertedCount());
  const [fails, setFailed] = useState(getFailedCount());
  const { input, correct, randomItems } = items;

  return (
    <PickTranslationTemplate
      englishWord={input}
      items={randomItems}
      onNextClick={() => {
        onNextClick(selected, correct, setItems, setAsserted, setFailed);
      }}
      asserts={asserts}
      fails={fails}
      {...props}
    />
  );
};

export default PickTranslationPage;
