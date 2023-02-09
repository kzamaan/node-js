/*
 * @Author: Kamruzzaman
 * @Date: 2022-10-16 10:00:10
 * @Last Modified by: Kamruzzaman
 * @Last Modified time: 2023-02-09 12:17:54
 */

const fs = require('fs');
const path = require('path');

const library = {};

library.baseDir = path.join(__dirname, '/../.data/');

// create file
library.create = (dir, file, data, callback) => {
    fs.open(`${library.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });
};

// read data from file
library.read = (dir, file, callback) => {
    fs.readFile(`${library.baseDir}${dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// update existing file
library.update = (dir, file, data, callback) => {
    fs.open(`${library.baseDir}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, (err2) => {
                if (!err2) {
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if (!err3) {
                            fs.close(fileDescriptor, (err4) => {
                                if (!err4) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            });
                        } else {
                            callback('Error writing to existing file');
                        }
                    });
                } else {
                    callback('Error truncating file');
                }
            });
        } else {
            callback('Could not open the file for updating, it may not exist yet');
        }
    });
};

// delete file
library.delete = (dir, file, callback) => {
    fs.unlink(`${library.baseDir}${dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error deleting file');
        }
    });
};

// list all the items in a directory
library.list = (dir, callback) => {
    fs.readdir(`${library.baseDir}${dir}/`, (err, fileNames) => {
        if (!err && fileNames && fileNames.length > 0) {
            const trimmedFileNames = [];
            fileNames.forEach((fileName) => {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(false, trimmedFileNames);
        } else {
            callback('Error reading directory!');
        }
    });
};

module.exports = library;
