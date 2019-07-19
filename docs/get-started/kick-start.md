---
title: Kick Start 
---

## Install
Please download the project file
```
// before start please check git, node, npm is it exists
$ git --version
$ node --version
$ npm --version

// clone the project
$ git clone https://github.com/cy56/web-scrapper.git .

// install dependencies
$ npm install
```

## Folder Structure
```
/app
    /controllers
    /models
    /routes
    /services
    /storages
/docs
.env
dbsync.js
index.js
worker.js
```
1. index.js is the entry point
1. dbsync.js is for sync up the database table
1. worker.js is handle scrap data worker
1. .env is keep global environment variables
1. controllers folder is handles api business logic
1. models folder is keeps table blueprint and some logics which is related to database
1. routes folder is handles api endpoint
1. services folder is some small plugins (parser, dbc, database, datatable, resolver[date, data and storage])
1. storages folder is keeps some files

## How to use?
to be continue...