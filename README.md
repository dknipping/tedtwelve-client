#General

After starting all services some time is need until a service is reachable through the zuul service.

#Build

Build the application with

* 1. npm i
* 2. gulp production

#Run

There are two differetn ways

* 1. go to the directory "build" and open index.html
* 2. deploy dist/*zip on webserver

#Tips

* look at the configuration.js to see the service the application is searching for.
* if you got cors problem running from the file system install chrome addon "Allow-Control-Allow-Origin: *"
