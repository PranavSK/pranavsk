import { z } from 'astro/zod';
import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';

export const { cva, cx, compose } = defineConfig({
  hooks: {
    onComplete: className => twMerge(className)
  }
});

export function zodEnumFromObjKeys<K extends string>(obj: Record<K, unknown>): z.ZodEnum<[K, ...K[]]> {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
  return z.enum([firstKey, ...otherKeys]);
}
