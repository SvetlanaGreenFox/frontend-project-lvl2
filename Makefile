install:
	npm ci

publish: 
	npm publish --dry-run

lint:
	npx eslint . --fix

jest:
	npx jest

coverage:
	npx jest --coverage
