import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { sprinkles } from 'shared/src/theme/sprinkles.css';

export const text = recipe({
  base: [
    sprinkles({
      fontFamily: 'brand',
    }),
    {
      lineHeight: '1.3',
    },
  ],

  variants: {
    variant: {
      h1: {
        fontWeight: '600',
        fontSize: 40,
        lineHeight: '1.2',
      },
      h2: {
        fontWeight: '600',
        fontSize: 32,
        lineHeight: '1.2',
      },
      h3: {
        fontWeight: '600',
        fontSize: 28,
        lineHeight: '1.2',
      },
      h4: {
        fontWeight: '600',
        fontSize: 24,
        lineHeight: '1.2',
      },
      h5: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: '1.2',
      },
      h6: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: '1.2',
      },
      lead: sprinkles({
        fontSize: 'lead',
      }),
      title: sprinkles({
        fontSize: 'large',
        fontWeight: '400',
      }),
      label: sprinkles({
        fontSize: 'medium',
      }),
      body: sprinkles({
        fontSize: 'small',
      }),
      caption: sprinkles({
        fontSize: 'caption',
      }),
    },
    gutterBottom: {
      true: {
        marginBottom: '0.35em',
      },
      false: '',
    },
  },

  defaultVariants: {
    variant: 'body',
    gutterBottom: false,
  },
});

export type TextVariants = RecipeVariants<typeof text>;
