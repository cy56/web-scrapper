---
title: API Reference 
sidebarDepth: 2
---

## Authentication
### Login
#### Endpoint
```
POST /api/auth/login
```
#### Parameter(s)
| Name| Type | Description| Required|
|-----|------|------------|---------|
|email|String|email address| :heavy_check_mark:|
|password|String|password| :heavy_check_mark:|

### Register
#### Endpoint
```
POST /api/auth/register
```
#### Parameter(s)
| Name| Type | Description| Required|
|-----|------|------------|---------|
|firstname|String|your first name| :heavy_check_mark:|
|lastname|String|your last name| :heavy_check_mark:|
|email|String|email address| :heavy_check_mark:|
|password|String|password| :heavy_check_mark:|
## Upload
#### Endpoint
```
POST /api/upload
```
#### Parameter(s)
| Name| Type | Description| Required|
|-----|------|------------|---------|
|file|File|file, [.csv]| :heavy_check_mark:|
|brand|String|brand, [RB88, Fun88...]| :heavy_check_mark:|
|vendor|String|vendor, [PT, MGS...]| :heavy_check_mark:|
|date|Date|date, format (yyyy-mm-dd)| :heavy_check_mark:|
|report|String|report type, [summary, player]| :heavy_check_mark:|

## Vendor
### Datatable
#### Endpoint
```
POST /api/vendor/datatable
```
#### Parameter(s)
| Name| Type | Description| Required|
|-----|------|------------|---------|
|brand|String|brand, [RB88, Fun88...]| :heavy_check_mark:|
|vendor|String|vendor, [PT, MGS...]| :heavy_check_mark:|
|report|String|report type, [summary, player]| :heavy_check_mark:|
|startDate|Date|date, format (yyyy-mm-dd)| :heavy_check_mark:|
|endDate|Date|date, format (yyyy-mm-dd)| Optional|
|currency|String|currency, [cny, thb...]| Optional, (required when report is player)|

## Worker
#### Endpoint
```
POST /api/worker/serve
```
#### Parameter(s)
| Name| Type | Description| Required|
|-----|------|------------|---------|
|brand|String|brand, [RB88, Fun88...]| :heavy_check_mark:|
|vendor|String|vendor, [PT, MGS...]| :heavy_check_mark:|
|start|Date|date, format (yyyy-mm-dd)| :heavy_check_mark:|
|end|Date|date, format (yyyy-mm-dd)| Optional|