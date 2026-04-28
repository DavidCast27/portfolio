import { cva, type VariantProps } from "class-variance-authority";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center border-2 border-border rounded p-2 transition hover:scale-110 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      tone: {
        default: "text-foreground",
        primary: "text-primary",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
);

export type IconButtonVariants = VariantProps<typeof iconButtonVariants>;
