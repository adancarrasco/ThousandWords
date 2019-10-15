/*eslint-disable*/
/// <reference types="Cypress" />

import data from "../../../src/data.json";
context("Actions", () => {
  beforeEach(() => {
    // cy.visit("https://translate.google.com");
    cy.visit("http://localhost:3001/");
  });

  it(".type() - type into a DOM element", () => {
    const internalData = [
      {
        german: "wie",
        english: "as"
      }
    ];
    // internalData.map(i => {
    //   cy.get("#source").clear();
    //   cy.get("#source").type(i.german);
    //   cy.wait(2000);
    //   cy.get(".src-tts.jfk-button > .jfk-button-img").click();
    //   cy.wait(3000);
    // });
  });

  it("right clicks iframe to download thing", () => {
    // cy.visit("http://localhost:3001/");
    cy.wait(2000);
    cy.get("iframe").then(function($iframe) {
      //   debugger;
      // query into the iframe
      var b = $iframe.contents().find("body");

      // you can work with this element here but it cannot
      // be returned

      b.trigger("contextmenu");

      return null;
    });
  });

  it("download a file", () => {
    // cy.fixture(
    //   "https://translate.google.com/translate_tts?ie=UTF-8&q=war&tl=en&total=1&idx=0&textlen=3&tk=129339.483021&client=webapp&prev=input",
    //   "base64"
    // ).then(mp3 => {
    //   const uri = "data:audio/mp3;base64," + mp3;
    //   const audio = new Audio(uri);
    //   audio.play();
    // });
    // cy.get("video").trigger("contextmenu");
  });
});
