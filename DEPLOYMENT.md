# FoodPrints Deployment Guide

## Asset Path Strategy

This project uses **relative paths** for all assets, which is optimal for deployment:

### ✅ Current Asset Handling (Already Optimized)

1. **Image Imports**: All images use ES6 imports
   ```javascript
   import Photo1 from "../assets/photo1.jpg";
   import HeroImg from "./assets/hero.webp";
   ```

2. **CSS Imports**: CSS files use relative paths
   ```javascript
   import "./assets/style.css";
   import "../../assets/zoomOut.css";
   ```

3. **Asset Organization**: 
   - Shared assets: `src/assets/`
   - Page-specific assets: `src/pages/[country]/assets/`

### Why Relative Paths Work for Deployment

- **Base Path Independence**: Assets work regardless of deployment URL
- **CDN Compatible**: Can be served from any domain/subdirectory
- **Vite Optimization**: Vite automatically handles asset bundling and optimization

## Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
# Clean build (recommended)
npm run build:clean

# Standard build
npm run build

# Build with analysis
npm run build:analyze
```

### Preview Build
```bash
npm run preview
```

## Build Output Structure

After building, your `dist/` folder will contain:

```
dist/
├── assets/
│   ├── images/          # Optimized images with hashes
│   ├── css/            # Bundled CSS with hashes
│   └── js/             # JavaScript chunks with hashes
├── index.html          # Main HTML file
└── favicon.ico         # Favicon (if present)
```

## Deployment Options

### 1. Static Hosting (Netlify, Vercel, GitHub Pages)
- Upload the entire `dist/` folder
- Configure for SPA routing (React Router)

### 2. Traditional Web Server
- Copy `dist/` contents to web root
- Configure server for SPA routing

### 3. CDN Deployment
- Upload `dist/` contents to CDN
- Configure base path if needed

## Build Optimizations

### Asset Optimization
- **Image Compression**: Automatic optimization during build
- **Code Splitting**: Vendor chunks separated for better caching
- **Tree Shaking**: Unused code removed
- **Minification**: JavaScript and CSS minified

### Performance Features
- **Lazy Loading**: Route-based code splitting
- **Asset Hashing**: Cache-busting for updated files
- **Gzip Compression**: Ready for server compression

## Environment Variables

For different deployment environments, create `.env` files:

```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_TITLE=FoodPrints Production

# .env.staging
VITE_API_URL=https://api.staging.com
VITE_APP_TITLE=FoodPrints Staging
```

## Troubleshooting

### Common Issues

1. **404 on Refresh**: Configure server for SPA routing
2. **Asset Not Found**: Check base path configuration
3. **Build Errors**: Run `npm run clean` before rebuilding

### Performance Monitoring

Use the build analysis to identify large bundles:
```bash
npm run build:analyze
```

## Security Considerations

- All console logs removed in production
- Source maps disabled for security
- Assets properly hashed for cache busting 