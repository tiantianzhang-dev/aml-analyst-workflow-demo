# Deployment Guide

This guide covers deployment options for the AML Analyst Workflow Demonstrator across various platforms.

## Table of Contents
1. [Local Development](#local-development)
2. [Static Hosting (Vercel, Netlify)](#static-hosting)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Platforms](#cloud-platforms)

---

## Local Development

### Development Mode
```bash
npm install
npm run dev
```
Access at: `http://localhost:3000`

### Production Preview
```bash
npm run build
npm run preview
```

---

## Static Hosting

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd aml-analyst-workflow-demo
vercel
```

3. **Production Deployment**
```bash
vercel --prod
```

**Configuration** (vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Netlify Deployment

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build Project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod --dir=dist
```

**Configuration** (netlify.toml):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/aml-analyst-workflow-demo"
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/aml-analyst-workflow-demo/'
})
```

4. **Deploy**
```bash
npm run deploy
```

---

## Docker Deployment

### Dockerfile
Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

1. **Build Image**
```bash
docker build -t aml-workflow-demo .
```

2. **Run Container**
```bash
docker run -d -p 8080:80 aml-workflow-demo
```

3. **Access**
Open `http://localhost:8080`

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  aml-demo:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

Run with:
```bash
docker-compose up -d
```

---

## Cloud Platforms

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Select branch (main/master)

2. **Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Google Cloud Run

1. **Create Dockerfile** (see Docker section above)

2. **Deploy**
```bash
gcloud run deploy aml-workflow-demo \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Static Web Apps

1. **Azure CLI Login**
```bash
az login
```

2. **Create Static Web App**
```bash
az staticwebapp create \
  --name aml-workflow-demo \
  --resource-group myResourceGroup \
  --source . \
  --location "centralus" \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

---

## Performance Optimization

### Build Optimizations

1. **Code Splitting**
Add to vite.config.js:
```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts']
        }
      }
    }
  }
})
```

2. **Compression**
```bash
npm install --save-dev vite-plugin-compression
```

```javascript
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    viteCompression()
  ]
})
```

### CDN Configuration

For production deployments, configure CDN:

**Cloudflare**
- Enable Auto Minify (JS, CSS, HTML)
- Enable Brotli compression
- Cache static assets with long TTL

**CloudFront (AWS)**
```json
{
  "CacheBehaviors": {
    "PathPattern": "/assets/*",
    "MinTTL": 31536000,
    "Compress": true
  }
}
```

---

## Environment Variables

For different environments, create `.env` files:

**.env.development**
```
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

**.env.production**
```
VITE_API_URL=https://api.production.com
VITE_ENV=production
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## SSL/HTTPS Configuration

### Let's Encrypt with Nginx

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Cloudflare SSL

1. Add site to Cloudflare
2. Update nameservers
3. Enable SSL/TLS (Full or Full Strict)
4. Force HTTPS redirect

---

## Monitoring & Analytics

### Google Analytics

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.VITE_ENV
});
```

---

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Configure CSP headers
- [ ] Set secure cookie flags
- [ ] Enable CORS properly
- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data
- [ ] Enable rate limiting
- [ ] Implement security headers

### Security Headers (nginx.conf)
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

---

## Backup & Recovery

### Automated Backups

1. **Git Strategy**
   - Commit all changes
   - Tag releases: `git tag -a v1.0.0 -m "Release 1.0.0"`
   - Push to remote: `git push origin --tags`

2. **Database Backups** (if applicable)
   - Schedule automated backups
   - Store in separate location (S3, GCS)
   - Test restore procedures

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Deploy multiple instances
- Implement session management

### CDN Distribution
- Static assets via CDN
- Geographic distribution
- Edge caching

### Database Optimization
- Connection pooling
- Query optimization
- Caching layer (Redis)

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 16+

# Verbose build
npm run build --verbose
```

### Runtime Errors
- Check browser console
- Verify environment variables
- Check network requests
- Review error logs

### Performance Issues
- Analyze bundle size: `npm run build -- --report`
- Check Lighthouse scores
- Monitor Core Web Vitals
- Profile React components

---

## Maintenance

### Regular Updates
```bash
# Check outdated packages
npm outdated

# Update packages
npm update

# Security audit
npm audit
npm audit fix
```

### Version Tagging
```bash
# Update version
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.1 -> 1.1.0
npm version major  # 1.1.0 -> 2.0.0
```

---

## Support & Documentation

- Technical Issues: Review README.md
- Quick Setup: See QUICKSTART.md
- Component Details: Check inline code comments
- Updates: Monitor repository releases

---

**Recommended Deployment**: Vercel or Netlify for simplicity, Docker for production environments requiring custom infrastructure.

**Estimated Setup Time**:
- Vercel/Netlify: 5-10 minutes
- Docker: 15-30 minutes
- Cloud Platform: 30-60 minutes
