/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
// https://github.com/rancher/ui/blob/master/lib/shared/addon/mixins/cluster-driver.js

import ClusterDriver from 'shared/mixins/cluster-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed     = Ember.computed;
const observer     = Ember.observer;
const get          = Ember.get;
const set          = Ember.set;
const alias        = Ember.computed.alias;
const service      = Ember.inject.service;
const all          = Ember.RSVP.all;

/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/

/*!!!!!!!!!!!KAMATERA CONST START!!!!!!!*/
const kamateraOptions = {"cpu_types": {"A": {"name": "Availability", "cores": [1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32], "rammb": [256, 512, 1024, 2048, 3072, 4096, 6144, 8192, 10240, 12288, 16384, 24576, 32768, 49152, 65536, 98304, 131072]}, "B": {"name": "General Purpose", "cores": [1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 88, 104], "rammb": [256, 512, 1024, 2048, 3072, 4096, 6144, 8192, 10240, 12288, 16384, 24576, 32768, 49152, 65536, 98304, 131072, 200704, 262144, 327680, 393216, 458752, 524288]}, "D": {"name": "Dedicated", "cores": [1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40], "rammb": [256, 512, 1024, 2048, 3072, 4096, 6144, 8192, 10240, 12288, 16384, 24576, 32768, 49152, 65536, 98304, 131072, 200704, 262144, 327680, 393216, 458752, 524288]}, "T": {"name": "Burstable", "cores": [1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 88, 104], "rammb": [256, 512, 1024, 2048, 3072, 4096, 6144, 8192, 10240, 12288, 16384, 24576, 32768, 49152, 65536, 98304, 131072, 200704, 262144, 327680, 393216, 458752, 524288]}}, "datacenters": {"AS": {"name": "Asia: China, Hong Kong", "netpacks": {"1000GB of traffic": "t1000"}}, "AS-SG": {"name": null, "netpacks": {"1000GB of traffic": "t1000", "50Mbit/Sec, Unmetered": "b50"}}, "AS-TY": {"name": null, "netpacks": {"1000GB of traffic": "t1000", "50Mbit/Sec, Unmetered": "b50"}}, "AU-SY": {"name": null, "netpacks": {"1000GB of traffic": "t1000", "50Mbit/Sec, Unmetered": "b50"}}, "CA-TR": {"name": "North America: Canada, Toronto", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "EU": {"name": "Europe: The Netherlands, Amsterdam", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "EU-FR": {"name": "Europe: Germany, Frankfurt", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "EU-LO": {"name": "Europe: United Kingdom, London", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "EU-MD": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "EU-ML": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "EU-ST": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "IL": {"name": "Middle East: Israel, Rosh Haayin (2)", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "IL-HA": {"name": "Middle East: Israel, Haifa", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "IL-PT": {"name": "Middle East: Israel, Petach Tikva", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "IL-RH": {"name": "Middle East: Israel, Rosh Haayin", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "IL-TA": {"name": "Middle East: Israel, Tel Aviv", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-AT": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-CH": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-LA": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-MI": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-MI2": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-NY2": {"name": "North America: United States, New York, New York", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-SC": {"name": "North America: United States, California, Santa Clara", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-SE": {"name": null, "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}, "US-TX": {"name": "North America: United States, Texas, Dallas", "netpacks": {"5000GB of traffic": "t5000", "50Mbit/Sec, Unmetered": "b50"}}}, "diskgb": [5, 10, 15, 20, 30, 40, 50, 60, 80, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1500, 2000, 3000, 4000]};
/*!!!!!!!!!!!KAMATERA CONST END!!!!!!!!!*/

/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
// noinspection JSVoidFunctionReturnValueUsed
export default Ember.Component.extend(ClusterDriver, {
    driverName:  '%%DRIVERNAME%%',
    configField: '%%DRIVERNAME%%EngineConfig', // 'googleKubernetesEngineConfig'
    app:         service(),
    router:      service(),
    /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

    init() {
        /*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
        // This does on the fly template compiling, if you mess with this :cry:
        const decodedLayout = window.atob(LAYOUT);
        const template      = Ember.HTMLBars.compile(decodedLayout, {
            moduleName: 'shared/components/cluster-driver/driver-%%DRIVERNAME%%/template'
        });
        set(this,'layout', template);

        this._super(...arguments);
        /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/
        console.log('init');
        let config      = get(this, 'config');
        let configField = get(this, 'configField');

        if ( !config ) {
            config = this.get('globalStore').createRecord({
                type: configField,
                apiClientId: '',
                apiSecret: '',
                datacenter: '',
                privateNetworkName: '',
                sshkeyPrivate: '',
                sshkeyPublic: '',
            });

            set(this, 'cluster.%%DRIVERNAME%%EngineConfig', config);
        }
        console.log('config: ' + JSON.stringify(get(this, 'config')));
        console.log('cluster: ' + JSON.stringify(get(this, 'cluster')));
    },

    config: alias('cluster.%%DRIVERNAME%%EngineConfig'),

    actions: {
        save(cb) {
            console.log('config: ' + JSON.stringify(get(this, 'config')));
            console.log('cluster: ' + JSON.stringify(get(this, 'cluster')));
            if (this.validate()) {
                this.send('driverSave', cb);
            } else {
                cb(false);
            }
        },
        cancel(){
            // probably should not remove this as its what every other driver uses to get back
            get(this, 'router').transitionTo('global-admin.clusters.index');
        },
    },

    // Add custom validation beyond what can be done from the config API schema
    validate() {
        // Get generic API validation errors
        this._super();
        var errors = get(this, 'errors')||[];
        if ( !get(this, 'cluster.name') ) {
            errors.push('Name is required');
        }

        // Add more specific errors

        // Check something and add an error entry if it fails:
        // if ( parseInt(get(this, 'config.memorySize'), defaultRadix) < defaultBase ) {
        //   errors.push('Memory Size must be at least 1024 MB');
        // }

        // Set the array of errors for display,
        // and return true if saving should continue.
        if ( get(errors, 'length') ) {
            set(this, 'errors', errors);
            return false;
        } else {
            set(this, 'errors', null);
            return true;
        }
    },

    // Any computed properties or custom logic can go here
    clusterNameChanged: observer('cluster.name', function() {
        set(this, 'config.name', get(this, 'cluster.name'));
        set(this, 'config.displayName', get(this, 'cluster.name'))
    }),
});
