# Portfolio - Daniele Perazzolo

This repository hosts Daniele Perazzolo's Portfolio source website files. From here we can compile it's contents and get a production ready version of the website that can be uploaded to the dpera web server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project onto our web server.

### Prerequisites

In order to get started working with this repository you must first install the following:

```
nodejs v10.14.1 or newer
npm v6.8.0 or newer
```

This can be done by downloading and installing `nodejs` from [their website](https://nodejs.org/en/download/). `npm` is included within the `nodejs` install so no need to install it separately.

### Installing

First off clone the repository to your local system using SourceTree or git client of your choice:

```
git clone https://github.com/dfpera/Portfolio.git
```

Next `cd` into the project directory:

```
cd <path_to_repository>/portfolio
```

Finally run the following to install all dependencies:

```
npm install
```

You are now ready to get started updating the website.

## Testing

The website can be run in either development mode `npm start` or production mode `npm run build`. Product mode is solely used to test the website before we deploy it to the web server.

### Development

Setting up the test server is very easy. Simply run npm test and the server will launch itself and compile all the code to a development folder where the server will run from.

```
npm start
```

### Production Ready

TODO: Implement production gulpfile.js.

```
npm run build
```

## Deployment

TODO: Implement deployment

1. Deploy the entire website _(very slow)_
	```
	npm run deploy:all
	```

2. Deploy the img folder _(slow)_
	```
	npm run deploy:img
	```

3. Deploy the assets website _(very slow)_
	```
	npm run deploy:assets
	```

4. Deploy just the code _(relatively fast)_
	```
	npm run deploy
	```


## Built With

Check the `package.json` file for a list of dependencies and packages that the website is built with. 
Packages not listed in the `package.json` are the following:

* Javascript Framework - [jQuery 1.7.1](https://jquery.com/)
* Form Validation - [jQuery.validation 1.17.0](https://jqueryvalidation.org/)
* Support Page Filtering - [isotope](https://isotope.metafizzy.co/)
* Filtering addon - [imagesloaded](https://imagesloaded.desandro.com/)
* IE Support - [html5 shiv](https://github.com/aFarkas/html5shiv)

## Authors

* **Daniele Perazzolo** - [dfpera](https://github.com/dfpera)
