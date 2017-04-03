import {os} from './vhp/os';
import {plusReady} from './vhp/plusReady'

import * as accelerometer from './vhp/accelerometer';
import * as geolocation from './vhp/geolocation';
import * as network from './vhp/network';


const VueHtml5Plus = (Vue) => {
    Vue.os = os;
    Vue.plusReady = plusReady;

    Vue.mixin({
        created: function () {
            if (Vue.os.plus) {
                let context = this;
                let _options = context.$options;
                if (typeof _options.plusReady === 'function') {
                    Vue.plusReady(function () {
                        _options.plusReady.call(context);
                    });
                }
            }
        }
    });

    Object.defineProperties(Vue.prototype, {
        $accelerometer: {
            get() {
                return accelerometer
            }
        },
        $geolocation: {
            get() {
                return geolocation
            }
        },
        $network: {
            get() {
                return network
            }
        }
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueHtml5Plus);
}

export default VueHtml5Plus;