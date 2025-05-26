const sass = require('sass');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const PurgeScanner = require('./purge-scanner');

class SassBuildTool {
    constructor(config = {}) {
        this.config = require('../../sass-build.config.js');
        Object.assign(this.config, config);
    }

    async build() {
        // Ensure output directories exist
        this.ensureDirectories();

        // Build main CSS
        await this.buildMain();

        // Build themes
        await this.buildThemes();

        // Build purged version if enabled
        if (this.config.purge.enabled) {
            await this.buildPurged();
        }
    }

    ensureDirectories() {
        const dirs = [
            this.config.output.css,
            this.config.output.dist,
            path.join(this.config.output.css, 'themes')
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    }

    async buildMain() {
        try {
            const result = sass.compile(this.config.input.main, {
                ...this.config.sass,
                style: this.config.sass.outputStyle
            });

            const outputPath = path.join(this.config.output.css, 'form-disable.css');
            fs.writeFileSync(outputPath, result.css);

            if (this.config.sass.sourceMap && result.sourceMap) {
                fs.writeFileSync(outputPath + '.map', JSON.stringify(result.sourceMap));
            }

            // Generate minified version
            if (this.config.sass.outputStyle !== 'compressed') {
                const minified = sass.compile(this.config.input.main, {
                    ...this.config.sass,
                    style: 'compressed'
                });

                const minPath = path.join(this.config.output.css, 'form-disable.min.css');
                fs.writeFileSync(minPath, minified.css);
            }

            console.log('✅ Main CSS built successfully');
        } catch (error) {
            console.error('❌ Error building main CSS:', error.message);
        }
    }
    async buildPurged() {
        try {
            const scanner = new PurgeScanner(this.config.purge);
            const usedClasses = scanner.scanFiles();

            console.log('📊 Used classes found:', usedClasses);

            const purgedScss = scanner.generateScss(usedClasses);
            // Create temp file in the styles/scss directory so imports work correctly
            const tempFile = path.join(path.dirname(this.config.input.main), 'temp-purged.scss');

            fs.writeFileSync(tempFile, purgedScss);

            const result = sass.compile(tempFile, {
                ...this.config.sass,
                loadPaths: [path.dirname(this.config.input.main)]
            });
            const outputPath = path.join(this.config.output.css, 'form-disable.purged.css');

            fs.writeFileSync(outputPath, result.css);
            fs.unlinkSync(tempFile);

            console.log('🧹 Purged CSS generated');
        } catch (error) {
            console.error('❌ Error building purged CSS:', error.message);
        }
    }

    async buildThemes() {
        try {
            const themeFiles = glob.sync(this.config.input.themes);

            for (const themeFile of themeFiles) {
                const themeName = path.basename(themeFile, '.scss');
                const result = sass.compile(themeFile, this.config.sass);

                const outputPath = path.join(this.config.output.css, 'themes', `${themeName}.css`);
                fs.writeFileSync(outputPath, result.css);
            }

            if (themeFiles.length > 0) {
                console.log(`✅ Built ${themeFiles.length} theme(s)`);
            }
        } catch (error) {
            console.error('❌ Error building themes:', error.message);
        }
    }
}

module.exports = SassBuildTool;