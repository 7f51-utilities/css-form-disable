import './styles/css/form-disable.css'

const VueFormDisable = {
    install(app, options = {}) {
        const {
            customSelectors = [],
            respectNoValidate = true,
            theme = 'default'
        } = options

        // Add custom CSS for additional selectors
        if (customSelectors.length > 0) {
            const style = document.createElement('style')
            const noValidateCheck = respectNoValidate ? ':not(:has(form[novalidate]))' : ''

            style.textContent = `
        :root${noValidateCheck}:has(*:invalid, *:out-of-range) ${customSelectors.join(', ')} {
          pointer-events: none !important;
          cursor: not-allowed !important;
        }
        :root${noValidateCheck}:has(*:invalid, *:out-of-range) ${customSelectors.join(' > *, ')} > * {
          pointer-events: none !important;
          cursor: not-allowed !important;
        }
      `
            document.head.appendChild(style)
        }

        // Load theme if specified
        if (theme !== 'default') {
            import(`./styles/css/themes/${theme}.css`)
        }

        console.log('🚀 Vue Form Disable plugin installed')
    }
}

export default VueFormDisable