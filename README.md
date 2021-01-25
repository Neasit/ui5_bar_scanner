# ui5-scanner-example

Example of JS native scanner in SAPUI5 Application based on [ZXING](https://github.com/zxing-js/library)

Scanner control with dialog:

Properties:

  - `type` - boolean - type of scanner ('QR-Code', 'Barcode', 'Multi')
  - `editMode` - boolean - show input field in dialog and user can change the scanned value
  - `settings` - boolean - show the popover with decoders settings
  - `decoderKey` - string - default decoder (raw by default) 
  - `decoders` - array - array of decoders (object - { key: 'example', text: 'Example', decoder: function(oResulrt) { return oResult.text }})
  - `tryHarder` - bolean - options for ZXing
  - `laser` - boolean - show decorative lines

# How to setup

1. Install Node.js (https://nodejs.org/en/download/package-manager)
2. Install grunt `npm install -g grunt-cli`
3. Install ui5-cli `npm install -g @ui5/cli`
4. Install mbt tools (https://sap.github.io/cloud-mta-build-tool/download/)
5. Install packages (based on package.json) - `npm install`

# Grunt config

To use "build" and "deploy" tasks the '.env' file have to be fullfieled based on example (.env.example).

# How to build

There is predefined grunt task - 'default' in root directory of application
Build is based on UI5-Tooling and also can be started using command - 'ui5 build'

**Note**: babel task is turned on by default - can be deactivated in ui5.yaml (`delete 'ui5-task-transpile'`)

# How to create MTA container

There is predefined task
1. mta - the mtar container will be created based on build version of source code in './mta' folder

# How to deploy

There is predefined task deploy - will deploy the library without changing the version of lib;

**Note**: the user-defined (like user name, password, system, WB and etc) parameters will be filled
from ".env" file

# How to manage version

The version in manifest.json is updated during build task from package.json

**Note**: version in package.json have to be managed manually using 'npm version'

# How to test

There is predefinded grunt tsak - 'server'.
>command line: grunt server

**Note**: local server is based on UI5-Tooling and can be started using command - 'ui5 serve'

Server will be started at:
>localhost:3070/3071 (3070 - by default, can be changed in 'ui5.yaml')

# How to format soruce code

There is predefined ESLint rules to validate and format soruce code.
>Predefined set of rules (see .eslintrc): airbnb-base

Also is available tools to format js and xml files automatically
>prettier - to js files (see config prettier.config.js)

>jsbeautify - to xml files (see config .jsbeautifyrc)

There are predefined scripts (see package.json) for format all files:
>npm run prettier-js

>npm run pretty-xml

**Note**: also single file can be added to scripts (just put it as parameter)