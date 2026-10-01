# 🚀 WhiteCabz Deployment Guide for Hostinger

This guide covers how to deploy the WhiteCabz platform to **Hostinger**. 

Depending on your Hostinger plan, choose the method that applies to you:
- **Method 1 (Recommended)**: Hostinger Cloud / Business Web Hosting using **hPanel Node.js Manager**
- **Method 2**: Hostinger **VPS Hosting** (Full root access with PM2 & Nginx)
- **Method 3**: Hostinger **Shared Web Hosting** (Static frontend in `public_html` + External/Subdomain Node.js API)

---

## 📋 Pre-Deployment Checklist

1. **Verify Local Build**:
   ```bash
   npm run build
   ```
   *This compiles the React frontend to `apps/web/dist` and installs API dependencies.*

2. **Required Environment Variables**:
   Prepare your production values from `.env.example`:
   ```env
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://yourdomain.com
   WHATSAPP_PHONE=+919478613001
   ADMIN_NOTIFICATION_NUMBER=+919478613001
   ADMIN_EMAIL=info@whitecabz.com
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=WhiteCabz <onboarding@resend.dev>
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   GOOGLE_SHEETS_ID=your_google_sheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

---

## 🔹 Method 1: Hostinger hPanel Node.js Manager (Cloud / Business Hosting)

If your Hostinger plan has the **Node.js** feature in hPanel:

### Step 1: Build the Project Locally or on Server
Run the build command locally before uploading, or run it via SSH:
```bash
npm run build
```

### Step 2: Upload Files to Hostinger
1. Go to **Hostinger hPanel** → **File Manager** (or connect via SFTP).
2. Upload the project files to your domain directory (e.g., `public_html` or a subfolder like `whitecabz`).
3. Ensure the following files and folders are present:
   - `server.js` *(Root startup file)*
   - `package.json`
   - `package-lock.json`
   - `apps/` (containing `apps/api` and `apps/web/dist`)
   - `node_modules` *(or run `npm install` on Hostinger via SSH/Node Manager)*

### Step 3: Configure Node.js in hPanel
1. Navigate to **hPanel** → **Websites** → **Node.js**.
2. Click **Create Application** and configure:
   - **Node.js Version**: `18.x` or `20.x` (or latest LTS)
   - **Application Mode**: `Production`
   - **Application Root**: `/` (or your uploaded directory path)
   - **Application Startup File**: `server.js`
3. Under **Environment Variables**, add the environment variables listed in the checklist above.
4. Click **Install Dependencies** (or click **Run NPM Install**).
5. Click **Start / Restart** application.

---

## 🔹 Method 2: Hostinger VPS (Ubuntu / Debian)

If you have a Hostinger VPS with SSH access:

### Step 1: Connect to your VPS via SSH
```bash
ssh root@your_vps_ip
```

### Step 2: Install Node.js, Git, and PM2
```bash
# Install Node.js LTS (v20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git

# Install PM2 process manager
npm install -g pm2
```

### Step 3: Clone and Build the Application
```bash
cd /var/www
git clone <your-repository-url> whitecabz
cd whitecabz

# Install and build
npm install
npm run build
```

### Step 4: Configure Environment Variables
Create a `.env` file inside `apps/api/.env`:
```bash
nano apps/api/.env
```
Paste your production environment variables and save (`Ctrl+O`, `Enter`, `Ctrl+X`).

### Step 5: Start with PM2
```bash
pm2 start server.js --name "whitecabz-platform"
pm2 save
pm2 startup
```

### Step 6: Configure Nginx Reverse Proxy & SSL
Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/whitecabz
```
Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Enable the site and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/whitecabz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Install free Let's Encrypt SSL:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔹 Method 3: Static Frontend on Hostinger Shared Hosting (`public_html`)

If using basic Hostinger Shared Web Hosting without Node.js support:

### Step 1: Build the Static Frontend
```bash
npm run build
```
This generates the static files inside `apps/web/dist/` along with the `.htaccess` routing file.

### Step 2: Upload to `public_html`
1. Open **Hostinger hPanel** → **File Manager** → `public_html`.
2. Upload the contents of `apps/web/dist/` directly into `public_html`:
   - `assets/`
   - `images/`
   - `models/`
   - `index.html`
   - `.htaccess` *(Ensures React router routes work without 404s)*
   - `favicon.svg`

### Step 3: Deploy Backend API
For Shared Hosting without Node.js, host `apps/api` on a free/affordable cloud service like **Render**, **Railway**, or a **Hostinger VPS subdomain** (e.g., `api.yourdomain.com`).

---

## 🔍 Verification & Health Check

Once deployed, verify that the platform is operational:
- **Homepage**: `https://yourdomain.com`
- **Health check**: `https://yourdomain.com/api/health`
- **Booking Flow**: Perform a test booking to verify WhatsApp link and Google Sheets / email dispatch.
