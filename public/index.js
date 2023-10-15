"use strict";

(function() {

  // MODULE GLOBAL VARIABLES, CONSTANTS, AND HELPER FUNCTIONS CAN BE PLACED HERE

  /**
   * Add a function that will be called when the window is loaded.
   */
  window.addEventListener("load", init);

  /**
   * CHANGE: Describe what your init function does here.
   */
  function init() {
    keyClick();
    octaves();
    document.addEventListener("keydown", control);
  }

  function octaves() {
    id("up").addEventListener("click", upOct);
    id("down").addEventListener("click", downOct);
  }

  function upOct() {
    console.log(qs("#octave p").innerHTML);
    if (qs("#octave p").innerHTML === "Low") {
      qs("#octave p").innerHTML = "Mid";
    } else if (qs("#octave p").innerHTML === "Mid") {
      qs("#octave p").innerHTML = "High";
    }
  }

  function downOct() {
    console.log(qs("#octave p").innerHTML);
    if (qs("#octave p").innerHTML === "High") {
      qs("#octave p").innerHTML = "Mid";
    } else if (qs("#octave p").innerHTML === "Mid") {
      qs("#octave p").innerHTML = "Low";
    }
  }

  function control(event) {
    if (event.keyCode === 65) {
      id("c").click();
    } else if (event.keyCode === 87) {
      id("c-").click();
    } else if (event.keyCode === 83) {
      id("d").click();
    } else if (event.keyCode === 69) {
      id("d-").click();
    } else if (event.keyCode === 68) {
      id("e").click();
    } else if (event.keyCode === 70) {
      id("f").click();
    } else if (event.keyCode === 84) {
      id("f-").click();
    } else if (event.keyCode === 71) {
      id("g").click();
    } else if (event.keyCode === 89) {
      id("g-").click();
    } else if (event.keyCode === 72) {
      id("a").click();
    } else if (event.keyCode === 85) {
      id("a-").click();
    } else if (event.keyCode === 74) {
      id("b").click();
    }
  }

  function keyClick() {
    let allKeys = qsa("#piano > div");
    console.log(allKeys);
    allKeys.forEach(addClick);
  }

  function addClick(key) {
    key.addEventListener("click", playSound);
  }

  function playSound() {
    let audioFile = this.id.substring(0, 1).toUpperCase();
    if (this.id.length === 2) {
      audioFile += "_";
    }
    audioFile += id("instruments").value + ".wav";
    console.log(audioFile);
    let note = gen("audio");
    note.src = "audio/" + audioFile;
    note.volume = id("volume").value;
    note.play();
    this.classList.add("played");
    setTimeout(() => {
      this.classList.remove("played");
    }, 250);
  }

  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Note: You may use these in your code, but remember that your code should not have
   * unused functions. Remove this comment in your own code.
   */

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Checks status from API response and throws error if needed   *
   * @param {Response} res - response from API
   * @returns {Response} response from API
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }
})();