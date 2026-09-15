# Site Safe Alliance — Production Web Platform

UK Construction Safety Training, CITB Touchscreen Tests, and Official CSCS Cards. CITB Approved Training Organisation (ATO #9841).

---

## 🚀 Instant Deployment Guide

This repository is pre-configured to deploy smoothly across **GitHub Pages**, **Vercel**, **Netlify**, and container platforms without blank-screen issues.

### Why Blank Screen Happened Previously
In Vite + React projects, GitHub Pages defaults to **"Deploy from a branch"** (root `/`), which serves uncompiled `.tsx` files directly from the repository. Browsers cannot parse raw TypeScript/JSX, resulting in a blank white screen. 

We have resolved this by providing two seamless deployment options:

---

### Option A: GitHub Pages via GitHub Actions (Recommended)

1. Push or Export your code to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: release Site Safe Alliance web platform"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
2. Go to your repository on **GitHub.com**.
3. Click **Settings** &rarr; **Pages** (in the left sidebar under *Code and automation*).
4. Under **Build and deployment** &rarr; **Source**, choose **GitHub Actions** (instead of *Deploy from a branch*).
5. That's it! GitHub Actions will run `.github/workflows/deploy.yml`, compile the production bundle, and publish your site at `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`.

---

### Option B: 1-Command Deployment (`gh-pages`)

If you prefer deploying directly from your local terminal without GitHub Actions:
```bash
npm run deploy
```
This command builds the optimized bundle into `dist/` and automatically pushes it to the `gh-pages` branch. Then in **Settings** &rarr; **Pages**, ensure the Source is set to **Deploy from a branch** &rarr; Branch: `gh-pages` / `root`.

---

### Option C: 1-Click Vercel / Netlify Deployment

- **Vercel**: Import your GitHub repository. Pre-configured `vercel.json` handles rewrites and builds automatically.
- **Netlify**: Import your GitHub repository. Pre-configured `netlify.toml` handles redirects and publishing automatically.

---

## 💻 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```
   Static production-ready assets are compiled into the `dist/` directory.

4. **Preview Production Build Locally**:
   ```bash
   npm run preview
   ```

---

## 🛡️ Key Features & Architecture

- **Accredited Four Core Services**:
  - Green Labourer Card Package: £320 incl. VAT
  - CITB Health, Safety & Environment Test: £50 incl. VAT
  - CSCS Card Application: £65 incl. VAT
  - Level 1 Health & Safety in a Construction Environment: £200 incl. VAT
- **Corporate Multi-Delegate Invoicing**: Real-time PO billing calculator and cohort roster generator.
- **Centralized Telephony & Aircall Smartflow**: Connected to `+44 20 3608 4780`.
- **Responsive Architecture**: Built using React 19, TypeScript, Tailwind CSS v4, Lucide icons, and Motion.
- **Relative Asset Resolution**: Vite is configured with `base: './'` so that static assets load seamlessly whether deployed at the root domain or on any GitHub sub-path.
