const initialState = {
  notifications: [],
  tracks: [],
};

// TODO: Split reducer into many
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_ITEM_SUCCEEDED': {
      const newTracks = state.tracks.filter((item) => item.ID !== action.id);
      return { ...state, tracks: newTracks };
    }
    case 'GET_ALL_ITEMS_SUCCEEDED':
      return { ...state, tracks: action.items };
    case 'SET_ITEMS_LOADER':
      return { ...state, itemsLoader: action.loadState };
    case 'GET_ALL_ITEMS_ERRORED':
      return { ...state, lastError: action.error };
    case 'GET_ITEM_SUCCEEDED':
      return { ...state, activeTrack: action.item };
    case 'UPLOAD_FILE_SUCCEEDED':
      return { ...state, tracks: [...state.tracks, action.item] };
    case 'UPLOAD_FILE_ERRORED':
      return { ...state, lastError: action.error };
    case 'SET_UPLOAD_LOADER':
      return { ...state, uploadLoader: action.loadingState };
    case 'CREATE_NOTIFICATION':
      return {
        ...state,
        notifications: [
          {
            message: action.message,
            noteType: action.noteType,
            createdAt: action.createdAt,
          }, ...state.notifications,
        ] };
    default:
      return state;
  }
};

export default reducer;
