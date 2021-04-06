export const getFavorites = () => process.browser ? JSON.parse(localStorage.getItem('twitch__favorites')) || [] : [];
export const addFavorite = (favorite) => {
  const favorites = [ ...getFavorites(), favorite ];
  localStorage.setItem('twitch__favorites', JSON.stringify(favorites));
}

export const unSetFavorites = (id) => {
  const favorites = getFavorites();
  const filteredFavorites = favorites.filter(({_id}) => _id !== id);
  localStorage.setItem('twitch__favorites', JSON.stringify(filteredFavorites));
  return filteredFavorites;
}