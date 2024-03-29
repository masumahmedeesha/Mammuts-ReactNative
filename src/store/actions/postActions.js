import Axios from 'axios'
import * as Types from './types'
import {URLS} from '../../config/urls'

export const ricodioActions = (userId, page, parsedUser) => (dispatch) => {
  Axios.get(URLS.STORIES + `${userId}?page=${page}`)
    .then((response) => {
      // console.log(response.data,'actions')
      dispatch({
        type: Types.GET_POST,
        payload: {
          posts: response.data,
          parsedUser: parsedUser,
          // total: response.data.total,
        },
      })
    })
    .catch((error) => {
      // let finalError = error.response.request._response
      console.log(error, 'error in RICORDO_ACTIONS')
      // let gg = JSON.parse(finalError)
      // dispatch({
      //   type: Types.POST_ERROR,
      //   payload: {
      //     error: gg[0],
      //   },
      // })
    })
}

export const legamiCollection = (id) => (dispatch) => {
  // console.log(URLS.LEGAMI_PERSONAL+id)
  Axios.get(URLS.LEGAMI_PERSONAL + id)
    .then((response) => {
      dispatch({
        type: Types.LEGAMI_PERSONAL,
        payload: {
          legami: response.data,
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in legamiCollection')
      // let finalError = error.response.request._response
      // let gg = JSON.parse(finalError)
      // dispatch({
      //   type: Types.POST_ERROR,
      //   payload: {
      //     error: gg[0],
      //   },
      // })
    })
}

export const legamiAddorRemove = (data) => (dispatch) => {
  Axios.post(URLS.LEGAMI_ADD_REMOVE, data)
    .then((res) => {
      if (res.data.message) {
        dispatch({
          type: Types.LEGAMI_REMOVE,
          payload: {
            removed: res.data,
          },
        })
      }
    })
    .catch((error) => console.log(error, 'legamiAddorRemove'))
}

export const postCreate = (data, parsedUserUpload) => (dispatch) => {
  dispatch({
    type: Types.UPLOAD_POST,
    payload: {
      createdData: data,
      parsedUserUpload: parsedUserUpload,
    },
  })
}

export const postDelete = (id) => (dispatch) => {
  Axios.delete(URLS.RICORDI + '/' + id)
    .then((res) => {
      dispatch({
        type: Types.REMOVE_POST,
        payload: {
          removedId: res.data.id,
        },
      })
    })
    .catch((error) => console.log(error, 'postDelete actions'))
}

export const postUpdate = (
  data,
  commentLength,
  commentUsers,
  comments,
  parsedUserUpdate,
) => (dispatch) => {
  data['commentLength'] = commentLength
  data['commentUsers'] = commentUsers
  data['comments'] = comments
  dispatch({
    type: Types.EDIT_POST,
    payload: {
      editedPost: data,
      parsedUserUpdate: parsedUserUpdate,
    },
  })
}

export const monthsCollection = (userId) => (dispatch) => {
  Axios.get(URLS.MONTH_COLLECTION + `${userId}`)
    .then((response) => {
      // console.log(response.data,'actions')
      dispatch({
        type: Types.MONTH_COLLECTION,
        payload: {
          months: response.data,
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in monthsCollection')
    })
}

export const sortByMonth = (userId, month, page, parsedUser) => (dispatch) => {
  Axios.get(URLS.SORT_BY_MONTH + `${userId}/${month}?page=${page}`)
    .then((response) => {
      // console.log(response.data,'actions')
      dispatch({
        type: Types.SORT_BY_MONTH,
        payload: {
          posts: response.data,
          parsedUser: parsedUser
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in sortByMonth')
    })
}

export const sortByMonthPaging = (userId, month, page, parsedUser) => (dispatch) => {
  Axios.get(URLS.SORT_BY_MONTH + `${userId}/${month}?page=${page}`)
    .then((response) => {
      // console.log(response.data,'actions')
      dispatch({
        type: Types.SORT_BY_MONTH_PAGING,
        payload: {
          posts: response.data,
          parsedUser: parsedUser
        },
      })
    })
    .catch((error) => {
      console.log(error, 'error in sortByMonth')
    })
}

export const selectSingleMonth = (month) => (dispatch) => {
  dispatch({
    type: Types.SINGLE_MONTH,
    payload: {
      month: month
    }
  })
}

export const refreshPosts = () => (dispatch) => {
  dispatch({
    type: Types.REFRESH_POSTS,
  })
}
