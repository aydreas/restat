import PQueue from 'p-queue';

export class Fetcher {
    private queue: PQueue;

    constructor(workers: number, maxRequestsPerSecond: number) {
        this.queue = new PQueue({
            concurrency: workers,
            interval: 1000 / maxRequestsPerSecond,
            intervalCap: 1
        });
    }

    public async fetch(url: string): Promise<string> {
        const result = await this.queue.add(() => {
            return fetch(url).then((res) => res.text());
        });

        if (!result) {
            throw new Error('Failed to fetch ' + url);
        }

        return result;
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
