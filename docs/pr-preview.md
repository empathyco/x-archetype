# Pull request preview

This repository uses a GitHub Actions workflow (`PR Validate & Preview`) to validate and deploy pull request previews.

When a pull request targets the `main` branch, the workflow runs and:

1. Checks out the code
2. Installs dependencies, lints, builds, and tests the project
3. Deploys the preview to Cloudflare R2 (only if previous steps succeed)
4. Adds a comment to the PR with the preview URL

The preview URL follows this pattern:

`https://x.staging.empathy.co/preview/${pr_number}/index.html`

Where `pr_number` is the pull request number from GitHub.

Every new commit in the pull request updates the same preview path automatically.
