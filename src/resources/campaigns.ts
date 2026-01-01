import type { Resletter } from '../client';
import type {
    Campaign,
    ListCampaignsParams,
    CreateCampaignParams,
    UpdateCampaignParams,
} from '../types';

/**
 * Campaign management resource
 */
export class CampaignsResource {
    constructor(private readonly client: Resletter) { }

    /**
     * List campaigns with optional filtering
     * 
     * @example
     * ```typescript
     * const campaigns = await client.campaigns.list({
     *   status: 'active',
     * });
     * ```
     */
    async list(params: ListCampaignsParams = {}): Promise<Campaign[]> {
        return this.client.request<Campaign[]>('GET', '/campaigns', undefined, {
            status: params.status,
        });
    }

    /**
     * Get a campaign by ID
     * 
     * @param id - Campaign ID
     */
    async get(id: string): Promise<Campaign> {
        return this.client.request<Campaign>('GET', `/campaigns/${id}`);
    }

    /**
     * Create a new campaign
     * 
     * @example
     * ```typescript
     * const campaign = await client.campaigns.create({
     *   name: 'Product Launch Campaign',
     *   description: 'Campaign for new product announcement',
     *   subscriberGroupIds: ['group-1', 'group-2'],
     * });
     * ```
     */
    async create(params: CreateCampaignParams): Promise<Campaign> {
        return this.client.request<Campaign>('POST', '/campaigns', params);
    }

    /**
     * Update a campaign
     * 
     * @param id - Campaign ID
     * @param params - Fields to update
     */
    async update(id: string, params: UpdateCampaignParams): Promise<Campaign> {
        return this.client.request<Campaign>('PATCH', `/campaigns/${id}`, params);
    }

    /**
     * Delete a campaign
     * 
     * Note: Cannot delete campaigns that contain newsletters. Archive them instead.
     * 
     * @param id - Campaign ID
     */
    async delete(id: string): Promise<{ message: string }> {
        return this.client.request<{ message: string }>('DELETE', `/campaigns/${id}`);
    }
}
