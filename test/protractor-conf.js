exports.config = {
    seleniumAddress: 'http://localhost:9515',
    specs: [
        'T01-LoadData.js',
        // 'T02-AddContact.js'
    ],
    capabilities: {
        'browserName': 'phantomjs'
    }
};