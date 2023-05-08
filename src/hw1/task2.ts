import { createReadStream, createWriteStream, appendFileSync } from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const CSV_FILE_PATH = path.join(__dirname, './input.csv');
const TEXT_FILE_PATH = path.join(__dirname, './output.txt')
const writeStream = createWriteStream(TEXT_FILE_PATH);
const readStream = createReadStream(CSV_FILE_PATH);
const converter = csv({ delimiter: [';', ',', '|'] });
const { EventEmitter } = require('events');

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

const parseCsvWithEvents = () => {
  const eventEmitter = new EventEmitter();

  csv()
    .fromFile(CSV_FILE_PATH)
    .on('data', (data: Buffer) => {
      eventEmitter.emit('data', data);
    })
    .on('done', () => {
      eventEmitter.emit('done');
    })
    .on('error', (err : Error) => {
      eventEmitter.emit('error', err);
    });

  eventEmitter.on('data', (data: string) => {
    writeStream.write(data + '\n');
  });

  eventEmitter.on('error', (err: Error) => {
    console.error('Failed to write data txt file', err);
  });

  eventEmitter.on('done', () => {
    writeStream.end();
    console.log('Data successfully wrote to txt file.');
  });
};

parseCsvWithEvents();
