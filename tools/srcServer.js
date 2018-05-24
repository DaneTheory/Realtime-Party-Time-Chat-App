// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync';
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

const bundler = webpack(config);



// browserSync.create('Main App Server')
// const apiServer = require('browser-sync').create('API Server')

// const bs = require("browser-sync").get('API Server')

// bs.emitter.on("init", function () {
//     console.log("Browsersync is running!");
// });

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
  port: 9555,
  ui: false,
  notify: false,

  server: {
    baseDir: 'src',

    middleware: [
      historyApiFallback(),

      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // These settings suppress noisy webpack output so only errors are displayed to the console.
        noInfo: false,
        quiet: false,
        stats: {
          assets: true,
          colors: true,
          version: false,
          hash: true,
          timings: false,
          chunks: true,
          chunkModules: true
        },

        // for other settings see
        // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

      // {
      //   route: '/api',
      //   handle: (req, res, next) => {
      //     // handle any requests at /api
      //     console.log(req)
      //     console.log(res)
      //     console.log(next)
      //
      //     res.send('HELLOOOOOOO!!!!!!')
      //
      //   }
      // }

    ],

  },

  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'src/*.html'
  ]
})


const bs = require('browser-sync').create('API SERVER')

bs.emitter.on("init", function () {
    console.log("Realtime Party Time Chat App API is running on port 9666");
})

bs.init({
  port: 9666,
  ui: false,
  logLevel: "debug",
  logPrefix: "API Server",
  logConnections: true,
  notify: true,
  server: {
    baseDir: "src",
    directory: true,

      middleware: [
        historyApiFallback(),

        (req, res, next) => {
          console.log(new Date(), req.method, req.url)
          res.write('Hello \n')
          res.end()
          next()
        },

        // function (req, res, next) {
        //     /** Second middleware handler **/
        //     res.render('oh ok')
        //     next()
        // },

        // {
        //     route: "/hello",
        //     handle: function (req, res, next) {
        //       res.write('Hello \n');
        //     }
        // }
    ]

  }
},
(err, bs) => {
  // console.log(err)
  // console.log(bs.server)
  // console.log(err)
  // console.log(bs)
  // console.log(bs.active)
  // console.log('nigger')

})


  // bs.notify("Compiling, please wait!")
  // bs.notify("HTML <span color='green'>is supported</span> too!")
