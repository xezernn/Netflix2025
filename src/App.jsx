import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import IntroLayout from "./layouts/IntroLayout"
import ProfileLayout from "./layouts/ProfileLayout"
import AccLayout from "./layouts/AccLayout"
import RegLayout from "./layouts/RegLayout"
import Step1 from "./components/main/registration/Step1"
import Registration from "./components/main/registration/Registration"
import Step2 from "./components/main/registration/Step2"
import Planform from "./components/main/registration/Planform"
import Step3 from "./components/main/registration/Step3"
import Creditoption from "./components/main/registration/Creditoption"
import Profiles from "./components/main/account/Profiles"
import Manage from "./components/main/account/Manage"
import Home from "./components/main/account/Home"
import Main from "./components/main/intoduction/Main"
import Login from "./components/main/intoduction/Login"
import TvShows from "./components/main/account/TvShows"
import Movies from "./components/main/account/Movies"
import Latest from "./components/main/account/Latest"
import VideoPlayer from "./components/main/VideoPlayer"
import Searched from "./components/main/account/Searched"
import GenrePage from "./components/main/account/GenrePage"
import MyList from "./components/main/account/MyList"
import News from "./components/main/account/News"

function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <Routes>
      <Route path="/" element={<IntroLayout />}>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<RegLayout />}>
        <Route path="/signup/password" element={<Step1 />} />
        <Route path="/signup/registration" element={<Registration />} />
        <Route path="/signup" element={<Step2 />} />
        <Route path="/signup/planform" element={<Planform />} />
        <Route path="/signup/paymentPicker" element={<Step3 />} />
        <Route path="/signup/creditoption" element={<Creditoption />} />
      </Route>
      <Route path="/" element={<ProfileLayout />}>
        <Route path="/account" element={<Profiles />} />
        <Route path="/ManageProfiles" element={<Manage />} />
      </Route>
      <Route path="/" element={<AccLayout />}>
        <Route path="/browse" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/searched" element={<Searched />} />
        <Route path="/TV Shows" element={<TvShows />} />
        <Route path="/:header/genre/:genreName/:genreId" element={<GenrePage />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/myList" element={<MyList />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Route>
    </Routes>
  )
}
export default App