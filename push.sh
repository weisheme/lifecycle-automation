cf target -s production

cf delete lifecycle-automation-old -f

cf push -f manifest.yml lifecycle-automation-new

cf rename lifecycle-automation lifecycle-automation-old
cf rename lifecycle-automation-new lifecycle-automation

cf stop lifecycle-automation-old

cf unmap-route lifecycle-automation cfapps.io --hostname lifecycle-automation-new
cf map-route lifecycle-automation cfapps.io --hostname lifecycle-automation

# cf unmap-route lifecycle-automation-old atomist.io --hostname lifecycle
cf map-route lifecycle-automation atomist.io --hostname lifecycle

cf apps