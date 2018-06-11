![Undernet](src/assets/images/github-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev)

# Undernet

A powerful, configuration-first front-end framework.

## In the box

The framework features:

- A flex-grid for layouts
- Styling for common tags: buttons, paragraphs, headers, etc.
- Configuration file to apply core brand styling to all elements, including an option for name-spacing.
- Functional JavaScript components: modals, accordions, etc.

## Getting Started

Clone the repo and re-clone the wiki contents.

```shell
$ git clone git@github.com:geotrev/undernet.git
$ cd undernet/
$ npm run setup
```

The site is both a demo and marketing tool. It is built with my own webpack setup called [Pulsar](https://github.com/geotrev/pulsar).

### Run the dev server

```shell
$ npm run watch
```

### Make production builds

```shell
$ npm run build
```

### Run tests with istanbuljs/nyc coverage stats

```shell
$ npm run test
```

### Load tests on file save

```shell
$ npm run test:w
```

## Contributing

See CONTRIBUTING.md for more details.

### Testing and development

The site itself is a demo of the framework, so you should be able to work on the framework source itself while the site runs in the background.

**NOTE**: The build environment works only for macOS at the moment.

To compile and test the framework in this project, you'll need to have a stable version of ruby to compile the framework. I recommend using [ruby-install](https://www.ruby-lang.org/en/documentation/installation/#ruby-install) and managing your version for this project with [chruby](https://www.ruby-lang.org/en/documentation/installation/#chruby) or [rvm](https://www.ruby-lang.org/en/documentation/installation/#rvm). Use whatever setup is easiest for your machine.

Then globally install `sass` and `rollup`. Don't use `npm`'s sass package as it doesn't have the same cli flags as the gem package.

```shell
$ gem install sass
$ npm install -g rollup
$ npm run build:development
```

From there, everything should build correctly: the framework scss and js will be prettified by `prettier` and distributions of js and css will be output using `babel-cli`, `rollup`, `sass`, and a few macOS specific commands for zipping/prepping files for release.

### New releases

New releases are simply zipped and compiled files. You can create a new release using:

```shell
$ npm run build:release
```

This will compile and zip framework assets for a new version.
