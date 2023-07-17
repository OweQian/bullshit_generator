import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
// readFile('./corpus/data.json', {encoding: 'utf-8'}, (err, data) => {
//   if (!err) {
//     console.log(data);
//   } else {
//     console.error(err);
//   }
// });
const url = import.meta.url; // 获取当前脚本文件的url
console.log(import.meta);
const path = resolve(dirname(fileURLToPath(url)), 'corpus/data.json');
const data = readFileSync(path, {encoding: 'utf-8'});
const corpus = JSON.parse(data);
console.log(corpus);
