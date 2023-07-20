// export function interact(questions) {
//   process.stdin.setEncoding('utf8');
//   return new Promise((resolve) => {
//     const answers = [];
//     let i = 0;
//     let { text, value } = questions[i++];
//     console.log(`${text}(${value})`);
//     process.stdin.on('readable', () => {
//       const chunk = process.stdin.read().slice(0, -1); // 过滤回车
//       answers.push(chunk || value);
//       const nextQuestion = questions[i++];
//       if (nextQuestion) {
//         process.stdin.read(); // 返回null并继续监听
//         text = nextQuestion.text;
//         value = nextQuestion.value;
//         console.log(`${text}(${value})`);
//       } else {
//         resolve(answers);
//       }
//     })
//   })
// }

import readline from 'readline';

function question(r1, {text, value}) {
  const q = `${text}(${value})\n`;
  return new Promise(resolve => {
    r1.question(q, answer => {
      resolve(answer || value);
    })
  })
}

export async function interact(questions) {
  // 创建可交互命令行对象
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  const answers = [];
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const answer = await question(r1, q);
    answers.push(answer);
  }
  r1.close();
  return answers;
}
