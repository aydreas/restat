import { MarketplaceProvider } from '../marketplace-provider.js';
import { Fetcher } from '../../libs/fetcher.js';

export class Geizhals extends MarketplaceProvider {
    private static readonly BASE_URL = 'https://geizhals.eu';

    constructor(private readonly fetcher: Fetcher) {
        super();
    }
}
