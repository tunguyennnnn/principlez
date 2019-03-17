import axios from 'axios';

export const ipLookUp = async function() {
  try {
    const response = await axios.get('https://api.ipdata.co?api-key=test');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// use navigator.geolocation.getCurrentPosition(callback, error)
// https://developers.google.com/maps/documentation/javascript/geolocation?hl=en
// https://developers.google.com/maps/documentation/geocoding/start

// const getPosition = function() {
//   return new Promise((result, reject) => {
//     navigator.geolocation.getCurrentPosition(result, reject);
//   });
// };

// export const ipLookUp2 = async function() {
//   const position = await getPosition();
//   console.log(position);
//   return position;
// };
