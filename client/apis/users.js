import request from 'superagent'


export function deleteUser(id) {
    //gives total games owned, games id and total playtime in minutes
    return request.delete('/api/users/delete/'+id)
      .then(res => {
        // console.log(res.body)
        return res.body})
  }