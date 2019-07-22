module.exports = {
    "rootDir": "../",
    "roots": [
        "<rootDir>/tests/"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/tests/.*|(\\.|/)(jest|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "collectCoverage": false
};