#!/usr/bin/env node

const { Command } = require("commander");
const programm = new Command();
const fs = require("fs");

const PATHTOTEMPLATES = 'D:/Docs/nodejs/template-generator/templates'

programm.version("1.0.0").description("Template generator.");

programm
    .command('generate <template_name> <path_to_template>')
    .alias('g')
    .action( async (templateName, pathToCreateTemplate, cmd) => {
        const templateDir = PATHTOTEMPLATES + '/' + templateName
        if (!fs.existsSync(templateDir)) {
            console.log('This template is not exist.')
            return
        }
        if (!fs.existsSync(pathToCreateTemplate)) {
            console.log('This directory is not exist.')
            return
        }

        await fs.cp(templateDir, pathToCreateTemplate, {recursive: true}, () => {})
    })

programm
    .command('add-template <template_name> <path_to_template>')
    .alias('a')
    .action(async (templateName, pathToGetTemplate, cmd) => {
        const templateDir = PATHTOTEMPLATES + '/' + templateName
        if (fs.existsSync(templateDir)) {
            console.log('This template name already had been added. Please try again with another template name.')
            return
        }
        if (!fs.existsSync(pathToGetTemplate)) {
            console.log('Invalid path to template.')
            return
        }

        fs.mkdirSync(templateDir)

        await fs.cp(pathToGetTemplate, templateDir, {recursive: true}, () => {})
    })

programm
    .command('lsit-templates')
    .alias('l')
    .action((cmd) => {
        fs.readdir(PATHTOTEMPLATES, (err, files) => {
            if (err) throw err;
           
            console.log(files);
          });
    })


programm.parse(process.argv);