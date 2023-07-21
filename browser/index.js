import {generate} from "../lib/generator.js";
import {createRandomPicker} from "../lib/random.js";

const defaultCorpus = require('../corpus/data.json');

async function loadCorpus(corpuspath) {
  if (corpuspath) {
    return await (await fetch(corpuspath)).json();
  }
  return defaultCorpus;
}

export {generate, createRandomPicker, loadCorpus};
