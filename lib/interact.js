export function interact(questions) {
  process.stdin.setEncoding('utf8');
  return new Promise((resolve) => {
    const answers = [];
    let i = 0;
    let { text, value } = questions[i++];
    console.log(`${text}(${value})`);
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read().slice(0, -1); // 过滤回车
      answers.push(chunk || value);
      const nextQuestion = questions[i++];
      if (nextQuestion) {
        process.stdin.read(); // 返回null并继续监听
        text = nextQuestion.text;
        value = nextQuestion.value;
        console.log(`${text}(${value})`);
      } else {
        resolve(answers);
      }
    })
  })
}
