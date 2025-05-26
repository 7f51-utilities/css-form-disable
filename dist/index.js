// Vue Form Disable Plugin - CommonJS

const VueFormDisable = {
  install: function(app, options) {
    options = options || {}
    const customSelectors = options.customSelectors || []
    const respectNoValidate = options.respectNoValidate !== false
    const theme = options.theme || 'default'
    
    // Load main CSS if we're in a browser environment
    if (typeof document !== 'undefined') {
      // Check if CSS is already loaded
      if (!document.querySelector('link[href*="form-disable.css"], style[data-vue-form-disable]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = './styles/css/form-disable.css'
        link.setAttribute('data-vue-form-disable', 'main')
        document.head.appendChild(link)
      }
    }
    
    // Add custom CSS for additional selectors
    if (customSelectors.length > 0) {
      const style = document.createElement('style')
      style.setAttribute('data-vue-form-disable', 'custom')
      const noValidateCheck = respectNoValidate ? ':not(:has(form[novalidate]))' : ''
      
      style.textContent = 
        ':root' + noValidateCheck + ':has(*:invalid, *:out-of-range) ' + customSelectors.join(', ') + ' {\n' +
        '  pointer-events: none !important;\n' +
        '  cursor: not-allowed !important;\n' +
        '}\n' +
        ':root' + noValidateCheck + ':has(*:invalid, *:out-of-range) ' + customSelectors.join(' > *, ') + ' > * {\n' +
        '  pointer-events: none !important;\n' +
        '  cursor: not-allowed !important;\n' +
        '}'
      
      document.head.appendChild(style)
    }
    
    // Load theme if specified
    if (theme !== 'default' && typeof document !== 'undefined') {
      const themeLink = document.createElement('link')
      themeLink.rel = 'stylesheet'
      themeLink.href = './styles/css/themes/' + theme + '.css'
      themeLink.setAttribute('data-vue-form-disable', 'theme')
      document.head.appendChild(themeLink)
    }
    
    console.log('🚀 Vue Form Disable plugin installed')
  }
}

module.exports = VueFormDisable
module.exports.default = VueFormDisable