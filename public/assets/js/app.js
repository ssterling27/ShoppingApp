axios.get('/api/items')
.then(({data: items}) => {
  items.forEach(item => {
    const itemElem = document.createElement('div')
    itemElem.classList = 'col-sm-3'
    itemElem.style = 'margin-top: 25px;'
    itemElem.innerHTML = `
    <div class="card">
      <div class="card-body" id=${item._id}>
        <h5 class="card-title" style="margin-bottom: 20px;">${item.text}</h5>
        ${item.isDone ? '<button type="button" class="btn btn-info isDone">Done</button>' : '<button type="button" class="btn btn-warning isDone">Not Done</button>'}
        <button type="button" class="btn btn-danger delete">Delete</button>
    `
    document.getElementById('appearHere').append(itemElem)
  })
})
.catch(err => console.log(err))

document.getElementById('add').addEventListener('click', event => {
  event.preventDefault()
  let task = document.getElementById('task').value
  axios.post('/api/items', {
    text: task,
    isDone: false
  })
  .then(({data: item}) => {
    const itemElem = document.createElement('div')
    itemElem.classList = 'col-sm-3'
    itemElem.style = 'margin-top: 25px;'
    itemElem.innerHTML = `
    <div class="card">
      <div class="card-body" id=${item._id}>
        <h5 class="card-title" style="margin-bottom: 20px;">${item.text}</h5>
        ${item.isDone ? '<button type="button" class="btn btn-info isDone">Done</button>' : '<button type="button" class="btn btn-warning isDone">Not Done</button>'}
        <button type="button" class="btn btn-danger delete">Delete</button>
    `
    document.getElementById('appearHere').append(itemElem)
    document.getElementById('task').value = ''
  })
  .catch(err => console.log(err))
})

document.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    axios.delete(`/api/items/${event.target.parentNode.id}`)
    .then(() => {
      event.target.parentNode.parentNode.parentNode.remove()
    })
  }
  if (event.target.classList.contains('isDone')) {
    switch(event.target.innerText) {
      case 'Done':
        axios.put(`/api/items/${event.target.parentNode.id}`, {
          isDone: false
        })
        .then(() => {
          event.target.innerText = 'Not Done'
          event.target.classList = 'btn btn-warning isDone'
        })
        .catch(err => console.log(err))
        break;
      case 'Not Done':
        axios.put(`/api/items/${event.target.parentNode.id}`, {
          isDone: true
        })
          .then(() => {
            event.target.innerText = 'Done'
            event.target.classList = 'btn btn-info isDone'
          })
          .catch(err => console.log(err))
        break;
    }
  }
})