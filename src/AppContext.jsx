import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_API_URL}/meetups`);
      setLoadedMeetups(response.data);
      setIsLoading(false);
    })();
  }, [loadedMeetups]);

  function toggleFavoriteStatusHandler(meetup) {
    const meetupData = {
      title: meetup.title,
      address: meetup.address,
      images: meetup.images,
      description: meetup.description,
      averageRating: meetup.averageRating,
      reviews: meetup.reviews,
      owner: meetup.owner,
      isFavorite: !meetup.isFavorite,
      category: meetup.category,
    };

    (async () => {
      await axios.put(`${BASE_API_URL}/meetups/${meetup._id}`, meetupData);
    })();
  }

  return (
    <AppContext.Provider
      value={{
        isLoading,
        loadedMeetups,
        toggleFavoriteStatusHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
