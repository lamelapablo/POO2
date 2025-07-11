module.exports = {
    setupFilesAfterEnv: ['./jest.setup.js'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'html', 'lcov'],
};