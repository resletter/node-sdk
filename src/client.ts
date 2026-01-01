import { ResletterConfig, ApiResponse } from './types';
import { ResletterError } from './error';
import { SubscribersResource } from './resources/subscribers';
import { GroupsResource } from './resources/groups';
import { CampaignsResource } from './resources/campaigns';
import { EventsResource } from './resources/events';

const DEFAULT_BASE_URL = 'https://app.resletter.com';
const DEFAULT_TIMEOUT = 30000;

/**
 * Resletter API Client
 * 
 * @example
 * ```typescript
 * const client = new Resletter('rsl_your_api_key');
 * 
 * // Create a subscriber
 * const subscriber = await client.subscribers.create({
 *   email: 'user@example.com',
 *   name: 'John Doe',
 * });
 * ```
 */
export class Resletter {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly timeout: number;

    /** Subscriber management methods */
    public readonly subscribers: SubscribersResource;

    /** Group management methods */
    public readonly groups: GroupsResource;

    /** Campaign management methods */
    public readonly campaigns: CampaignsResource;

    /** Event tracking methods */
    public readonly events: EventsResource;

    /**
     * Create a new Resletter client
     * 
     * @param apiKey - Your Resletter API key (starts with 'rsl_')
     * @param config - Optional configuration options
     */
    constructor(apiKey: string, config: ResletterConfig = {}) {
        if (!apiKey) {
            throw new Error('API key is required');
        }

        if (!apiKey.startsWith('rsl_')) {
            throw new Error('Invalid API key format. API keys should start with "rsl_"');
        }

        this.apiKey = apiKey;
        this.baseUrl = (config.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
        this.timeout = config.timeout || DEFAULT_TIMEOUT;

        // Initialize resources
        this.subscribers = new SubscribersResource(this);
        this.groups = new GroupsResource(this);
        this.campaigns = new CampaignsResource(this);
        this.events = new EventsResource(this);
    }

    /**
     * Make an API request
     * @internal
     */
    async request<T>(
        method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
        path: string,
        body?: unknown,
        query?: Record<string, string | number | undefined>
    ): Promise<T> {
        const url = new URL(`${this.baseUrl}/api/v1${path}`);

        // Add query parameters
        if (query) {
            Object.entries(query).forEach(([key, value]) => {
                if (value !== undefined) {
                    url.searchParams.set(key, String(value));
                }
            });
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url.toString(), {
                method,
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'resletter-node-sdk/1.0.0',
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json() as ApiResponse<T> | { success: false; error: { message: string; code?: string } };

            if (!response.ok || !data.success) {
                const errorData = data as { success: false; error: { message: string; code?: string } };
                throw new ResletterError(
                    errorData.error?.message || `Request failed with status ${response.status}`,
                    response.status,
                    errorData.error?.code,
                    data
                );
            }

            return (data as ApiResponse<T>).data;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ResletterError) {
                throw error;
            }

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new ResletterError('Request timed out', 408, 'TIMEOUT');
                }
                throw new ResletterError(error.message, 0, 'NETWORK_ERROR');
            }

            throw new ResletterError('An unknown error occurred', 0, 'UNKNOWN');
        }
    }
}
