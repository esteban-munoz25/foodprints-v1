# CDN Deployment Guide for FoodPrints

## Overview

This guide will help you deploy your FoodPrints project to a CDN (Content Delivery Network) for optimal performance and global accessibility.

## Prerequisites

- Your CDN provider account (AWS CloudFront, Cloudflare, etc.)
- CDN URL where you'll host the files
- Build tools ready (already configured)

## Step 1: Configure CDN Base URL

### Option A: Using CDN Config File (Recommended)

1. **Edit `vite.config.cdn.js`**:
   ```javascript
   // Change this line to your actual CDN URL
   base: "https://your-cdn-url.com/foodprints/",
   ```

   **Examples:**
   - AWS CloudFront: `https://d1234567890.cloudfront.net/foodprints/`
   - Cloudflare: `https://cdn.yourdomain.com/foodprints/`
   - Custom CDN: `https://static.yourdomain.com/assets/`

2. **Build for CDN**:
   ```bash
   npm run build:cdn
   ```

### Option B: Using Environment Variables

1. **Create `.env.cdn` file**:
   ```bash
   VITE_CDN_URL=https://your-cdn-url.com/foodprints/
   ```

2. **Build with environment**:
   ```bash
   npm run build -- --mode cdn
   ```

## Step 2: Build for CDN

```bash
# Clean previous builds
npm run clean

# Build for CDN deployment
npm run build:cdn
```

This will create a `dist/` folder with all assets configured for your CDN URL.

## Step 3: Upload to CDN

### AWS CloudFront + S3

1. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://your-foodprints-bucket
   ```

2. **Upload files**:
   ```bash
   aws s3 sync dist/ s3://your-foodprints-bucket/foodprints/ --delete
   ```

3. **Configure CloudFront**:
   - Origin: Your S3 bucket
   - Behaviors: Cache static assets
   - Error pages: Redirect 404 to `/index.html` (for SPA routing)

### Cloudflare

1. **Upload via Cloudflare Dashboard**:
   - Go to Workers & Pages
   - Create new Pages project
   - Upload `dist/` folder contents

2. **Or use Wrangler CLI**:
   ```bash
   npm install -g wrangler
   wrangler pages publish dist/
   ```

### Other CDN Providers

Most CDNs follow similar patterns:
1. Upload `dist/` folder contents
2. Configure base path
3. Set up SPA routing (redirect 404 to index.html)

## Step 4: Configure SPA Routing

### Important: Handle React Router

Your app uses React Router, so you need to configure your CDN to handle client-side routing:

**For AWS CloudFront:**
```json
{
  "ErrorPages": {
    "404": {
      "ResponseCode": "200",
      "ResponsePagePath": "/index.html"
    }
  }
}
```

**For Cloudflare:**
- Add `_redirects` file in `dist/`:
  ```
  /*    /index.html   200
  ```

**For other CDNs:**
- Configure 404 redirects to `/index.html`
- Or use a `_redirects` file if supported

## Step 5: Test Your Deployment

1. **Check asset loading**:
   - Open browser dev tools
   - Verify all assets load from CDN URLs
   - Check for 404 errors

2. **Test navigation**:
   - Navigate to `/honduras`, `/salvador`, `/guatemala`
   - Ensure React Router works correctly
   - Test browser refresh on these routes

3. **Performance check**:
   - Use Lighthouse or PageSpeed Insights
   - Verify CDN caching is working
   - Check load times from different locations

## Step 6: Environment-Specific Configurations

### Development vs Production

**Development** (local testing):
```bash
npm run dev
```

**Production** (CDN deployment):
```bash
npm run build:cdn
```

### Multiple Environments

Create different configs for different CDNs:

```javascript
// vite.config.staging.js
base: "https://staging-cdn.yourdomain.com/foodprints/",

// vite.config.production.js  
base: "https://cdn.yourdomain.com/foodprints/",
```

## Troubleshooting

### Common Issues

1. **Assets not loading**:
   - Check base URL configuration
   - Verify CDN URL is correct
   - Ensure files uploaded to correct path

2. **404 on route refresh**:
   - Configure SPA routing (404 → index.html)
   - Check CDN error page settings

3. **CORS issues**:
   - Configure CDN CORS headers
   - Ensure proper domain configuration

### Debug Commands

```bash
# Check build output
ls -la dist/

# Verify asset paths in HTML
grep -r "assets/" dist/index.html

# Test local preview
npm run preview
```

## Performance Optimization

### CDN Best Practices

1. **Cache Headers**:
   - Static assets: Long cache (1 year)
   - HTML: Short cache (1 hour)
   - JavaScript/CSS: Medium cache (1 week)

2. **Compression**:
   - Enable Gzip/Brotli compression
   - Optimize image formats (WebP)

3. **Security**:
   - Enable HTTPS
   - Configure CSP headers
   - Set up proper CORS

## Monitoring

### Key Metrics to Track

- **Load times** from different regions
- **Cache hit rates**
- **Error rates** (404s, 500s)
- **Asset delivery performance**

### Tools

- **CDN Analytics**: Built-in CDN dashboards
- **Web Vitals**: Core Web Vitals monitoring
- **Real User Monitoring**: Performance from actual users

## Security Considerations

1. **HTTPS Only**: Ensure CDN serves over HTTPS
2. **CSP Headers**: Configure Content Security Policy
3. **CORS**: Set up proper Cross-Origin Resource Sharing
4. **Cache Control**: Prevent sensitive data caching

Your FoodPrints project is now ready for CDN deployment! 🚀 