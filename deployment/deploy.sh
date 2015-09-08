#!/bin/bash

npm install
gulp build
cp -r dist/* /var/www/mercedes/mbnationalrollout