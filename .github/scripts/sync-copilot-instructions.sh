#!/bin/bash
set -e

OWNER="empathyco"
REPO=$1
BRANCH_NAME="chore/sync-copilot-instructions-$(date +%Y%m%d-%H%M%S)"
BASE_BRANCH="main"

echo "🔄 Syncing Copilot instructions to ${OWNER}/${REPO}"

# Clone target repository
echo "📦 Cloning target repository..."
gh repo clone "${OWNER}/${REPO}" target-repo -- --depth 1

cd target-repo

# Create new branch
echo "🌿 Creating branch ${BRANCH_NAME}..."
git checkout -b "${BRANCH_NAME}"

# Copy files from source
echo "📝 Copying Copilot instructions..."
mkdir -p .github
cp -f ../source/.github/copilot-instructions.md .github/

# Copy setup-copilot-instructions directory
if [ -d "../source/.github/setup-copilot-instructions" ]; then
  echo "📁 Copying setup-copilot-instructions directory..."
  rm -rf .github/setup-copilot-instructions
  cp -r ../source/.github/setup-copilot-instructions .github/
fi

# Check if there are changes
if git diff --quiet && git diff --cached --quiet; then
  echo "✅ No changes detected, skipping PR creation"
  cd ..
  rm -rf target-repo
  exit 0
fi

# Commit changes
echo "💾 Committing changes..."
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git add .github/copilot-instructions.md
git add .github/setup-copilot-instructions/
git commit -m "chore(copilot): sync instructions from x-archetype" -m "Syncing from empathyco/x-archetype"

# Push branch
echo "⬆️  Pushing branch..."
git push origin "${BRANCH_NAME}"

# Create pull request
echo "🔀 Creating pull request..."
gh pr create \
  --title "chore(copilot): sync instructions from x-archetype" \
  --body "🤖 **Actualización automática de instrucciones de Copilot**

Esta PR sincroniza los ficheros de configuración de Copilot desde el [arquetipo](https://github.com/empathyco/x-archetype).

**Ficheros actualizados:**
- \`.github/copilot-instructions.md\`
- \`.github/setup-copilot-instructions/\`

Por favor, revisa los cambios antes de mergear." \
  --base "${BASE_BRANCH}" \
  --head "${BRANCH_NAME}" \
  --label "copilot-sync" \
  --label "automated"

echo "✅ Pull request created successfully!"

# Cleanup
cd ..
rm -rf target-repo
