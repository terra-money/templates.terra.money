import 'isomorphic-fetch';
import yargs, { Arguments } from 'yargs';
import { get } from './commands/get';
import { home } from './commands/home';
import { search } from './commands/search';

export function run() {
  return yargs
    .command({
      command: 'get',
      describe: 'Get template',
      builder: (argv) =>
        argv
          .example('$0 get <template-id or github-url> <target-directory>', '')
          .example(
            '$0 get smart-contract:basic myapp',
            'Get template by template-id',
          )
          .example(
            '$0 get https://github.com/iamssen/terra-smart-contract-basic myapp',
            'Get template by github-url',
          ),
      handler: ({ _: [, source, targetDirectory] }: Arguments) => {
        if (!source) {
          console.log(
            'Please enter the template-id. for example ( terra-templates get smart-contract:basic myapp )',
          );
          return;
        }

        get({
          source: source.toString(),
          targetDirectory: targetDirectory?.toString(),
        });
      },
    })
    .command({
      command: 'search',
      describe: 'Search templates',
      builder: (argv) =>
        argv
          .example('$0 search <keyword>', '')
          .example('$0 search "contract"', 'Search templates'),
      handler: ({ _: [, ...keywords] }: Arguments) => {
        if (keywords.length > 0) {
          search({
            text: keywords.join(' '),
          });
        } else {
          search({});
        }
      },
    })
    .command({
      command: 'home',
      describe: 'Open https://templates.terra.money',
      builder: (argv) =>
        argv.example('$0 home', 'Open https://templates.terra.money'),
      handler: () => {
        home();
      },
    })
    .wrap(null)
    .help('h')
    .alias('h', 'help')
    .showHelpOnFail(true)
    .demandCommand()
    .recommendCommands()
    .epilog('🚀 Terra templates! https://templates.terra.money').argv;
}
