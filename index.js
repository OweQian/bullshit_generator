import {readFileSync, existsSync, mkdirSync, writeFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import {generate} from './lib/generator.js';
import {createRandomPicker} from './lib/random.js';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage'
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cmdType = {
  title: 'title',
  min: 'min',
  max: 'max',
  help: 'help',
}

const optionDefinitions = [{
  name: cmdType.help,
}, {
  name: cmdType.title,
  type: String,
}, {
  name: cmdType.min,
  type: Number,
}, {
  name: cmdType.max,
  type: Number,
}]

const sections = [
  {
    header: '仿狗屁不通文章生成器',
    content: '生成随机的文章段落用于测试'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'title',
        typeLabel: '{underline string}',
        description: '文章的主题'
      },
      {
        name: 'min',
        typeLabel: '{underline number}',
        description: '文章的最小字数'
      },
      {
        name: 'max',
        typeLabel: '{underline number}',
        description: '文章的最大字数'
      },
    ]
  }
]

function loadCorpus(src) {
  const path = resolve(__dirname, src);
  const data = readFileSync(path, {encoding: 'utf-8'});
  return JSON.parse(data);
}

function saveToFile(title, article) {
  const outputDir = resolve(__dirname, 'output');
  const time = moment().format('|YYYY-MM-DD|HH:mm:ss');
  const outputFile = resolve(outputDir, `${title}${time}.txt`);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir);
  }
  const text = `${title}\n\n    ${article.join('\n    ')}`;
  writeFileSync(outputFile, text);
  return outputFile;
}

const corpus = loadCorpus('corpus/data.json');
const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(sections);
if (cmdType.help in options) {
  console.log(usage);
} else {
  const title = options.title || createRandomPicker(corpus.title)();
  const article = generate(title, {corpus, ...options});
  const output = saveToFile(title, article);
  console.log(`生成成功！文章保存于：${output}`);
}

