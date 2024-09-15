import { defineSchema, defineTable} from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    aiMessages: defineTable({
        author: v.string(),
        body: v.string(),
        isComplete: v.boolean(),
    }),
});