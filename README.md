express-pjax-redirect
=====================

Express middleware for pjax with redirect.  
Adapted from https://github.com/dakatsuka/express-pjax

Installation
------------

```
npm install express-pjax-redirect
```

Usage
-----
In order to use the middleware you must configure express.  

```javascript
var express = require('express')
var pjax    = require('express-pjax-redirect')
var app     = express()

app.use(pjax())

// body parser
// compression
// etc
```

You can simply substitute `res.render` with `res.renderPjax`, it takes the same arguments:  

```javascript
// Render the partial "example" and pass it the username  
app.get('/', function(req, res) { 
	res.renderPjax('partials/example', { username: "testing" }); 
}); 
```

In case of a redirect, in a middleware, for instance, you can use `res.redirectPjax` like so:  

```javascript
// example of isLoggedIn middleware to make sure a user is logged in
module.exports = function(req, res, next) {
	// if user is authenticated keep going
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the login page
	res.redirectPjax('partials/login', { newUrl: '/login' });
}
```
`res.redirectPjax` takes a required view, and optional options and callback. If the options object contains a `newUrl`, the address bar on the client side will be updated to use that string (in the above case /login), else the view path will be used.

Copyright
---------

Copyright (C) 2014 Alessandro Marin, released under the MIT License.
