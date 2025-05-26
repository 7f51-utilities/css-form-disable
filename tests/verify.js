// Simple verification script
console.log('=== PACKAGE VERIFICATION ===')

try {
    const plugin = require('./dist/index.js')
    console.log('✓ CommonJS import works')
    console.log('✓ Plugin install function:', typeof plugin.install)
    // Test plugin options in a mock browser environment
    global.document = {
        createElement: () => ({ setAttribute: () => { }, textContent: '', rel: '', href: '' }),
        head: { appendChild: () => { } },
        querySelector: () => null
    }

    const mockApp = { use: () => { } }
    plugin.install(mockApp, {
        customSelectors: ['.btn-submit'],
        respectNoValidate: true,
        theme: 'minimal'
    })

    console.log('✓ Plugin installation test passed')

} catch (error) {
    console.log('✗ Error:', error.message)
    process.exit(1)
}

console.log('\n🎉 PACKAGE IS READY!')
console.log('Ready for Laravel/Inertia Vue integration!')
