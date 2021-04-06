import axiosWrapper from '../utils/axios';


export const getAllVideosService = async (channel_name, access_token) => {
  const headers = {
    'Authorization': `Bearer ${access_token}`
  };
  
  try {
    const { data: {data: channels} } = await axiosWrapper({
      method: 'GET',
      url: `https://api.twitch.tv/helix/search/channels?query=${channel_name}`,
      headers
    });

    const channel = channels.find(({ display_name }) => display_name.toLowerCase() === channel_name.toLowerCase());
    if (!channel) return [];

    const { data: { videos } } = await axiosWrapper({
      method: 'GET',
      url: `https://api.twitch.tv/kraken/channels/${channel.id}/videos`,
      headers
    }); 
    
    return videos;
  } catch (err) {
    console.log(err,'all channels err');
    throw err;
  }
};