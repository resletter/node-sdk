// ==================== COMMON TYPES ====================

export interface ResletterConfig {
    baseUrl?: string;
    timeout?: number;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

// ==================== SUBSCRIBER TYPES ====================

export type SubscriberStatus = 'subscribed' | 'pending' | 'unsubscribed' | 'bounced';

export interface Subscriber {
    id: string;
    email: string;
    name: string | null;
    status: SubscriberStatus;
    metadata: Record<string, any>;
    groups: GroupRef[];
    subscribedAt: string | null;
    createdAt: string;
    updatedAt?: string;
}

export interface GroupRef {
    id: string;
    name: string;
}

export interface ListSubscribersParams extends PaginationParams {
    status?: SubscriberStatus;
    groupId?: string;
    email?: string;
}

export interface ListSubscribersResponse {
    subscribers: Subscriber[];
    pagination: Pagination;
}

export interface CreateSubscriberParams {
    email: string;
    name?: string;
    metadata?: Record<string, any>;
    groupIds?: string[];
    bypassDoubleOptIn?: boolean;
}

export interface CreateSubscriberResponse {
    id: string;
    email: string;
    name: string | null;
    status: SubscriberStatus;
    isNew: boolean;
}

export interface BulkSubscriberData {
    email: string;
    name?: string;
    metadata?: Record<string, any>;
}

export interface CreateBulkSubscribersParams {
    subscribers: BulkSubscriberData[];
    groupIds?: string[];
    skipDuplicates?: boolean;
    bypassDoubleOptIn?: boolean;
}

export interface BulkCreateResults {
    created: number;
    skipped: number;
    pending: number;
    errors: string[];
}

export interface CreateBulkSubscribersResponse {
    message: string;
    results: BulkCreateResults;
    bypassedDoubleOptIn: boolean;
}

export interface UpdateSubscriberParams {
    name?: string;
    metadata?: Record<string, any>;
    groupIds?: string[];
}

export interface DeleteSubscriberOptions {
    hard?: boolean;
}

// ==================== GROUP TYPES ====================

export interface SubscriberGroup {
    id: string;
    name: string;
    description: string | null;
    color: string | null;
    subscriberCount: number;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateGroupParams {
    name: string;
    description?: string;
    color?: string;
}

export interface UpdateGroupParams {
    name?: string;
    description?: string;
    color?: string;
}

export interface AddSubscribersToGroupParams {
    subscriberIds: string[];
}

export interface RemoveSubscribersFromGroupParams {
    subscriberIds: string[];
}

export interface AddSubscribersToGroupResponse {
    message: string;
    added: number;
    alreadyInGroup: number;
}

export interface RemoveSubscribersFromGroupResponse {
    message: string;
    removed: number;
}

// ==================== CAMPAIGN TYPES ====================

export type CampaignStatus = 'active' | 'paused' | 'completed' | 'archived';

export interface Campaign {
    id: string;
    name: string;
    description: string | null;
    status: CampaignStatus;
    subscriberGroupIds: string[];
    newsletterCount?: number;
    createdAt: string;
    updatedAt?: string;
}

export interface ListCampaignsParams {
    status?: CampaignStatus;
}

export interface CreateCampaignParams {
    name: string;
    description?: string;
    subscriberGroupIds?: string[];
}

export interface UpdateCampaignParams {
    name?: string;
    description?: string;
    status?: CampaignStatus;
    subscriberGroupIds?: string[];
}

// ==================== EVENT TYPES ====================

export interface TrackEventParams {
    name: string;
    subscriberId?: string;
    email?: string;
    data?: Record<string, any>;
}

export interface TrackEventResponse {
    eventName: string;
    subscriberId: string;
    automationsTriggered: number;
    automationIds: string[];
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ApiErrorResponse {
    success: false;
    error: {
        message: string;
        code?: string;
    };
}
