import axios from '@/utils/myaxios.js'
export const getPostList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 获得栏目列表
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}
