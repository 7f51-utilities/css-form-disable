try {
    const plugin = require('./dist/index.js')
    console.log('✓ CommonJS require works:', typeof plugin.install)
    console.log('✓ Plugin structure:', Object.keys(plugin))
} catch (e) {
    console.log('✗ Error:', e.message)
}
