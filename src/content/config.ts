import { defineCollection, z } from 'astro:content';
import { iconMap } from '@/lib/icon-map';
import { zodEnumFromObjKeys } from '@/lib/utils';

const info = defineCollection({
  type: 'data',
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    title: z.string(),
    email: z.string().email(),
    phone: z.string(),
    location: z.string(),
    website: z.string().url(),
    github: z.string(),
    linkedin: z.string(),
    about: z.string(),
    aboutDetailed: z.array(z.string())
  })
});
const education = defineCollection({
  type: 'data',
  schema: z.object({
    degree: z.string(),
    major: z.string(),
    school: z.string(),
    schoolUrl: z.string().url().optional(),
    location: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date()
  })
});
const work = defineCollection({
  type: 'data',
  schema: z.object({
    start: z.coerce.date(),
    end: z.coerce.date().or(z.literal('current')),
    role: z.string(),
    team: z.string().optional(),
    organization: z.string(),
    organizationUrl: z.string().url().optional(),
    location: z.string(),
    description: z.array(z.string())
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

export const collections = { info, education, work, project };
