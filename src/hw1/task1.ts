import { createInterface, ReadLine } from 'readline';
import { stdin, stdout } from 'node:process';

const reverseText = (text: string): string => text.split('').reverse().join('');

export function reverseInput(): void {
  const rl = createInterface({ input: stdin, output: stdout, terminal: false });
  rl.question('Please write some text: ', (inputText: string): void => {
    console.log(`Your text is reversed: ${reverseText(inputText)} \n`);
    reverseInput();
  });
}

export function reverseInput2(): void {
  const rl: ReadLine = createInterface({ input: stdin, terminal: false });
  console.log('Please write some text: ');
  rl.on('line', (inputText) => {
    console.log(
      `Your text is reversed: \n${reverseText(inputText.toString())} \n`,
    );
    console.log('Please write some text: ');
  });
}

reverseInput();
