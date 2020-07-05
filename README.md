# Portfolio - Daniele Perazzolo <!-- omit in toc -->

This repository hosts the source code of Daniele Perazzolo's Portfolio. From here we can clone the site, run a local version and push to staging or production.

- [1. Getting Started](#1-getting-started)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Installing](#12-installing)
- [2. Development](#2-development)
  - [2.1. Local](#21-local)
  - [2.2. Staging](#22-staging)
  - [2.3 Production](#23-production)
- [3. Built With](#3-built-with)
- [4. Authors](#4-authors)

## 1. Getting Started

These instructions will get you a copy of the project up and running on your local machine for development. See [deployment](#deployment) for how to deploy the portfolio onto the web server.

### 1.1. Prerequisites

To get this project running you must install the following:

```
nodejs v12.14.1 or newer
npm v6.14.5 or newer
```

`nodejs` can be downloaded and installed from [nodejs.org](https://nodejs.org/en/download/). `npm` is included within the `nodejs` install so no need to install it separately.

### 1.2. Installing

1. Clone the repository:
```
git clone https://github.com/dfpera/Portfolio.git
```

2. `cd` into the project directory:
```
cd <path_to_repository>/portfolio
```

3. Install the dependencies:
```
npm install
```

You are now ready to work on the project.

## 2. Development

The project can be run locally by using the `npm start`, deployed to the `staging` branch or deployed to `master` branch. More details below.

### 2.1. Local

Run the command below. The npm script will launch a local webserver and compile all the code to `builds/development/` where the webserver will run from.

```
npm start
```

### 2.2. Staging

To test your code on staging, merge your branch into `staging` branch and wait for Netlify to finish the build. Check the build status at [netlify.com/sites/dpera/deploys](https://app.netlify.com/sites/dpera/deploys?filter=staging).

After the build has succeeded, check out the changes at [https://staging.dpera.dev](https://staging.dpera.dev).

### 2.3 Production

Once you are happy with the build in staging you can submit a pull request to `master`. Accept the pull request and check the build status at [netlify.com/sites/dpera/deploys](https://app.netlify.com/sites/dpera/deploys?filter=master).

After the build has succeeded, check out the changes at [https://dpera.dev](https://dpera.dev).

## 3. Built With

Check the `package.json` file for a list of dependencies and packages that the website is built with.
Packages not listed in the `package.json` are the following:

* Javascript Framework - [jQuery 1.7.1](https://jquery.com/)
* Form Validation - [jQuery.validation 1.17.0](https://jqueryvalidation.org/)
* Project Filtering - [isotope](https://isotope.metafizzy.co/)
* Filtering addon - [imagesloaded](https://imagesloaded.desandro.com/)
* IE Support - [html5 shiv](https://github.com/aFarkas/html5shiv)

## 4. Authors

* **Daniele Perazzolo** - [dfpera](https://github.com/dfpera)
