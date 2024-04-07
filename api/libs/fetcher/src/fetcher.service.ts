import { Inject, Injectable } from '@nestjs/common';
import { FetcherOptions, MODULE_OPTIONS_TOKEN } from '@app/fetcher/fetcher.module';

@Injectable()
export class FetcherService {
    constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly options: FetcherOptions) {
        // this.queue = new PQueue({
        //     concurrency: options.concurrency,
        //     interval: 1000 / options.reqsPerSecond,
        //     intervalCap: 1
        // });
    }

    public async fetch(url: string): Promise<string> {
        // const result = await this.queue.add(() => {
        //     return fetch(url).then((res) => res.text());
        // });

        // if (!result) {
        //     throw new Error('Failed to fetch ' + url);
        // }

        // return result;

        return url;
    }

    public async fetchMany(
        urls: string[],
        onFetch?: (url: string, res: string) => void
    ): Promise<string[]> {
        return Promise.all(urls.map((url) =>
            this.fetch(url).then((res) => {
                if (onFetch) {
                    onFetch(url, res);
                }
                return res;
            })
        ));
    }
}
