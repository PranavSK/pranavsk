import { defineCollection, z } from 'astro:content';
import { iconMap } from '@/lib/icon-map';
import { zodEnumFromObjKeys } from '@/lib/utils';

const work = defineCollection({
  type: 'data',
  schema: z.object({
    start: z.coerce.date(),
    end: z.coerce.date().or(z.literal('current')),
    role: z.string(),
    team: z.string().optional(),
    organization: z.string(),
    organizationUrl: z.string().url().optional(),
    location: z.string()
  })
});
const project = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repo: z.string().url().optional(),
    skills: z.array(zodEnumFromObjKeys(iconMap)).optional()
  })
});

export const collections = { work, project };
