#!/usr/bin/env node

const chalk = require('chalk');

const rl = require('readline');

const randoms = require('@justhxnry/randoms');

// usage function to represent help guide
const usage = function() {
    const usageText = `
    Password Generator in Command Line Interface is fast, secure and customizable.

    usage:
        pwgen
    `;

    console.log(usageText);
};

// log errors with red color
function errorLog(error) {
    const eLog = chalk.red(error);
    console.log(eLog);
};

// log successfull request with white color
function successLog(data) {
    const sLog = chalk.whiteBright(data);
    console.log(sLog);
};

// prompts
function prompt(question) {
    const r = rl.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    return new Promise((resolve, reject) => {
        try {
            r.question(question, answer => {
                r.close();
                resolve(answer);
            });
        } catch (e) {
            reject(e);
        }
    });
};

function main() {
    let q = chalk.blue(`Custom password string: `);
    prompt(q).then(string => {
        if (!string) string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        q = chalk.blue(`Enter password length: `);
        prompt(q).then(dlength => {

            if (!dlength) {
                errorLog(`Password Length is required parameter, recieved null`);
                return usage();
            };

            try {
                length = Number(dlength);

                if (isNaN(length)) {
                    errorLog(`Password Length must be a number, recieved "${dlength}"`);
                    return usage();
                };

                var password = randoms.random(string, length);

                var response = `Your generated password: \n\n ${password}\n`;

                successLog(response);
            } catch (e) {
                errorLog(`Password Length must be a number, recieved "${length}"`);
                return usage();
            }
        });
    })
};
main();