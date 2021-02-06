import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleErrorHandler();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);

      const { login, followers_url } = response.data;
      //Repos
      const repos_res = await axios(
        `${rootUrl}/users/${login}/repos?per_page=100`
      );
      setRepos(repos_res.data);

      //followers
      const followers_res = await axios(`${followers_url}?per_page=100`);
      setFollowers(followers_res.data);
    } else {
      toggleErrorHandler(true, "No user exists with that username");
    }
    setIsLoading(false);
    requestHandler();
  };

  const requestHandler = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((res) => {
        let {
          data: {
            rate: { remaining },
          },
        } = res;
        // remaining = 0;
        setRequests(remaining);
        if (remaining === 0) {
          toggleErrorHandler(
            true,
            "Sorry, you exceeded your daily limit of 60 requests!"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleErrorHandler = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(requestHandler, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubContext, GithubProvider };
