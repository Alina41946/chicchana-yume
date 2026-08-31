import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),

  schema: ({image}) =>
    z.object({
      title: z.string(),
      description: z.string(),

      category: z.enum(['language', 'japan-wh', 'taiwan', 'works']),

      subcategory: z.string().optional(),

      publishedDate: z.coerce.date(),

      readTime: z.string(),

      image: image().optional(),
      imageAlt: z.string().optional(),

      projectType: z
        .enum([
          'web-design',
          'web-development',
          'graphic-design',
          'motion',
          'personal-project',
        ])
        .optional(),

      year: z.number().optional(),

      role: z.string().optional(),

      draft: z.boolean().default(false),
    }),
});

export const collections = {
  blog,
};
