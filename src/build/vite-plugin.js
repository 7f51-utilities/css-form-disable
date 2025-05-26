const PurgeScanner = require('./purge-scanner');
const path = require('path');

/**
 * Vite plugin for Vue Form Disable with automatic purging
 */
function vueFormDisablePlugin(options = {}) {
    const {
        purge = false,
        content = ['./src/**/*.vue', './src/**/*.html', './src/**/*.js'],
        customSelectors = [],
        outputFile = 'src/styles/css/form-disable.purged.css'
    } = options;

    return {
        name: 'vue-form-disable',
        configResolved(config) {
            // Store config for later use
            this.isProduction = config.command === 'build';
        },
        async buildStart() {
            if (purge && this.isProduction) {
                console.log('🧹 Vue Form Disable: Purging unused classes...');

                const scanner = new PurgeScanner({
                    content,
                    patterns: {
                        submit: /class="[^"]*\bsubmit\b[^"]*"/g,
                        'submit-btn': /class="[^"]*\bsubmit-btn\b[^"]*"/g,
                        'submit-button': /class="[^"]*\bsubmit-button\b[^"]*"/g,
                        'submit-link': /class="[^"]*\bsubmit-link\b[^"]*"/g,
                        'form-submit': /class="[^"]*\bform-submit\b[^"]*"/g,
                        'wire-validate': /wire:click="[^"]*validate[^"]*"/g,
                        'data-submit': /data-submit/g
                    },
                    safelist: ['no-disable', 'ndsbl', 'form-disable-ignore']
                });

                const usedClasses = scanner.scanFiles();
                console.log('📊 Used classes found:', usedClasses);

                // Generate purged CSS using the build tool
                const SassBuildTool = require('./sass-config');
                const builder = new SassBuildTool({
                    purge: {
                        enabled: true,
                        content,
                        patterns: scanner.config.patterns,
                        safelist: scanner.config.safelist
                    }
                });

                await builder.buildPurged();
                console.log('✅ Purged CSS generated');
            }
        },

        transformIndexHtml(html) {
            // Inject CSS based on environment
            const cssFile = purge && this.isProduction
                ? '/src/styles/css/form-disable.purged.css'
                : '/src/styles/css/form-disable.css';

            return html.replace(
                '<head>',
                `<head>\n  <link rel="stylesheet" href="${cssFile}">`
            );
        }
    };
}

module.exports = vueFormDisablePlugin;