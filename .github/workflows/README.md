# GitHub Actions Workflows

This directory contains CI/CD workflows for the CVx Portfolio project.

## Available Workflows

### `deploy.yml` - Deploy to Vercel

Automated deployment workflow that runs on every push to the main branch and on pull requests.

**Workflow Steps:**

1. **Lint** - Runs ESLint to ensure code quality
2. **Build** - Builds the Next.js application
3. **Deploy Production** - Deploys to Vercel production (main branch only)
4. **Deploy Preview** - Creates preview deployments for pull requests

**Required Secrets:**

Before the workflow can run successfully, you need to configure these GitHub secrets:

- `VERCEL_TOKEN` - Your Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization/user ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `NEXT_PUBLIC_SITE_URL` - Your site URL (optional)
- `NEXT_PUBLIC_SPOTIFY_URL` - Your Spotify URL (optional)

**Setup Instructions:**

See the detailed setup guide: [DEPLOYMENT_SETUP.md](../DEPLOYMENT_SETUP.md)

## Quick Start

1. **Get your Vercel credentials:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   
   # Get your IDs from .vercel/project.json
   cat .vercel/project.json
   ```

2. **Add secrets to GitHub:**
   - Go to: Repository → Settings → Secrets and variables → Actions
   - Add each required secret

3. **Test the workflow:**
   - Push to main branch or create a pull request
   - Check the "Actions" tab to see the workflow run

## Workflow Status

You can check the status of workflows:

- Badge in README (if configured)
- Actions tab in GitHub repository
- Email notifications (if enabled)

## Customization

To customize the workflow:

1. Edit `.github/workflows/deploy.yml`
2. Modify the triggers, steps, or add new jobs
3. Commit and push to test

## Troubleshooting

**Common Issues:**

- **Workflow doesn't trigger:** Check branch name matches workflow configuration
- **Secrets not found:** Verify secrets are added with exact names
- **Build fails:** Test locally with `npm run build`
- **Deploy fails:** Check Vercel token permissions

See [DEPLOYMENT_SETUP.md](../DEPLOYMENT_SETUP.md) for detailed troubleshooting.

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)


