#Mr. White Angular generator

               ...... .......... . ..,,,,:...
      .    ... ,.,,;,L;,;:,,.,..:,,:,ii:;,,.
    i ..@    .:;,,.,.,,,,:ii:i;::;1,, ...,,.. ██╗   ██╗ ██████╗
     t0::   ...ff,...  ..,,:::,......:LGG01,. ╚██╗ ██╔╝██╔═══██╗
      101. .:18@@@@C,..,;,@i;@C;;..,:fG@@@@f.  ╚████╔╝ ██║   ██║
      ,t, 8,,t@@@@@@@@@L@@@@@G@@@@@@@C@@@C.C1   ╚██╔╝  ██║   ██║
       .i10@.i@@0@8t:8@@@@@@@L@@@@@@8:f08;C0:    ██║   ╚██████╔╝
         ,  i....,,i;;,:L@@,  ..@8;;tf8Li,,,,    ╚═╝    ╚═════╝
             11,,...,.tG@C;,  ..:L@@t,::,L@t.
            .G@11,....,fCi,.. ..,:@1:,,,,,.,.
            .,i::,::@L:8@C,...,:,t@;:@@;,.;,  ███╗   ███╗██████╗     ██╗    ██╗██╗  ██╗██╗████████╗███████╗
             .:i@it,:,LL@@@@@@C@@@@@@@8C,,G.  ████╗ ████║██╔══██╗    ██║    ██║██║  ██║██║╚══██╔══╝██╔════╝
            , ,;@.:;@@@@@@@@@@@@@@@@@@@@;1t.. ██╔████╔██║██████╔╝    ██║ █╗ ██║███████║██║   ██║   █████╗
               0@:i8@@:;iLLiG.;:;i8G:;@@C8;   ██║╚██╔╝██║██╔══██╗    ██║███╗██║██╔══██║██║   ██║   ██╔══╝
                C,LL@f;,::L@@@@@@81it1f@@C    ██║ ╚═╝ ██║██║  ██║    ╚███╔███╔╝██║  ██║██║   ██║   ███████╗
                 8:@@Gi;;f@@@@@@@@@0@@@81.    ╚═╝     ╚═╝╚═╝  ╚═╝     ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝
                  :@@@@@@@@@@@@@@@@@@@@@
                   .@@@@@@@@@@@@@@@@@@i
                      @@@@@@@@@@@@@@@


>Yeoman Generator for Large Angular Projects

A fork of [generator-cg-angular](https://github.com/cgross/generator-cg-angular/)

Features

* Provides a directory structure geared towards large Angular projects.
    * Each controller, service, filter, and directive are placed in their own file.
    * All files related to a conceptual unit are placed together.  For example, the controller and HTML file for a partial are placed together in the same directory.
* Provides a ready-made Grunt build that produces an extremely optimized distribution.
   * Build uses [grunt-ngmin](https://github.com/btford/grunt-ngmin) so you don't have to use the Angular injection syntax for safe minification (i.e. you dont need `$inject` or `(['$scope','$http',...`.
* Integrates Bower for package management
* Includes Yeoman sub-generators for directives, services, partials, and filters
* Integrates LESS.
* Testable - Included Yeoman sub-generators also build test skeletons using mocha, chai, sinon sinon-chai and grunt-mocha.
Run test via `grunt test`.

Directory Layout
-------------
Below is an explanation of the folder structure.

    /css ........................... usually only contains app.scss
        app.scss ................... main app-wide styles
    /img ........................... images (not created by default but included in /dist if added)
    /js ............................ app global javascript files
        setup.js ................... angular module initialization and route setup
    /directive ..................... angular directives folder
        my-directive.js ............ example simple directive
        /my-directive2 ............. example complex directive (contains external partial)
            my-directive2.js ....... complex directive javascript
            my-directive2.html...... complex directive partial
            my-directive2.scss ..... complex directive SCSS
    /filter ........................ angular filters folder
        my-filter.js ............... example filter
    /model ......................... angular models - a factory implementation of service for non singletons
        MyModel.js ................. example model. Note the capital first letter in the naming
    /partial ....................... angular partials folder
        /my-partial ................ example partial
            my-partial.html ........ example partial html
            my-partial.js .......... example partial controller
            my-partial.scss ........ example partial LESS
    /service ....................... angular services folder
        my-service.js .............. example service
    /dist .......................... distributable version of app built using grunt and Gruntfile.js
    /bower_component................ 3rd party libraries managed by bower
    /node_modules .................. npm managed libraries used by grunt

The `directive`, `filter`, `model`, `partial`, and `service` directories won't exist until one of the relevant components is created using a sub-generator.

Getting Started
-------------

Prerequisites: Node, Grunt, Yeoman, and Bower.  Once Node is installed, do:

    npm install -g grunt-cli yo bower

Next, install this generator:

    npm install -g generator-mrwhite

To create a project:

    mkdir MyNewAwesomeApp
    cd MyNewAwesomeApp
    yo mrwhite

Grunt Tasks
-------------

Now that the project is created, you have 3 simple Grunt commands available:

    grunt         #Runs tests, starts the server and watch
    grunt server  #This will run a development server with watch & reload enabled.
    grunt test    #Run headless unit tests using PhantomJS.
    grunt build   #Places a fully optimized (minified, concatenated, and more) in /dist

Yeoman Subgenerators
-------------

There are a set of sub-generators to initialize empty Angular components.  Each of these generators will:

* Create one or more skeleton files (javascript, SCSS, html, etc) for the component type
* Create a skeleton unit test in /test
* Update index.html and add the necessary `script` tags.
* Update app.scss and add the @import as needed.
* For partials, update the setup.js, adding the necessary route call if a route was entered in the generator prompts.

There are generators for `directive`,`partial`,`service`,`model` and `filter`.

Running a generator:

    yo mrwhite:directive my-awesome-directive
    yo mrwhite:partial my-partial
    yo mrwhite:service my-service
    yo mrwhite:model MyModel
    yo mrwhite:filter my-filter

The name paramater passed (i.e. 'my-awesome-directive') will be used for directory and/or file names.

One quick note, each sub-generator pulls the Angular app/module name from the package.json.  Therefore, if you choose to change the name of your Angular app/module, you must ensure that the name in the package.json stays in sync.

Build Process
-------------

The project will include a ready-made Grunt build that will:

* Build all the SCSS files into one minified CSS file.
* Uses [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) to turn all your partials into Javascript.
* Uses [grunt-ngmin](https://github.com/btford/grunt-ngmin) to preprocess all Angular injectable methods and add the necessary Angular annotations to ensure minification will not break your app (and you don't have to use the array syntax to
manually add the annotations nor $inject).  Read more about [ngmin](https://github.com/btford/ngmin).
* Concatenates and minifies all Javascript into one file.
* Replaces all appropriate script references in `index.html` with the minified CSS and JS files.
* Minifies any images in `/img`.
* Minifies the `index.html`.
* Copies any extra files necessary for a distributable build (ex.  Font-Awesome font files, etc).

The resulting build loads only a few highly compressed files.

The build process uses [grunt-dom-munger](https://github.com/cgross/grunt-dom-munger) to pull script references from the `index.html`.  This means that the build will always pull all Javascript loaded in your `index.html`.  Adding a new library, new controller, new directive, etc does not require that you update the build (also the order of the scripts in your `index.html` will be maintained when they're concatenated).  Importantly, `grunt-dom-munger` uses JQuery selectors to manage the parsing of the script tags. It is very easy to exclude certain scripts from the build.  For example, the project includes a references to the `livereload.js` from the `grunt-contrib-watch` task.  But this file should not be included in a production build.  Thus the `grunt-dom-munger` task is configured with a selector like `script[data-build!="exclude"]` and the script tag for `livereload.js` includes an attribute like `data-build="exclude"`.  You can use this flexibility in your project to include/exclude scripts in your production builds.

Release History
-------------
* 2014-03-01 - V0.1.0 Finished enough for general use. Name changed to mrwhite.
