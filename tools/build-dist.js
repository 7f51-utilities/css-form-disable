#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist')
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir)
}

// CommonJS version (index.js)
const cjsContent = `
// Vue Form Disable Plugin - CommonJS

const VueFormDisable = {
  install: function(app, options) {
    options = options || {}
    const customSelectors = options.customSelectors || []
    const respectNoValidate = options.respectNoValidate !== false
    const theme = options.theme || 'default'
    
    // Load main CSS if we're in a browser environment
    if (typeof document !== 'undefined') {
      // Check if CSS is already loaded
      if (!document.querySelector('link[href*="form-disable.css"], style[data-vue-form-disable]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = './styles/css/form-disable.css'
        link.setAttribute('data-vue-form-disable', 'main')
        document.head.appendChild(link)
      }
    }
    
    // Add custom CSS for additional selectors
    if (customSelectors.length > 0) {
      const style = document.createElement('style')
      style.setAttribute('data-vue-form-disable', 'custom')
      const noValidateCheck = respectNoValidate ? ':not(:has(form[novalidate]))' : ''
      
      style.textContent = 
        ':root' + noValidateCheck + ':has(*:invalid, *:out-of-range) ' + customSelectors.join(', ') + ' {\\n' +
        '  pointer-events: none !important;\\n' +
        '  cursor: not-allowed !important;\\n' +
        '}\\n' +
        ':root' + noValidateCheck + ':has(*:invalid, *:out-of-range) ' + customSelectors.join(' > *, ') + ' > * {\\n' +
        '  pointer-events: none !important;\\n' +
        '  cursor: not-allowed !important;\\n' +
        '}'
      
      document.head.appendChild(style)
    }
    
    // Load theme if specified
    if (theme !== 'default' && typeof document !== 'undefined') {
      const themeLink = document.createElement('link')
      themeLink.rel = 'stylesheet'
      themeLink.href = './styles/css/themes/' + theme + '.css'
      themeLink.setAttribute('data-vue-form-disable', 'theme')
      document.head.appendChild(themeLink)
    }
    
    console.log('🚀 Vue Form Disable plugin installed')
  }
}

module.exports = VueFormDisable
module.exports.default = VueFormDisable
`

// ES Module version (index.esm.js)
const esmContent = `
// Vue Form Disable Plugin - ES Module
import '../src/styles/css/form-disable.css'

const VueFormDisable = {
  install(app, options = {}) {
    const { 
      customSelectors = [],
      respectNoValidate = true,
      theme = 'default'
    } = options
    
    // Add custom CSS for additional selectors
    if (customSelectors.length > 0) {
      const style = document.createElement('style')
      const noValidateCheck = respectNoValidate ? ':not(:has(form[novalidate]))' : ''
      
      style.textContent = \`
        :root\${noValidateCheck}:has(*:invalid, *:out-of-range) \${customSelectors.join(', ')} {
          pointer-events: none !important;
          cursor: not-allowed !important;
        }
        :root\${noValidateCheck}:has(*:invalid, *:out-of-range) \${customSelectors.join(' > *, ')} > * {
          pointer-events: none !important;
          cursor: not-allowed !important;
        }
      \`
      document.head.appendChild(style)
    }
    
    // Load theme if specified
    if (theme !== 'default') {
      import(\`../src/styles/css/themes/\${theme}.css\`)
    }
    
    console.log('🚀 Vue Form Disable plugin installed')
  }
}

export default VueFormDisable
`

// Write the files
fs.writeFileSync(path.join(distDir, 'index.js'), cjsContent.trim())
fs.writeFileSync(path.join(distDir, 'index.esm.js'), esmContent.trim())

// Copy CSS files to dist for easier imports
const stylesDir = path.join(distDir, 'styles', 'css')
if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true })
}

const srcCssDir = path.join(__dirname, '..', 'src', 'styles', 'css')
const files = fs.readdirSync(srcCssDir)

files.forEach(file => {
    if (file.endsWith('.css')) {
        const srcFile = path.join(srcCssDir, file)
        const destFile = path.join(stylesDir, file)
        fs.copyFileSync(srcFile, destFile)
    }
})

// Copy themes
const themesDir = path.join(distDir, 'styles', 'css', 'themes')
const srcThemesDir = path.join(srcCssDir, 'themes')

if (fs.existsSync(srcThemesDir)) {
    if (!fs.existsSync(themesDir)) {
        fs.mkdirSync(themesDir, { recursive: true })
    }

    const themeFiles = fs.readdirSync(srcThemesDir)
    themeFiles.forEach(file => {
        if (file.endsWith('.css')) {
            const srcFile = path.join(srcThemesDir, file)
            const destFile = path.join(themesDir, file)
            fs.copyFileSync(srcFile, destFile)
        }
    })
}

console.log('✅ Distribution files built successfully!')
console.log('📁 Generated files:')
console.log('  - dist/index.js (CommonJS)')
console.log('  - dist/index.esm.js (ES Module)')
console.log('  - dist/styles/css/* (CSS files)')
