APP_DIR=$(PWD)/src
BUILD_DIR=$(PWD)/build
PARCEL_BIN=$(PWD)/node_modules/parcel-bundler/bin/cli.js

all: bundle

.PHONY: all

bundle:
	# clean cache
	rm -rf $(BUILD_DIR); rm -rf .cache

	# bundle
	$(PARCEL_BIN) build \
		-d $(BUILD_DIR) \
		--no-source-maps \
		$(APP_DIR)/index.html \
		$(APP_DIR)/content.js \
		$(APP_DIR)/background.js

	cp $(APP_DIR)/manifest.json $(BUILD_DIR); cp -a $(APP_DIR)/assets $(BUILD_DIR)

	# show stats
	tree $(BUILD_DIR)
