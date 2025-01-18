import axios from "axios"
// import { axiosInstance } from "./instance"
// async function getData() {
//     const res = await axiosInstance.get("/discover/movie?with_watch_providers=337&watch_region=US&language=en-US&sort_by=popularity.desc&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
//     return res.data.results
// }
// async function getTv() {
//     const res = await axiosInstance.get("/discover/tv?with_watch_providers=337&watch_region=US&language=en-US&sort_by=popularity.desc&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
//     return res.data.results
// }
// async function topRatedMovies() {
//     const res = await axiosInstance.get("/movie/top_rated?region=US&language=en-US&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
//     return res.data.results
// }
// async function topRatedTv() {
//     const res = await axiosInstance.get("/tv/top_rated?region=US&language=en-US&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
//     return res.data.results
// }

async function getData() {
    const res = await axios.get("https://api.themoviedb.org/3/discover/movie?with_watch_providers=337&watch_region=US&language=en-US&sort_by=popularity.desc&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
    return res.data.results
}
async function getTv() {
    const res = await axios.get("https://api.themoviedb.org/3/discover/tv?with_watch_providers=337&watch_region=US&language=en-US&sort_by=popularity.desc&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
    return res.data.results
}
async function topRatedMovies() {
    const res = await axios.get("https://api.themoviedb.org/3/movie/top_rated?region=US&language=en-US&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
    return res.data.results
}
async function topRatedTv() {
    const res = await axios.get("https://api.themoviedb.org/3/tv/top_rated?region=US&language=en-US&api_key=35f3fea26d7c6bea37a8777ddbddbed3")
    return res.data.results
}

export { getData, getTv, topRatedMovies, topRatedTv }