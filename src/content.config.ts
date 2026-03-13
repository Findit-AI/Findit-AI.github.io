import { defineCollection, z } from 'astro:content';

const sharedFields = {
  title: z.string().min(1),
  description: z.string().min(1),
  locale: z.enum(['en', 'zh']),
  publishedAt: z.coerce.date().refine((d) => d <= new Date(), { message: 'publishedAt must not be in the future' }),
  updatedAt: z.coerce.date().optional(),
  draft: z.boolean().default(false),
};

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    ...sharedFields,
    category: z.string().optional(),
  }),
});

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    ...sharedFields,
    kind: z.enum(['guide', 'template', 'asset']).default('guide'),
  }),
});

export const collections = {
  blog,
  resources,
};
