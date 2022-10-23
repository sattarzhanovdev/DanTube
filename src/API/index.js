import axios from "axios"

export const API = {
  getVideos: () => {
    return axios.get('/videos.json')
  },
  postVideos: (data) => {
    return axios.post('/videos.json', data)
  },
  getVideo: (id) => {
    return axios.get(`/videos/${id}.json`)
  }
}