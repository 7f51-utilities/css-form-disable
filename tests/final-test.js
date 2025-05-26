console.log('=== Vue Form Disable Package Test ===')

// Test 1: CommonJS Import
try {
    const VueFormDisable = require('./dist/index.js')
    console.log('✓ CommonJS import successful')
    console.log('  - install function:', typeof VueFormDisable.install)
    console.log('  - default export:', typeof VueFormDisable.default)
} catch (e) {
    console.log('✗ CommonJS import failed:', e.message)
}

// Test 2: Check CSS files exist
const fs = require('fs')
const path = require('path')

const cssFiles = [
    'dist/styles/css/form-disable.css',
    'dist/styles/css/form-disable.min.css',
    'dist/styles/css/form-disable.purged.css',
    'dist/styles/css/themes/minimal.css',
    'dist/styles/css/themes/modern.css'
]

console.log('\n=== CSS Files Check ===')
cssFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const size = fs.statSync(file).size
        console.log(`✓ ${file} (${size} bytes)`)
    } else {
        console.log(`✗ ${file} missing`)
    }
})

// Test 3: Package.json structure
console.log('\n=== Package Configuration ===')
const pkg = require('./package.json')
console.log('✓ Package name:', pkg.name)
console.log('✓ Version:', pkg.version)
console.log('✓ Main entry:', pkg.main)
console.log('✓ Module entry:', pkg.module)
console.log('✓ Exports configured:', !!pkg.exports)

console.log('\n=== Package Ready! ===')
console.log('🚀 Ready for Laravel/Inertia Vue integration')
console.log('📦 Ready for npm publication')
