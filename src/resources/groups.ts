import type { Resletter } from '../client';
import type {
    SubscriberGroup,
    CreateGroupParams,
    UpdateGroupParams,
    AddSubscribersToGroupParams,
    RemoveSubscribersFromGroupParams,
    AddSubscribersToGroupResponse,
    RemoveSubscribersFromGroupResponse,
} from '../types';

/**
 * Group management resource
 */
export class GroupsResource {
    constructor(private readonly client: Resletter) { }

    /**
     * List all subscriber groups
     */
    async list(): Promise<SubscriberGroup[]> {
        return this.client.request<SubscriberGroup[]>('GET', '/groups');
    }

    /**
     * Get a group by ID
     * 
     * @param id - Group ID
     */
    async get(id: string): Promise<SubscriberGroup> {
        return this.client.request<SubscriberGroup>('GET', `/groups/${id}`);
    }

    /**
     * Create a new group
     * 
     * @example
     * ```typescript
     * const group = await client.groups.create({
     *   name: 'Product Updates',
     *   description: 'Subscribers interested in product news',
     *   color: '#3B82F6',
     * });
     * ```
     */
    async create(params: CreateGroupParams): Promise<SubscriberGroup> {
        return this.client.request<SubscriberGroup>('POST', '/groups', params);
    }

    /**
     * Update a group
     * 
     * @param id - Group ID
     * @param params - Fields to update
     */
    async update(id: string, params: UpdateGroupParams): Promise<SubscriberGroup> {
        return this.client.request<SubscriberGroup>('PATCH', `/groups/${id}`, params);
    }

    /**
     * Delete a group
     * 
     * @param id - Group ID
     */
    async delete(id: string): Promise<{ message: string }> {
        return this.client.request<{ message: string }>('DELETE', `/groups/${id}`);
    }

    /**
     * Add subscribers to a group
     * 
     * @param groupId - Group ID
     * @param params - Subscriber IDs to add
     */
    async addSubscribers(groupId: string, params: AddSubscribersToGroupParams): Promise<AddSubscribersToGroupResponse> {
        return this.client.request<AddSubscribersToGroupResponse>('POST', `/groups/${groupId}/subscribers`, params);
    }

    /**
     * Remove subscribers from a group
     * 
     * @param groupId - Group ID
     * @param params - Subscriber IDs to remove
     */
    async removeSubscribers(groupId: string, params: RemoveSubscribersFromGroupParams): Promise<RemoveSubscribersFromGroupResponse> {
        return this.client.request<RemoveSubscribersFromGroupResponse>('DELETE', `/groups/${groupId}/subscribers`, params);
    }
}
