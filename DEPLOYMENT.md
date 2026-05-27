# 🚀 Deployment Guide — Uday's Cinematic AI Portfolio

## Option 1: Vercel (Recommended — 5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "🚀 Initial commit — Cinematic AI Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Add environment variables (see below)
5. Click **"Deploy"**

### Step 3: Add Environment Variables in Vercel
Go to Project → Settings → Environment Variables:

```
OPENAI_API_KEY=sk-your-key         # For real AI (optional)
MONGODB_URI=mongodb+srv://...       # For contact form (optional)
EMAIL_FROM=you@gmail.com           # For email notifications (optional)
EMAIL_APP_PASSWORD=xxxx xxxx       # Gmail App Password (optional)
EMAIL_TO=you@gmail.com             # Where to receive emails
GITHUB_TOKEN=ghp_...               # For GitHub stats (optional)
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
```

### Step 4: Custom Domain (Optional)
1. In Vercel: Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as shown
4. SSL is automatic!

---

## Option 2: Self-Hosted (VPS)

### Requirements
- Ubuntu 20.04+ VPS (DigitalOcean, AWS EC2, etc.)
- Node.js 20+
- Nginx
- PM2

### Steps
```bash
# 1. SSH into your VPS
ssh user@your-vps-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install PM2
npm install -g pm2

# 4. Clone your repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# 5. Install & build
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run build

# 6. Start with PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup

# 7. Configure Nginx
sudo nano /etc/nginx/sites-available/portfolio
```

Nginx config:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Add SSL with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Performance Checklist

Before deploying to production:

- [ ] Update all data in `lib/data.ts`
- [ ] Add real OpenAI API key (or leave mock mode)
- [ ] Add your resume PDF to `public/resume.pdf`
- [ ] Update `NEXT_PUBLIC_SITE_URL` in env
- [ ] Test all sections render correctly
- [ ] Test AI chat works
- [ ] Test contact form sends email
- [ ] Check mobile responsiveness
- [ ] Run `npm run build` with no errors

---

## Getting OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / log in
3. Go to API Keys → Create new secret key
4. Add to `.env.local`: `OPENAI_API_KEY=sk-...`
5. Portfolio uses `gpt-4o-mini` (very cheap — ~$0.001 per conversation)

---

## Setting Up Gmail for Contact Form

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select app: "Mail", device: "Other"
3. Generate 16-character password
4. Add to env:
   ```
   EMAIL_FROM=your.gmail@gmail.com
   EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   EMAIL_TO=where.to.receive@email.com
   ```

---

*🚀 You should be live in under 10 minutes with Vercel!*
