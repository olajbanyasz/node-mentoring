"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseInput2 = exports.reverseInput = void 0;
const readline_1 = require("readline");
const node_process_1 = require("node:process");
const reverseText = (text) => text.split('').reverse().join('');
function reverseInput() {
    const rl = (0, readline_1.createInterface)({ input: node_process_1.stdin, output: node_process_1.stdout, terminal: false });
    rl.question('Please write some text: ', (inputText) => {
        console.log(`Your text is reversed: ${reverseText(inputText)} \n`);
        reverseInput();
    });
}
exports.reverseInput = reverseInput;
function reverseInput2() {
    const rl = (0, readline_1.createInterface)({ input: node_process_1.stdin, terminal: false });
    console.log('Please write some text: ');
    rl.on('line', (inputText) => {
        console.log(`Your text is reversed: \n${reverseText(inputText.toString())} \n`);
        console.log('Please write some text: ');
    });
}
exports.reverseInput2 = reverseInput2;
reverseInput();
