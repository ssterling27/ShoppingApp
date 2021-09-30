axios.get('/api/items', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
.then(({data: items}) => {
  items.forEach(item => {
    const itemElem = document.createElement('div')
    itemElem.classList = 'col-sm-3'
    itemElem.style = 'margin-top: 25px;'
    itemElem.innerHTML = `
    <div class="card">
      <div class="card-body" id=${item._id}>
        <h5 class="card-title" style="margin-bottom: 20px;">${item.text}</h5>
        <p><a type="button" class="btn btn-info" href="${item.shopping_link}">Shopping Link</a></p>
        <p><a type="button" class="btn btn-danger" href="${item.video_link}">Video Link</a><p>
    `
    document.getElementById('appearHere').append(itemElem)
  })
})
.catch(err => window.location = '/login.html')

document.getElementById('add').addEventListener('click', event => {
  event.preventDefault()
  let task = document.getElementById('product').value
  let shoppingLink = document.getElementById('shoppingLink').value
  let videoLink = document.getElementById('videoLink').value
  axios.post('/api/items', {
    text: task,
    shopping_link: shoppingLink,
    video_link: videoLink
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(({data: item}) => {
    const itemElem = document.createElement('div')
    itemElem.classList = 'col-sm-3'
    itemElem.style = 'margin-top: 25px;'
    itemElem.innerHTML = `
    <div class="card">
      <div class="card-body" id=${item._id}>
        <h5 class="card-title" style="margin-bottom: 20px;">${item.text}</h5>
        <p><a type="button" class="btn btn-info" href="${item.shopping_link}">Shopping Link</a></p>
        <p><a type="button" class="btn btn-danger" href="${item.video_link}">Video Link</a><p>
    `
    document.getElementById('appearHere').append(itemElem)
    document.getElementById('product').value = ''
    document.getElementById('shoppingLink').value = ''
    document.getElementById('videoLink').value = ''
  })
  .catch(err => console.log(err))
})