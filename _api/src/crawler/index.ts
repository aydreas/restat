import { Command } from '@commander-js/extra-typings';

const program = new Command();

program
    .name('restat-crawler')
    .description('Crawler for Restat project');

program.command('test')
    .action(() => {
        console.log('Test command');
    });

program.parse();
