import type { Resletter } from '../client';
import type {
    Subscriber,
    ListSubscribersParams,
    ListSubscribersResponse,
    CreateSubscriberParams,
    CreateSubscriberResponse,
    CreateBulkSubscribersParams,
    CreateBulkSubscribersResponse,
    UpdateSubscriberParams,
    DeleteSubscriberOptions,
} from '../types';

/**
 * Subscriber management resource
 */
export class SubscribersResource {
    constructor(private readonly client: Resletter) { }

    /**
     * List subscribers with optional filtering and pagination
     * 
     * @example
     * ```typescript
     * const { subscribers, pagination } = await client.subscribers.list({
     *   page: 1,
     *   limit: 50,
     *   status: 'subscribed',
     * });
     * ```
     */
    async list(params: ListSubscribersParams = {}): Promise<ListSubscribersResponse> {
        return this.client.request<ListSubscribersResponse>('GET', '/subscribers', undefined, {
            page: params.page,
            limit: params.limit,
            status: params.status,
            groupId: params.groupId,
            email: params.email,
        });
    }

    /**
     * Get a subscriber by ID
     * 
     * @param id - Subscriber ID
     */
    async get(id: string): Promise<Subscriber> {
        return this.client.request<Subscriber>('GET', `/subscribers/${id}`);
    }

    /**
     * Create a new subscriber
     * 
     * @example
     * ```typescript
     * const subscriber = await client.subscribers.create({
     *   email: 'user@example.com',
     *   name: 'John Doe',
     *   metadata: { source: 'website' },
     *   groupIds: ['group-uuid'],
     *   bypassDoubleOptIn: true,
     * });
     * ```
     */
    async create(params: CreateSubscriberParams): Promise<CreateSubscriberResponse> {
        return this.client.request<CreateSubscriberResponse>('POST', '/subscribers', params);
    }

    /**
     * Create multiple subscribers at once (max 1000)
     * 
     * @example
     * ```typescript
     * const result = await client.subscribers.createBulk({
     *   subscribers: [
     *     { email: 'user1@example.com', name: 'User 1' },
     *     { email: 'user2@example.com', name: 'User 2' },
     *   ],
     *   groupIds: ['group-uuid'],
     *   skipDuplicates: true,
     * });
     * ```
     */
    async createBulk(params: CreateBulkSubscribersParams): Promise<CreateBulkSubscribersResponse> {
        return this.client.request<CreateBulkSubscribersResponse>('POST', '/subscribers/bulk', params);
    }

    /**
     * Update a subscriber
     * 
     * @param id - Subscriber ID
     * @param params - Fields to update
     */
    async update(id: string, params: UpdateSubscriberParams): Promise<Subscriber> {
        return this.client.request<Subscriber>('PATCH', `/subscribers/${id}`, params);
    }

    /**
     * Delete or unsubscribe a subscriber
     * 
     * @param id - Subscriber ID
     * @param options - Pass `{ hard: true }` to permanently delete instead of unsubscribe
     */
    async delete(id: string, options: DeleteSubscriberOptions = {}): Promise<{ message: string }> {
        const query = options.hard ? { hard: 'true' } : undefined;
        return this.client.request<{ message: string }>('DELETE', `/subscribers/${id}`, undefined, query);
    }
}
