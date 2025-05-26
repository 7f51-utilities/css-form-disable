# 1.0.0-beta.1 (2025-05-26)


### Features

* add build tools and JavaScript integration ([bf3acbc](https://github.com/7f51-utilities/css-form-disable/commit/bf3acbc2cfef8f2c3c250fe93ed2fb744173bc26))
* add CSS form validation styling system ([a035fd8](https://github.com/7f51-utilities/css-form-disable/commit/a035fd8f7543c44530e200a0e3ae16c833c4cd9e))
* initialize CSS form validation library package ([7845c96](https://github.com/7f51-utilities/css-form-disable/commit/7845c96a86d8f1d2edf3353f3c9734f003991bce))

# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-05-26

### Added
- Initial release of Vue Form Disable package
- Pure CSS form validation with `:has()` selector support
- Framework-agnostic approach for disabling submit buttons
- Vue.js plugin integration with customizable options
- SCSS modular architecture with configurable variables
- Theme system (minimal and modern themes)
- Class purging functionality for tree-shaking unused CSS
- TypeScript definitions for full IDE support
- Exception handling for novalidate forms and logout actions
- Support for custom class selectors and framework-specific attributes
- Comprehensive build tools and Vite plugin integration
- Automatic detection of Livewire, data attributes, and role-based selectors

### Features
- **Core CSS**: Form validation using modern CSS `:has()` selectors
- **Vue Integration**: Optional Vue plugin with theme and customization support
- **SCSS Customization**: Modular SCSS files with configurable class mappings
- **Build Tools**: Sass compilation, minification, and class purging
- **Exception Handling**: Smart exclusions for novalidate forms and logout actions
- **TypeScript Support**: Full type definitions for better developer experience
- **Browser Support**: Chrome 105+, Firefox 121+, Safari 16.4+, Edge 105+

### Technical Details
- Package size: ~2KB minified CSS (minimal theme)
- Zero JavaScript dependencies for core functionality
- Modern CSS `:has()` selector for form state detection
- SCSS modules for customizable styling and theming
- Class scanning and purging for optimal bundle sizes
