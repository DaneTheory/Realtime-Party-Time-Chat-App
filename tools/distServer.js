// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync';
import historyApiFallback from 'connect-history-api-fallback';
import {chalkProcessing} from './chalkConfig';

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

// Run Browsersync
browserSync({
  port: 9555,
  ui: false,
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
});



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


  bs.notify("Compiling, please wait!")
  bs.notify("HTML <span color='green'>is supported</span> too!")
