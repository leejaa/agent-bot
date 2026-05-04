import { relations } from "drizzle-orm/relations";
import { users, conversations, turns } from "./schema";

export const conversationsRelations = relations(conversations, ({one, many}) => ({
	user: one(users, {
		fields: [conversations.userId],
		references: [users.id]
	}),
	turns: many(turns),
}));

export const usersRelations = relations(users, ({many}) => ({
	conversations: many(conversations),
}));

export const turnsRelations = relations(turns, ({one}) => ({
	conversation: one(conversations, {
		fields: [turns.conversationId],
		references: [conversations.id]
	}),
}));