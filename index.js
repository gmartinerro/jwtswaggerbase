#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const chalk = require('chalk');
const { exec, spawn } = require('child_process');

function command(...args) {
    var child = spawn(...args);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stdout);
    child.on('close', code => {});
}

function createSkeleton(name, withLogin) {
    if (fs.existsSync(name)) throw `Directory "${name}" already exists`;
    //process.chdir(name);

    if (withLogin) {
        fs.copySync(__dirname + '/skeleton/login', name);
    } else {
        fs.copySync(__dirname + '/skeleton/nologin', name);
    }

    console.log(chalk.green('Congratulations! you can now complete your installation by running:\n'));
    console.log(chalk.yellow(`cd ${name} &&  npm init && npm install\n`));
}

program
    .arguments('<name>')
    .option('--login', 'Include login endpoint')
    .action(function(name) {
        try {
            createSkeleton(name, program.login || false);
        } catch (err) {
            console.log(err);
        }
    })
    .parse(process.argv);
