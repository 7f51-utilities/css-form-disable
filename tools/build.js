const SassBuildTool = require('../src/build/sass-config');

async function build() {
    console.log('🔨 Starting build process...');

    const builder = new SassBuildTool();
    await builder.build();

    console.log('✅ Build completed!');
}

build().catch(error => {
    console.error('❌ Build failed:', error);
    process.exit(1);
});