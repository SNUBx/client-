# Site Safe Alliance — Production Web Platform

UK Construction Safety Training, CITB Touchscreen Tests, and Official CSCS Cards. CITB Approved Training Organisation (ATO #9841).

---

## 🚀 Instant GitHub Pages Deployment

This repository is pre-configured with automated GitHub Actions for 1-click hosting on **GitHub Pages**.

### Step 1: Push or Export to GitHub
You can export this project directly to your GitHub account:
- In Google AI Studio, open the top-right menu (settings / export) and select **Export to GitHub** (or download the ZIP and push it to a new GitHub repository).
- Or from your local terminal:
  ```bash
  git init
  git add .
  git commit -m "feat: initial release of Site Safe Alliance platform"
  git branch -M main
  git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
  git push -u origin main
  ```

### Step 2: Enable GitHub Pages
1. Go to your repository on **GitHub.com**.
2. Navigate to **Settings** &rarr; **Pages** (in the left sidebar under *Code and automation*).
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will automatically execute the `.github/workflows/deploy.yml` workflow, build the project, and publish your live URL (e.g., `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`).

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
