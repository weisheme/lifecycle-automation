#!/bin/bash
set -e

npm run lint:fix
npm run compile

cf target -s development

cf delete lifecycle-automation-staging-old -f

cf push -f manifest-staging.yml lifecycle-automation-staging-new

cf rename lifecycle-automation-staging lifecycle-automation-staging-old
cf rename lifecycle-automation-staging-new lifecycle-automation-staging

cf unmap-route lifecycle-automation-staging cfapps.io --hostname lifecycle-automation-staging-new
cf map-route lifecycle-automation-staging cfapps.io --hostname lifecycle-automation-staging

sleep 10

cf stop lifecycle-automation-staging-old

cf apps