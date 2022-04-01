install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install-deps:
	npm ci

publish: 
	npm publish --dry-run

lint:
	npx eslint . --fix

jest:
	npx jest

.PHONY: test
