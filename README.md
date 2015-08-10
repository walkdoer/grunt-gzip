# grunt-gzip

> Use to calculate gzip size

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gzip --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gzip');
```

## The "gzip" task

### Overview
In your project's Gruntfile, add a section named `gzip` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gzip: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      src: [
        //files
      ]
    },
  },
});
```

### Options

#### options.detail
Type: `Boolean`
Default value: `false`

show compress defail of each file

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  gzip: {
    index: {
      src: [
        './public/index.html',
        './public/app.js',
        './public/app.css'
      ]
    }
  }
});
```

#### Custom Options


```js
grunt.initConfig({
  gzip: {
    options: { detail: true},
    index: {
      src: [
        './public/index.html',
        './public/app.js',
        './public/app.css'
      ]
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
