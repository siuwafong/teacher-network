import './App.css';
import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

import MainNavigation from './components/layouts/MainNavigation'
import Auth from './components/pages/Auth'
import Home from './components/pages/Home'
// import Profile from './components/pages/Profile'
import NewPost from './components/pages/NewPost'
import Users from './components/pages/Users'
import EditProfile from './components/pages/EditProfile'
import EditPost from './components/pages/EditPost'
import PostDetails from './components/pages/PostDetails'
import SearchResults from './components/pages/SearchResults'
import { AuthContext } from './context/auth-context'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/newpost">
          <NewPost />
        </Route>
        <Route path="/posts/:postId" exact>
          <PostDetails />
        </Route>
        <Route path="/posts/:id/edit">
          <EditPost />
        </Route>
        <Route path="/editprofile/:profileId">
          <EditProfile />
        </Route>
        <Route path="/searchresults" render={(props) => <SearchResults {...props} />} />
          {/* <SearchResults />
        </Route> */}
        {/* <Route path="/:userId/profile">
          <Profile />
        </Route> */}

      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="auth" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout
      }}
    >
    <Router>
      <MainNavigation />
      {routes}
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
