# CSS Form Disable

A lightweight, **framework-agnostic** CSS package for automatically disabling form submit buttons when forms contain invalid fields. Works with **pure CSS** (no JavaScript required) and provides optional Vue.js integration with customizable SCSS and class purging capabilities.

## ✨ Features

- 🚀 **Pure CSS** - Works without JavaScript in any framework
- 🎯 **Framework Agnostic** - Works with Vanilla JS, Vue, React, Angular, Laravel, etc.
- 🔧 **Customizable** - Configure which classes to include/exclude
- 🧹 **Tree Shakable** - Purge unused classes for optimal bundle size
- 🎨 **Themeable** - Multiple pre-built themes (minimal, modern)
- ⚡ **Vue Integration** - Optional Vue.js plugin for enhanced features
- 📱 **Modern CSS** - Uses `:has()` selector for advanced form detection
- 🛡️ **Exception Handling** - Respects `novalidate` attribute and logout forms

## 🚀 Quick Start

### Installation

```bash
npm install @7f51-utilities/css-form-disable
```

### Usage Options

#### 1. Pure CSS (Any Framework/Vanilla JS)

Simply include the CSS file and it works automatically:

```html
<link rel="stylesheet" href="node_modules/@7f51-utilities/css-form-disable/src/styles/css/form-disable.css">

<form>
  <input type="email" required>
  <input type="password" required minlength="8">
  <!-- Automatically disabled when form has invalid fields -->
  <button type="submit">Submit</button>
</form>
```

#### 2. CSS Import (Webpack/Vite/Build Tools)

```css
@import '@7f51-utilities/css-form-disable/css';
```

Or in JavaScript:

```javascript
import '@7f51-utilities/css-form-disable/css'
```

#### 3. Vue Plugin (Enhanced Features)

```javascript
import { createApp } from 'vue'
import VueFormDisable from '@7f51-utilities/css-form-disable'

const app = createApp({})

// Basic usage
app.use(VueFormDisable)

// With options
app.use(VueFormDisable, {
  theme: 'minimal',
  customSelectors: ['.my-submit-btn', '[data-action="save"]'],
  respectNoValidate: true
})
```

#### 3. SCSS Customization

```scss
// Configure before importing
$form-disable-classes: (
  submit: '.btn-submit',
  form-submit: '.form-submit-btn'
  // Only include classes you actually use
);

$form-disable-include-wire: false; // Disable Livewire support
$form-disable-include-role: false; // Disable role-button support

@import 'vue-form-disable/src/styles/scss/index';
```

## 📖 How It Works

The package uses modern CSS `:has()` selectors to detect invalid form fields and automatically disable submit buttons:

```css
/* Disables submit buttons when form has invalid fields */
form:has(*:invalid, *:out-of-range):not([novalidate]) button[type="submit"] {
  pointer-events: none !important;
  cursor: not-allowed !important;
}

/* Global classes (when no novalidate forms exist) */
:root:not(:has(form[novalidate])):has(*:invalid, *:out-of-range) .submit {
  pointer-events: none !important;
  cursor: not-allowed !important;
}
```

## 🎯 Supported Selectors

### Default Classes
- `.submit`
- `.submit-btn` 
- `.submit-button`
- `.submit-link`
- `.form-submit`

### Framework Integration
- `[wire:click*="validate"]` (Livewire)
- `[wire:click*="submit"]` (Livewire)
- `[wire:click*="save"]` (Livewire)
- `[role="button"][data-submit]` (Accessible buttons)
- `[data-submit]` (Data attributes)

### Form Elements (Always Included)
- `button[type="submit"]`
- `button:not([type])` (buttons without type are submit by default)
- `input[type="submit"]`

## 🛡️ Exception Handling

### Exception Classes
Add these classes to prevent disabling:
- `.no-disable`
- `.ndsbl` 
- `.form-disable-ignore`

### Exception Forms
These forms are automatically excluded:
- `form[action*="logout"]`
- `form[action*="signout"]`
- `form[action*="sign-out"]`
- `form[novalidate]`

### Example

```html
<!-- This submit button will be disabled when email is invalid -->
<form>
  <input type="email" required>
  <button type="submit">Submit</button>
</form>

<!-- This form is ignored (novalidate) -->
<form novalidate>
  <input type="email" required>
  <button type="submit">Submit</button> <!-- Never disabled -->
</form>

<!-- This button is ignored (exception class) -->
<form>
  <input type="email" required>
  <button type="submit" class="no-disable">Force Submit</button>
</form>
```

## 🔧 Build Scripts

```bash
# Build all CSS
npm run build

# Build with purging
npm run build:purge

# Watch for changes
npm run watch

# Development mode
npm run dev
```

## 🌐 Browser Support

- ✅ Chrome 105+
- ✅ Firefox 121+  
- ✅ Safari 16.4+
- ✅ Edge 105+

> **Note**: Requires `:has()` selector support. For older browsers, consider using the JavaScript fallback or a polyfill.