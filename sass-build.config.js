module.exports = {
    // Input/Output paths
    input: {
        main: 'src/styles/scss/index.scss',
        themes: 'src/styles/scss/themes/*.scss'
    },
    output: {
        css: 'src/styles/css/',
        dist: 'dist/'
    },

    // Sass options
    sass: {
        outputStyle: 'expanded', // 'expanded' | 'compressed'
        sourceMap: true,
        includePaths: ['node_modules'],
        quietDeps: true
    },

    // PostCSS options
    postcss: {
        autoprefixer: {
            browsers: ['> 1%', 'last 2 versions']
        },
        cssnano: {
            preset: 'default'
        }
    },

    // Purging options
    purge: {
        enabled: false,
        content: ['./src/**/*.vue', './src/**/*.html'],
        safelist: [
            'no-disable',
            'ndsbl',
            'form-disable-ignore'
        ]
    },

    // Class scanning
    scan: {
        patterns: {
            submit: /class="[^"]*\bsubmit\b[^"]*"/g,
            'submit-btn': /class="[^"]*\bsubmit-btn\b[^"]*"/g,
            'submit-button': /class="[^"]*\bsubmit-button\b[^"]*"/g,
            'submit-link': /class="[^"]*\bsubmit-link\b[^"]*"/g,
            'form-submit': /class="[^"]*\bform-submit\b[^"]*"/g,
            'wire-validate': /wire:click="[^"]*validate[^"]*"/g,
            'data-submit': /data-submit/g
        }
    }
};