import axios from 'axios';


const getAuthHeaders = () => ({
  Accept: 'application/vnd.twitchtv.v5+json',
  'Client-ID': `${process.env.clientId}`,
});

const axiosWrapper = async ({
  method = 'GET',
  url = '',
  params = {},
  headers = {},
  data = {},
}) => {
    try {
      const response = await axios(url, {
        method,
        url,
        params,
        data,
        headers: {
          ...getAuthHeaders(),
          ...headers,
        }
      });

      return response;
    } catch(err) {
      console.log(err, 'axiosWrapper err');
      throw (err);
    }
};

export default axiosWrapper;