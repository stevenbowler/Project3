//@ts-check
/**@module */
import axios from "axios";
import { setZipCode } from '../redux/actionCreator';
require('dotenv').config();

/** 
* this is object with registration data
* @typedef {object} data
* @property {string} [name] - 8+ digit user name regex alpha-numeric only use name on register
* @property {string} email - email format string
* @property {string} password - minimum 8 digit password regex alpha-numeric
* 
*/

export default {
    /** 
         * called from App.js componentDidMount to set currentLocationZipCode
         * @function findZipcode
         * @param {function} dispatch passed thru from Redux initialized Component
         * */
    findZipCode: function (dispatch) {
        // TODO Google "Geolocation API" call, key must be approved for this API
        console.log("process.env.GOOGLE_API_KEY: ", process.env.REACT_APP_GOOGLE_API_KEY);
        var urlFindLatLng = `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        axios
            .post(urlFindLatLng)
            .then(response => {
                // console.log("findZipcode latlng response:", response.data.location.lat);
                var latitude = response.data.location.lat;
                var longitude = response.data.location.lng;
                // TODO Google "Geocoding API" call, key must be approved for this API
                var urlFindZip = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
                axios
                    .post(urlFindZip)
                    .then(response => {
                        // console.log("findZipcode zipcode response: ", response.data.address_components[8].longform);
                        // console.log("findZipcode zipcode response: ", response.data.results[0].address_components[6].long_name);
                        dispatch(setZipCode(response.data.results[0].address_components[6].long_name
                        ));
                    }).catch(error => {
                        console.log("Could not get zipcode from locationAPI.js", error);
                    });
            })
            .catch(error => {
                console.log(" Could not get lat long from locationAPI.js: " + error.message);
            });
    }
}