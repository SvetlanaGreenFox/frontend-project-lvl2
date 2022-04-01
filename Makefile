install:
	npm ci

run:
	bin/nodejs-package.js 10

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish: 
	npm publish --dry-run

lint:
	npx eslint . --fix

jest:
	npx jest

.PHONY: test
