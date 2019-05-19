import axios from 'axios';

export const ipLookUp = async function() {
  try {
    const response = await axios.get('https://api.ipdata.co?api-key=test');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
