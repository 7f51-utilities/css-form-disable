# Semantic Release Setup Guide

## 🚀 Automated Release Configuration

This package is configured with **semantic-release** for automated versioning and publishing based on conventional commits.

### ✅ Setup Status
- ✅ **Dependencies Installed**: All semantic-release plugins configured
- ✅ **Configuration File**: `release.config.cjs` properly configured
- ✅ **GitHub Actions**: Workflows for main and dev branches created
- ✅ **Package Configuration**: Scripts and exports properly set up
- ✅ **Build Process**: Verified working with distribution files
- ⚠️ **Git Repository**: Needs to be initialized and pushed to GitHub

## 📝 Commit Message Format

Use conventional commit format to trigger automatic releases:

### Release Types
- `fix:` → Patch release (1.0.0 → 1.0.1)
- `feat:` → Minor release (1.0.0 → 1.1.0)  
- `BREAKING CHANGE:` → Major release (1.0.0 → 2.0.0)

### Examples
```bash
git commit -m "fix: resolve CommonJS import issue"
git commit -m "feat: add support for custom theme colors"
git commit -m "feat!: remove deprecated API methods"
git commit -m "docs: update README with new examples"
git commit -m "chore: update dependencies"
```

## 🌿 Branch Strategy

### Main Branch (`main`)
- **Purpose**: Production releases
- **Trigger**: Push to `main` branch
- **Output**: Latest stable release (e.g., `1.2.3`)
- **npm tag**: `latest`

### Development Branch (`dev`)
- **Purpose**: Beta/pre-releases
- **Trigger**: Push to `dev` branch  
- **Output**: Beta releases (e.g., `1.3.0-beta.1`)
- **npm tag**: `beta`

## 🔄 Release Workflow

### 1. Development Workflow
```bash
# Work on feature branch
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Merge to dev for beta release
git checkout dev
git merge feature/new-feature
git push origin dev  # → Triggers beta release

# Merge to main for stable release
git checkout main
git merge dev
git push origin main  # → Triggers stable release
```

### 2. Automated Actions
When you push to `main` or `dev`:
1. **Build**: Compiles SCSS, creates distribution files
2. **Version**: Automatically calculates next version
3. **Changelog**: Updates CHANGELOG.md
4. **Release**: Creates GitHub release
5. **Publish**: Publishes to npm registry
6. **Tag**: Creates git tag

## 🔧 GitHub Configuration

### Required Secrets
Set these in your GitHub repository settings:

```
Settings → Secrets and variables → Actions
```

- **`NPM_TOKEN`**: npm authentication token
  ```bash
  # Create token at: https://www.npmjs.com/settings/tokens
  # Token type: Automation (recommended)
  # Scope: Read and write
  ```

- **`GITHUB_TOKEN`**: Automatically provided by GitHub Actions

### Branch Protection (Recommended)
```
Settings → Branches → Add rule
```
- Branch name pattern: `main`
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date

## 📦 Release Assets

Each release automatically includes:
- **Source code** (tar.gz, zip)
- **Distribution files** (`dist/` folder)
- **Changelog** entry
- **npm package** publication

## 🏷️ Version Tags

### Stable Releases
- Format: `v1.2.3`
- Branch: `main`
- npm tag: `latest`

### Beta Releases  
- Format: `v1.3.0-beta.1`
- Branch: `dev`
- npm tag: `beta`

## 📋 Manual Release (if needed)

```bash
# Install dependencies
npm ci

# Build package
npm run build

# Run semantic release locally
npm run release
```

## 🔍 Troubleshooting

### Common Issues

1. **No release triggered**
   - Check commit message format
   - Ensure conventional commits are used
   - Verify branch is `main` or `dev`

2. **npm publish fails**
   - Check `NPM_TOKEN` secret
   - Verify token has write permissions
   - Ensure package name is available

3. **GitHub release fails**
   - Check `GITHUB_TOKEN` permissions
   - Verify repository access

### Debug Commands
```bash
# Check what semantic-release would do
npx semantic-release --dry-run

# Check commit history
git log --oneline

# Verify npm token
npm whoami
```

## 📊 Release History

All releases are tracked in:
- **CHANGELOG.md** - Detailed changes
- **GitHub Releases** - Release notes
- **npm Registry** - Package versions

## 🎯 Best Practices

1. **Use conventional commits** consistently
2. **Test in dev branch** before merging to main
3. **Write clear commit messages** for better changelogs
4. **Use PR reviews** for quality control
5. **Monitor releases** via GitHub notifications

## 📈 Version Strategy

- **Patch** (1.0.1): Bug fixes, documentation updates
- **Minor** (1.1.0): New features, backwards compatible
- **Major** (2.0.0): Breaking changes, API changes

The semantic release system ensures consistent, automated, and reliable package publishing! 🎉
