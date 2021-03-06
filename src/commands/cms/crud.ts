import {Command, flags} from '@oclif/command'
import Questions from '../../libraries/Questions'
import * as inquirer from 'inquirer'
import Generator from '../../libraries/Generator'
import Helpers from '../../libraries/Helpers'
import Functions from '../../libraries/Functions'

let fs = require('fs');
let ora = require('ora');
const execa = require('execa');
const Listr = require('listr');
var shell = require('shelljs');
const { exec } = require('child_process');
let fsSync = require('fs-sync');
const fsPromises = fs.promises;

const chalk = require('chalk');

const log = console.log;

export default class CmsCrud extends Command {

  args: {[k: string]: any} = {};
  flags: {[k: string]: any} = {};
  inputs: {[k: string]: any} = {};
  spinner: {[k: string]: any} = {};
  repo: string = 'https://github.com/webreinvent/vaahcms-ready';
  target_dir: string = './';
  source_dir: string = '';

  static description = 'Generate CRUD operations for VaahCMS'

  /*
   *---------------------------------------------------
   * Command Flags/Options
   *---------------------------------------------------
   */
  static flags = {
    help: flags.boolean({
      description: 'Generate CRUD operation for VaahCMS',
      default: false,
    }),
  };

  /*
   *---------------------------------------------------
   * Command Arguments
   *---------------------------------------------------
   */
  static args = [];

  /*
   *---------------------------------------------------
   * Command Execution
   *---------------------------------------------------
   */
  async run() {

    let functions = new Functions();
    let is_updates_available = await functions.isUpdatesAvailable();
    if(is_updates_available)
    {
      return true;
    }


    const {args, flags} = this.parse(CmsCrud)

    let questions = new Questions();

    this.inputs = await inquirer.prompt(questions.getCrudQuestions());

    let target = "";
    let source = '\\skeletons\\vaahcms\\crud\\';

    if(this.inputs.for == 'Module')
    {
      this.inputs['namespace'] = 'VaahCms\\Modules\\'+this.inputs.folder_name;
      target = "./VaahCms/Modules/"+this.inputs.folder_name;
    } else if(this.inputs.for == 'Theme')
    {
      this.inputs['namespace'] = 'VaahCms\\Themes\\'+this.inputs.folder_name;
      target = "./VaahCms/Themes/"+this.inputs.folder_name;
    }

    let generator = new Generator(args, flags, this.inputs, source, target);

    log(chalk.green('======================================='));
    log('Generating CRUD Files');
    log(chalk.green('---------------------------------------'));

    const tasks = new Listr([
      {
        title: 'Files Generated for CRUD operations',
        task: function () {
          generator.generateCrudFiles();
        }
      }
    ]);

    let self = this;

    tasks.run().then((ctx: any) => {
      self.successMessage();
    }).catch((err: any) => {
      console.error(err);
    });

  }

  //---------------------------------------------------
  successMessage()
  {
    log(chalk.white.bgGreen.bold("      Files Generated!      "));
    log(chalk.green("=================================================================="));
    log(chalk.green("Following steps:"));
    log("1) Include the laravel router file");
    log("2) Include the vue router file");
    log("3) Include the vue store file");
    log(chalk.green("=================================================================="));

  }

  //---------------------------------------------------
  //---------------------------------------------------


}
