import { createReadStream, createWriteStream, appendFileSync } from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const CSV_FILE_PATH = path.join(__dirname, './input.csv');
const TEXT_FILE_PATH = path.join(__dirname, './output.txt')
const writeStream = createWriteStream(TEXT_FILE_PATH);
const readStream = createReadStream(CSV_FILE_PATH);
const converter = csv({ delimiter: [';', ',', '|'] });


const parseCsvWithPipeline = () => {
  pipeline(
    readStream,
    converter, 
    writeStream,
    (err) => {
      if (err) {
        console.error('Failed to write data txt file', err);
      } else {
        console.log('Data successfully wrote to txt file.');
      }
    }
  );
};

const parseCsvWithPipe = () => {
  readStream.pipe(converter).pipe(writeStream);
  writeStream.on('finish', () => {
    console.log('Data successfully wrote to txt file.');
  })
  .on('error', (err: Error) => {
    console.error('Failed to write data txt file', err);
  });
}

parseCsvWithPipeline();
