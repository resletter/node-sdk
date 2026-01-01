# Resletter Node.js SDK

Official Node.js SDK for the [Resletter](https://resletter.com) newsletter platform API.

## Installation

```bash
npm install @resletter/node-sdk
# or
yarn add @resletter/node-sdk
# or
pnpm add @resletter/node-sdk
```

## Quick Start

```typescript
import { Resletter } from '@resletter/node-sdk';

const client = new Resletter('rsl_your_api_key');

// Create a subscriber
const subscriber = await client.subscribers.create({
  email: 'user@example.com',
  name: 'John Doe',
  metadata: { source: 'website' },
});

console.log('Created subscriber:', subscriber.id);
```

## Requirements

- Node.js >= 18.0.0
- A Resletter account with Starter plan or above (API access required)

## Authentication

Get your API key from your Resletter project settings:

1. Navigate to your project settings
2. Go to the "API Access" section
3. Click "Create API Key"
4. Select the required scopes for your use case
5. Copy your API key (starts with `rsl_`)

## API Reference

### Subscribers

```typescript
// List subscribers
const { subscribers, pagination } = await client.subscribers.list({
  page: 1,
  limit: 50,
  status: 'subscribed',
  groupId: 'uuid',
  email: 'search@example.com',
});

// Get a subscriber
const subscriber = await client.subscribers.get('subscriber-id');

// Create a subscriber
const newSubscriber = await client.subscribers.create({
  email: 'user@example.com',
  name: 'John Doe',
  metadata: { plan: 'pro' },
  groupIds: ['group-id'],
  bypassDoubleOptIn: true,
});

// Create multiple subscribers
const result = await client.subscribers.createBulk({
  subscribers: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
  ],
  groupIds: ['group-id'],
  skipDuplicates: true,
  bypassDoubleOptIn: true,
});

// Update a subscriber
const updated = await client.subscribers.update('subscriber-id', {
  name: 'Jane Doe',
  metadata: { plan: 'enterprise' },
  groupIds: ['new-group-id'],
});

// Unsubscribe (soft delete)
await client.subscribers.delete('subscriber-id');

// Hard delete
await client.subscribers.delete('subscriber-id', { hard: true });
```

### Groups

```typescript
// List groups
const groups = await client.groups.list();

// Get a group
const group = await client.groups.get('group-id');

// Create a group
const newGroup = await client.groups.create({
  name: 'Product Updates',
  description: 'Subscribers interested in product news',
  color: '#3B82F6',
});

// Update a group
const updated = await client.groups.update('group-id', {
  name: 'New Name',
});

// Delete a group
await client.groups.delete('group-id');

// Add subscribers to a group
await client.groups.addSubscribers('group-id', {
  subscriberIds: ['sub-1', 'sub-2'],
});

// Remove subscribers from a group
await client.groups.removeSubscribers('group-id', {
  subscriberIds: ['sub-1'],
});
```

### Campaigns

```typescript
// List campaigns
const campaigns = await client.campaigns.list({
  status: 'active',
});

// Get a campaign
const campaign = await client.campaigns.get('campaign-id');

// Create a campaign
const newCampaign = await client.campaigns.create({
  name: 'Product Launch Campaign',
  description: 'Campaign for new product announcement',
  subscriberGroupIds: ['group-1', 'group-2'],
});

// Update a campaign
const updated = await client.campaigns.update('campaign-id', {
  name: 'Updated Campaign Name',
  status: 'paused',
});

// Delete a campaign
await client.campaigns.delete('campaign-id');
```

### Events

```typescript
// Track a custom event to trigger automations
const result = await client.events.track({
  name: 'purchase_completed',
  email: 'user@example.com',
  data: {
    product: 'Premium Plan',
    amount: 99.0,
  },
});

console.log(`Triggered ${result.automationsTriggered} automations`);
```

## Configuration Options

```typescript
const client = new Resletter('rsl_your_api_key', {
  baseUrl: 'https://app.resletter.com', // Custom base URL
  timeout: 30000, // Request timeout in ms
});
```

## Error Handling

```typescript
import { Resletter, ResletterError } from '@resletter/node-sdk';

try {
  await client.subscribers.create({ email: 'invalid' });
} catch (error) {
  if (error instanceof ResletterError) {
    console.error('Status:', error.status);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
  }
}
```

## TypeScript Support

This SDK is written in TypeScript and includes full type definitions.

```typescript
import type {
  Subscriber,
  SubscriberGroup,
  Campaign,
  SubscriberStatus,
  CampaignStatus,
} from '@resletter/node-sdk';
```

## License

MIT
