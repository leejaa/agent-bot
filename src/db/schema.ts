import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  index,
  primaryKey,
  foreignKey,
} from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from 'next-auth/adapters';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const accounts = pgTable(
  'accounts',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

export const conversations = pgTable(
  'conversations',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    userId: text('user_id').notNull(),
    title: text('title'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  },
  (table) => [
    index('conversations_user_id_idx').on(table.userId),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: 'conversations_user_id_fkey',
    }).onDelete('cascade'),
  ]
);

export const turns = pgTable(
  'turns',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    conversationId: uuid('conversation_id').notNull(),
    userMessage: text('user_message').notNull(),
    openaiResponse: text('openai_response'),
    anthropicResponse: text('anthropic_response'),
    googleResponse: text('google_response'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow(),
  },
  (table) => [
    index('turns_conversation_id_idx').on(table.conversationId),
    foreignKey({
      columns: [table.conversationId],
      foreignColumns: [conversations.id],
      name: 'turns_conversation_id_fkey',
    }).onDelete('cascade'),
  ]
);
