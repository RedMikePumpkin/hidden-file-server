# hidden-file-server

The `hidden-file-server` project is a simple web server that hides the "/index.html" at the end of the URL. To make a set of webpages use `hidden-file-server`:

	1. make sure that there is only one HTML file in every directory named `index.html`
	2. make all links go to the directory with the target inside (e.g. `contact/us/index.html` would become `contact/us`)
	3. move the set of pages into th `www` folder

The project on Github contains a simple example web page. to run it, run `server.js`.
