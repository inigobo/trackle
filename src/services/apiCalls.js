import axios from 'axios'
const AVATAR_ROOT = 'https://api.dicebear.com/7.x/pixel-art/svg?seed='
const GIPHY_ROOT = 'https://api.giphy.com/v1/gifs'
const GIPHY_API_KEY = process.env.GIPHY_API_KEY

export const getSGV = seed => {
  return `${AVATAR_ROOT}/${seed}.svg`
}

export const getGifsByWord = async wordleWord => {
  let config = {
    method: 'get',
    url: `${GIPHY_ROOT}/search?q=${wordleWord}&limit=4&api_key=${GIPHY_API_KEY}`,
  }
  const response = await axios(config)
  return response.data.data
}
