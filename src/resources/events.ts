import type { Resletter } from '../client';
import type { TrackEventParams, TrackEventResponse } from '../types';

/**
 * Event tracking resource
 */
export class EventsResource {
    constructor(private readonly client: Resletter) { }

    /**
     * Track a custom event to trigger automations
     * 
     * @example
     * ```typescript
     * const result = await client.events.track({
     *   name: 'purchase_completed',
     *   email: 'user@example.com',
     *   data: {
     *     product: 'Premium Plan',
     *     amount: 99.00,
     *   },
     * });
     * 
     * console.log(`Triggered ${result.automationsTriggered} automations`);
     * ```
     */
    async track(params: TrackEventParams): Promise<TrackEventResponse> {
        if (!params.subscriberId && !params.email) {
            throw new Error('Either subscriberId or email is required');
        }

        return this.client.request<TrackEventResponse>('POST', '/events', params);
    }
}
