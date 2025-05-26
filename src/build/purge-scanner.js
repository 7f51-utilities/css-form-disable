const fs = require('fs');
const path = require('path');
const glob = require('glob');

class PurgeScanner {
    constructor(config = {}) {
        this.config = {
            content: ['./src/**/*.vue', './src/**/*.html'],
            patterns: {
                'submit': /class="[^"]*\bsubmit\b[^"]*"/g,
                'submit-btn': /class="[^"]*\bsubmit-btn\b[^"]*"/g,
                'submit-button': /class="[^"]*\bsubmit-button\b[^"]*"/g,
                'submit-link': /class="[^"]*\bsubmit-link\b[^"]*"/g,
                'form-submit': /class="[^"]*\bform-submit\b[^"]*"/g,
                'wire-validate': /wire:click[^>]*validate/g,
                'data-submit': /data-submit/g
            },
            safelist: [],
            ...config
        };
    }

    scanFiles() {
        const usedClasses = new Set(this.config.safelist);
        const files = this.getAllFiles();

        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');
            this.scanContent(content, usedClasses);
        });

        return Array.from(usedClasses);
    }

    getAllFiles() {
        const files = [];

        this.config.content.forEach(pattern => {
            const matches = glob.sync(pattern);
            files.push(...matches);
        });

        return files;
    }

    scanContent(content, usedClasses) {
        Object.entries(this.config.patterns).forEach(([className, pattern]) => {
            if (pattern.test(content)) {
                usedClasses.add(className);
            }
        });
    } generateScss(usedClasses) {
        const classSelectors = [];
        const attributeSelectors = [];

        usedClasses.forEach(cls => {
            const selector = this.getClassSelector(cls);
            if (selector.startsWith('.')) {
                classSelectors.push(selector);
            } else if (selector.startsWith('[')) {
                attributeSelectors.push(selector);
            }
        });

        let scss = `// Auto-generated purged styles
@import 'config';
@import 'core';
@import 'mixins';

// Include core form rules
@include generate-form-disable-rules();
@include generate-exception-classes();
@include generate-exception-forms();

`;        // Add class-based selectors through mixin
        if (classSelectors.length > 0) {
            scss += `// Class-based selectors\n`;
            const classStrings = classSelectors.map(sel => `"${sel}"`).join(', ');
            scss += `@include generate-global-disable-rules((${classStrings}));\n\n`;
        }

        // Add attribute selectors directly as CSS
        if (attributeSelectors.length > 0) {
            scss += `// Attribute-based selectors\n`;
            attributeSelectors.forEach(selector => {
                scss += `form:has(*:invalid, *:out-of-range):not([novalidate]) ${selector} {\n`;
                scss += `  pointer-events: none !important;\n`;
                scss += `  cursor: not-allowed !important;\n`;
                scss += `}\n`;
                scss += `form:has(*:invalid, *:out-of-range):not([novalidate]) ${selector} > * {\n`;
                scss += `  pointer-events: none !important;\n`;
                scss += `  cursor: not-allowed !important;\n`;
                scss += `}\n\n`;
            });
        }

        if (classSelectors.length === 0 && attributeSelectors.length === 0) {
            scss += '// No global classes used\n';
        }

        return scss;
    } getClassSelector(className) {
        const mapping = {
            'submit': '.submit',
            'submit-btn': '.submit-btn',
            'submit-button': '.submit-button',
            'submit-link': '.submit-link',
            'form-submit': '.form-submit',
            'wire-validate': '[wire\\:click*="validate"]',
            'data-submit': '[data-submit]'
        };

        return mapping[className];
    }
}

module.exports = PurgeScanner;