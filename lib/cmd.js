import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

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
        name: cmdType.title,
        typeLabel: '{underline string}',
        description: '文章的主题'
      },
      {
        name: cmdType.min,
        typeLabel: '{underline number}',
        description: '文章的最小字数'
      },
      {
        name: cmdType.max,
        typeLabel: '{underline number}',
        description: '文章的最大字数'
      },
    ]
  }
]

const options = commandLineArgs(optionDefinitions);
const usage = commandLineUsage(sections);

if (cmdType.help in options) {
  console.log(usage);
  process.exit();
}

export {options};
