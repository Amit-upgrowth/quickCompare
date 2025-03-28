const API_BASE = 'https://qp94doiea4.execute-api.ap-south-1.amazonaws.com/default/qc';

export const fetchHomeData = async (lat = 28.5472552, lon = 77.3326608) => {
  try {
    const response = await fetch(`${API_BASE}?lat=${lat}&lon=${lon}&type=home`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

export const fetchAutoSuggest = async (query, lat = 28.5472552, lon = 77.3326608) => {
  try {
    const response = await fetch(
      `${API_BASE}?lat=${lat}&lon=${lon}&type=autosuggest&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching autosuggest:', error);
    throw error;
  }
};

export const fetchGroupSearch = async (query, lat = 28.5472552, lon = 77.3326608) => {
  try {
    const response = await fetch(
      `${API_BASE}?lat=${lat}&lon=${lon}&type=groupsearch&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching group search:', error);
    throw error;
  }
};  

export const fetchMapSuggest = async (query, lat = 28.5472552, lon = 77.3326608) => {
  try {
    const response = await fetch(
      `${API_BASE}?lat=${lat}&lon=${lon}&type=mapsuggest&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching map suggest:', error);
    throw error;
  }
};

export const fetchPlaceDetails = async (query, lat = 28.5472552, lon = 77.3326608) => {
  try {
    const response = await fetch(
      `${API_BASE}?lat=${lat}&lon=${lon}&type=placedetails&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};