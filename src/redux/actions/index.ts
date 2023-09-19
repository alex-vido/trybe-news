export const actionsNews = (news = []) => ({
  type: 'NEWS',
  payload: news,
});

export const actionsFavorites = (favorites = []) => ({
  type: 'FAVORITES',
  payload: favorites,
});
