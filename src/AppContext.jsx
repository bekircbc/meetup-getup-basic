import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    (async () => {
      const response = (await axios.get(`${BASE_API_URL}meetups`)).data;
      setLoadedMeetups(response.meetups);
      console.log(loadedMeetups);
      setIsLoading(false);
    })();
  }, [loadedMeetups]);

  function toggleFavoriteStatusHandler(meetup) {
    const meetupData = {
      isFavorite: !meetup.isFavorite,
    };

    fetch(`${BASE_API_URL}meetups/${meetup._id}`, {
      method: "PUT",
      body: JSON.stringify(meetupData),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <AppContext.Provider
      value={{
        BASE_API_URL,
        isLoading,
        loadedMeetups,
        toggleFavoriteStatusHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
