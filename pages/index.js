import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import axiosWrapper from '../utils/axios';
import { getFavorites, addFavorite, unSetFavorites } from '../utils/favorites';
import { getAllVideosService } from '../services/getAllVideos';
import Video from '../components/Video';
import Search from '../components/Search';


export default function Home({access_token}) {
  const [value, setValue] = useState('');
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleChange = ({target: { value }}) => setValue(value);
  const setFavorite = useCallback((id) => {
    const video = videos.find(({_id}) => _id === id);
    video.isFavorite = !video.isFavorite
    
    setVideos([ ...videos ])
    if (favorites.find(favorite => favorite._id === video._id)) return;
    addFavorite(video);
    setFavorites([...favorites, { ...video }]);
  },[videos]);

  const unSetFavorite = useCallback((id) => {
    if (!favorites.find(({ _id }) => _id === id)) return;
    const filteredFavorites = unSetFavorites(id);
    setFavorites(filteredFavorites);
  },[favorites]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      setVideos([]);
      return;
    }
    const videos = await getAllVideosService(
      value,
      access_token
    );
    const favorites = getFavorites();
    const preparedVideos = videos.map(({_id, ...video}) => ({
      _id,
      ...video,
      isFavorite: !!favorites.find(favorite => favorite === _id),
    }));
    setVideos(preparedVideos);
  }

  useEffect(() => {
    if (process.browser) {
      setFavorites(getFavorites());
    }
  },[]);

  return (
    <div className="container">
      <Head>
        <title> Twitch videos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Search
          value={value}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      {!!favorites.length 
      && (
        <>
        <h2>Избранное</h2>
        <List>
          {favorites.map(video => 
            <Video 
              key={video._id}
              {...video}
              setFavorite={setFavorite}
              unSetFavorite={unSetFavorite}
            />)}
        </List>
        </>
      )}

      {!!videos.length 
      && (
        <>
        <h2>Видео</h2>
        <List>
          {videos.map(video => 
            <Video 
              key={video._id}
              {...video}
              setFavorite={setFavorite}
            />)}
        </List>
        </>
      )}

      </main>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: sans-serif;
        }
      `}</style>
    </div>
  )
}

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
`;

export async function getStaticProps() {
  const { clientId, secretKey } = process.env;
  try {
    const {data: { access_token }} = await axiosWrapper({
      method: 'POST',
      url: `https://id.twitch.tv/oauth2/token?client_id=${clientId}
      &client_secret=${secretKey}&grant_type=client_credentials` 
    })
    return {
      props: {
        access_token
      },
    }
  } catch (err) {
    console.log(err, 'axiosWrapper err');
    throw (err);
  };
}