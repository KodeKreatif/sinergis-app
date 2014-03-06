dev:
	@NODE_ENV=development node \
		--harmony \
		test

test:
	@NODE_ENV=test node \
		--harmony \
		test

deps:
	npm install && bower install

build:
	gulp clean && gulp build && gulp release

clean:
	gulp clean

.PHONY: dev test deps build clean