import request from 'superagent'

export function deleteUser(id) {
    return request.delete('/api/users/delete/'+id)
      .then(res => {
        return res.body})
  }