"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const stream_1 = require("stream");
const events_1 = require("events");
const CSV_FILE_PATH = path_1.default.join(__dirname, './input.csv');
const TEXT_FILE_PATH = path_1.default.join(__dirname, './output.txt');
const writeStream = (0, fs_1.createWriteStream)(TEXT_FILE_PATH);
const readStream = (0, fs_1.createReadStream)(CSV_FILE_PATH);
const converter = (0, csvtojson_1.default)({ delimiter: [';', ',', '|'] });
const parseCsvWithPipeline = () => {
    (0, stream_1.pipeline)(readStream, converter, writeStream, (err) => {
        if (err) {
            console.error('Failed to write data txt file', err);
        }
        else {
            console.log('Data successfully wrote to txt file.');
        }
    });
};
const parseCsvWithPipe = () => {
    readStream.pipe(converter).pipe(writeStream);
    writeStream.on('finish', () => {
        console.log('Data successfully wrote to txt file.');
    })
        .on('error', (err) => {
        console.error('Failed to write data txt file', err);
    });
};
const parseCsvWithEvents = () => {
    const eventEmitter = new events_1.EventEmitter();
    (0, csvtojson_1.default)()
        .fromFile(CSV_FILE_PATH)
        .on('data', (data) => {
        eventEmitter.emit('data', data);
    })
        .on('done', () => {
        eventEmitter.emit('done');
    })
        .on('error', (err) => {
        eventEmitter.emit('error', err);
    });
    eventEmitter.on('data', (data) => {
        writeStream.write(data);
    });
    eventEmitter.on('error', (err) => {
        console.error('Failed to write data txt file', err);
    });
    eventEmitter.on('done', () => {
        writeStream.end();
        console.log('Data successfully wrote to txt file.');
    });
};
parseCsvWithEvents();
