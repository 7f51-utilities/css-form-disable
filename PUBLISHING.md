# Publishing Guide for @7f51-utilities/css-form-disable

## 📦 NPM Package Configuration

The package is configured for **public** publishing to npm registry under the `@7f51-utilities` scope.

### Key Configuration in package.json:
```json
{
  "name": "@7f51-utilities/css-form-disable",
  "publishConfig": {
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/7f51-utilities/css-form-disable.git"
  }
}
```

## 🚀 Publishing Steps

### 1. **Pre-publish Checklist**
- ✅ Update version in `package.json`
- ✅ Update `CHANGELOG.md` with new version notes
- ✅ Run tests: `npm test`
- ✅ Build package: `npm run build`
- ✅ Verify build outputs in `dist/` directory

### 2. **NPM Registry Setup**
```bash
# Login to npm (if not already logged in)
npm login

# Verify you're logged in
npm whoami

# Check if package name is available
npm view @7f51-utilities/css-form-disable
```

### 3. **Publishing Commands**
```bash
# Build the package
npm run build

# Dry run to see what will be published
npm publish --dry-run

# Publish to npm registry
npm publish

# Or for beta/alpha versions
npm publish --tag beta
npm publish --tag alpha
```

### 4. **Version Management**
```bash
# Patch version (1.0.0 → 1.0.1)
npm version patch

# Minor version (1.0.0 → 1.1.0)  
npm version minor

# Major version (1.0.0 → 2.0.0)
npm version major

# Custom version
npm version 1.2.3

# Then publish
npm publish
```

## 📋 Files Included in Package

The `files` array in package.json controls what gets published:

```json
"files": [
  "dist",              // Built JS files
  "src/styles/scss",   // Source SCSS files
  "src/styles/css",    // Compiled CSS files  
  "src/build",         // Build tools
  "types",             // TypeScript definitions
  "sass-build.config.js", // Build configuration
  "LICENSE",           // License file
  "CHANGELOG.md",      // Version history
  "README.md"          // Documentation
]
```

## 🚫 Files Excluded (.npmignore)

- `tests/` - Test files
- `demo/` - Demo files
- `tools/` - Development tools
- `node_modules/` - Dependencies
- Configuration files (vite.config.js, etc.)
- Editor files (.vscode/, .idea/)

## 🔧 Package Usage After Publishing

### Installation
```bash
npm install @7f51-utilities/css-form-disable
```

### Usage Examples
```javascript
// Vue Plugin
import VueFormDisable from '@7f51-utilities/css-form-disable'
app.use(VueFormDisable)

// CSS Only
import '@7f51-utilities/css-form-disable/css'

// SCSS
@import '@7f51-utilities/css-form-disable/scss';
```

## 🎯 Publishing Workflow

1. **Development**: Make changes, test locally
2. **Build**: `npm run build`
3. **Version**: `npm version patch/minor/major`
4. **Publish**: `npm publish`
5. **Tag**: Git tag is automatically created by `npm version`
6. **Push**: `git push && git push --tags`

## 🔍 Verification

After publishing, verify the package:
```bash
# Check package info
npm view @7f51-utilities/css-form-disable

# Install in a test project
npm install @7f51-utilities/css-form-disable

# Test imports
node -e "console.log(require('@7f51-utilities/css-form-disable'))"
```

## 🏷️ Tags and Versions

- `latest` - Stable releases (default)
- `beta` - Beta versions
- `alpha` - Alpha versions

```bash
# Install specific version
npm install @7f51-utilities/css-form-disable@1.0.0

# Install beta
npm install @7f51-utilities/css-form-disable@beta
```
