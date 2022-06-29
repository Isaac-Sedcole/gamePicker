import request from 'superagent'

export function deleteUser(id) {
    return request.delete('/api/users/delete/'+id)
      .then(res => {
        return res.body})
  }

  export function editUsersLink(id, profile) {
    return request.patch('/api/users/edit/'+id)
    .send(profile)
    .then(res => {
      return res.body
    })
  }