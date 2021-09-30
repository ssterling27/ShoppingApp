const { bootstrap } = window

document.getElementById('login').addEventListener('click', event => {
	event.preventDefault()

	axios.post('/api/users/login', {
		username: document.getElementById('exampleInputEmail1').value,
		password: document.getElementById('exampleInputPassword1').value
	})
		.then(({ data: token }) => {
			if (token) {
				localStorage.setItem('token', token)
				window.location = '/'
			} else {
				console.log('login failed')
			}
		})
		.catch(err => console.error(err))
})
