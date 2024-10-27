# Contributing

## Local Development

See Kamatera/kontainer-engine-driver-kamatera for instructions to start a local rancher and serve the go driver.

Run the following to serve the ui driver:

```
nvm use
yarn install
yarn start --debug
```

Continue with the instructions in Kamatera/kontainer-engine-driver-kamatera to add the driver to the local rancher.

## Updating the constants

The constants are generated from the Kamatera API. To update them, run the following:

```
pip install -r scripts/requirements.txt
scripts/update_component_constants.py
```

This is run automatically in the CI pipeline and on a daily schedule.
