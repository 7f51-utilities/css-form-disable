// Simple test without CSS require
const VueFormDisable = {
    install: function (app, options) {
        options = options || {}
        const customSelectors = options.customSelectors || []
        const respectNoValidate = options.respectNoValidate !== false
        const theme = options.theme || 'default'

        console.log('🚀 Vue Form Disable plugin installed')
    }
}

module.exports = VueFormDisable
module.exports.default = VueFormDisable
