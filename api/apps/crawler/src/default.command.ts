import {
    CommandRunner,
    RootCommand,
    Option,
    CliUtilityService
} from 'nest-commander';
import { InvalidArgumentError } from 'commander';
import { Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export interface GlobalOptions {
    throttle: number;
    parallelReq: number;
}

@RootCommand({
    name: 'restat-crawler',
    description: 'Crawler for restat'
})
export class DefaultCommand extends CommandRunner {
    private readonly logger = new Logger(DefaultCommand.name);

    constructor(
        private readonly utilityService: CliUtilityService,
        @InjectQueue('crawler_jobs') private readonly jobQueue: Queue
    ) {
        super();
    }

    async run(): Promise<void> {
        await this.jobQueue.add({ url: 'https://www.google.com' });

        for (;;) {
            await new Promise((resolve) => setTimeout(resolve, 60000));
        }
    }

    @Option({
        flags: '-t, --throttle <throttle>',
        description: 'Max requests per second',
        defaultValue: 5
    })
    parseThrottle(val: string) {
        const throttle = this.utilityService.parseInt(val);
        if (isNaN(throttle)) {
            throw new InvalidArgumentError('Throttle must be a number');
        } else if (throttle < 1) {
            throw new InvalidArgumentError('Throttle must be at least 1');
        }
        return throttle;
    }

    @Option({
        flags: '-r, --parallel-req <requests>',
        description: 'Number of parallel requests',
        defaultValue: 1
    })
    parseRequests(val: string) {
        const requests = this.utilityService.parseInt(val);
        if (isNaN(requests)) {
            throw new InvalidArgumentError('Requests must be a number');
        } else if (requests < 1) {
            throw new InvalidArgumentError('Requests must be at least 1');
        }
        return requests;
    }
}
