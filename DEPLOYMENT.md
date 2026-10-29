# Deploy Button, Inc. on Netlify

This is a static Vite website. Netlify builds the source and serves the generated files. No running Node server, database, Functions, or application environment variables are required.

## 1. Import the repository

1. Sign in to Netlify and select the team that should own the website.
2. Choose **Add new project → Import an existing project**.
3. Select **GitHub** and authorize Netlify to access `elliott-lee/button-website`. If the repository is missing, update the Netlify GitHub integration's repository access.
4. Select `elliott-lee/button-website`.
5. Set the production branch to **main**.

## 2. Confirm the build settings

The committed `netlify.toml` supplies the build command, publish directory, and Node version. File-based settings take precedence over corresponding dashboard settings.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Base directory | Leave blank — repository root |
| Package directory, if shown | Leave blank — repository root |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `24`, supplied by `netlify.toml` and `.nvmrc` |
| Functions directory | Leave blank |
| Application environment variables / secrets | None required |

Netlify installs the npm dependencies before executing the build command. `package-lock.json` is committed to keep dependency versions consistent. Keep development dependencies enabled: Vite is needed during the build, even though the published site is static. Do not set `NODE_ENV=production` or configure npm to omit development dependencies during installation.

No special Netlify plugin is needed. No SPA fallback redirect is needed: the site has one HTML page and uses `#` anchors, rather than client-side page routes.

The standard deployment uses `npm run build`. The separate `npm run build:preview` command creates the downloadable standalone HTML preview and is not needed for Netlify.

## 3. Deploy

1. Choose **Deploy** in Netlify.
2. Open the deploy log and confirm dependency installation and `npm run build` complete successfully.
3. Confirm Netlify publishes the `dist` directory.
4. Open the assigned `*.netlify.app` address after the deploy reports that it is published.

You do not need to commit `dist` or `node_modules`; both are intentionally ignored. Netlify generates `dist` for each deployment. Do not use `npm run dev` or `npm run preview` as the Netlify build command: those start local servers instead of producing the deployment files.

## 4. Verify the published site

- The opening app fills the viewport, with the supplied Button logo and locally bundled fonts visible.
- All four layers work by scrolling, clicking the layer controls, and using the keyboard arrow keys on those controls.
- The page works on a phone and after changing viewport size. Reduced-motion preferences disable the depth and code-rain effects.
- Navigation reaches the work, studio, and contact sections.
- The demo customer search, status filter, and sample-customer creation work. Demo edits disappear on reload by design.
- The project inquiry validates the fields, creates a brief, and downloads it. Copying a brief should work on Netlify's HTTPS address when browser clipboard access is available.
- Browser developer tools show no failed asset requests or JavaScript errors.

### Inquiry delivery is not connected

The current inquiry flow generates a brief entirely in the visitor's browser. It does **not** send emails, submit a lead, or save personal details. This is explicitly stated in the form. The website can be published as it stands, but you will not receive inquiries through that flow.

To receive inquiries, connect an agreed form service or backend. If choosing Netlify Forms, implementation must include form markup that Netlify can detect at build time and a real submission handler; simply enabling Forms in the dashboard will not collect the current dynamically generated form. This integration is a separate application change, not a deployment setting.

## 5. Add your domain, if desired

1. Open the project's **Domain management** settings and add the domain you own.
2. Follow the exact DNS records or nameserver instructions Netlify displays. Use the instructions for your chosen DNS provider; do not guess an IP address or remove unrelated email records.
3. Add the apex domain and/or `www` variant you want to use, and choose the primary domain.
4. Once DNS resolves, confirm Netlify provisions the HTTPS certificate and the primary domain loads over HTTPS.
5. Verify the alternate domain redirects to the primary domain.

The assigned Netlify address is sufficient to test the website before setting up a custom domain.

## 6. Future updates and rollbacks

With continuous deployment enabled, each push to `main` triggers a new production build and deployment. Review the deploy log and the published site after significant updates.

For changes that should be reviewed first, push a feature branch and open a pull request; enable Netlify Deploy Previews to inspect it before merging to `main`.

To roll back a static-site release, select a previously successful deploy in Netlify's deploy history and publish that deploy. Revert or fix the corresponding Git change as well so the next push does not reintroduce the problem.

## Build locally or deploy manually

From the repository root with Node.js 24 installed:

```sh
npm ci
npm run build
```

To inspect the generated site locally:

```sh
npm run preview
```

For a manual Netlify deployment, upload the generated **dist folder**, with `index.html` at its top level. Uploading the source repository will not run the build. Git-based deployment is recommended because it keeps updates automatic.

## Common setup problems

- **`vite: not found`:** dependency installation failed or omitted development dependencies. Keep Vite installed during the build and check the npm install log.
- **Node version error:** confirm the build log uses Node 24 and that the base directory points to the repository root containing `.nvmrc` and `netlify.toml`.
- **Page not found at the site root:** confirm the publish directory is `dist`, not the repository root or `dist/assets`, and that the build generated `dist/index.html`.
- **Missing logo, fonts, or styles:** inspect failed request URLs and confirm the latest build's complete `dist` output was deployed. The Vite configuration uses relative paths and the assets ship with the site.
- **Wrong design appears:** check which Git commit and production branch Netlify actually deployed. Publish the latest successful build.
