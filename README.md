This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Image Optimization

The project includes an automated image optimization workflow to improve performance:

### Optimized Images

Large images are automatically optimized and converted to WebP format for better performance. The optimized versions are stored in the `public/optimized-images/` directory.

### Running the Optimization Script

To optimize images:

```bash
# Install dependencies (if not already done)
npm install

# Run the optimization script
npm run optimize-images
```

### Benefits

- Significantly reduced file sizes (original JPGs were multiple MBs, now under 100KB)
- Modern WebP format for better compression while maintaining quality
- Automatic width limitation to 1200px for responsive layouts
- Improved page load times and Core Web Vitals

### Usage in Components

When using images, utilize the Next.js Image component with best practices:

```tsx
import Image from 'next/image';

// For critical above-the-fold images
<Image
  src="/optimized-images/example.webp" 
  alt="Description"
  width={500}
  height={300}
  priority={true}
  quality={90}
/>

// For below-the-fold images
<Image
  src="/optimized-images/example.webp" 
  alt="Description"
  width={500}
  height={300}
  loading="lazy"
  quality={80}
/>
```
