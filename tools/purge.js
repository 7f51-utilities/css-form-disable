const SassBuildTool = require('../src/build/sass-config');

async function buildPurged() {
    console.log('🧹 Starting purge build...');

    const builder = new SassBuildTool({
        purge: {
            enabled: true,
            content: [
                './src/**/*.vue',
                './src/**/*.html',
                './src/**/*.js',
                './demo/**/*.vue',
                './demo/**/*.html',
                './test.html',
                './vue-test.html'
            ]
        }
    });

    await builder.build();

    console.log('✅ Purged build completed!');
}

buildPurged().catch(error => {
    console.error('❌ Purged build failed:', error);
    process.exit(1);
});