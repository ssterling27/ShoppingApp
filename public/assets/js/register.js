const { bootstrap } = window

document.getElementById('register').addEventListener('click', event => {
	event.preventDefault()
	axios.post('/api/users/register', {
		name: document.getElementById('exampleInputName1').value,
		username: document.getElementById('exampleInputEmail1').value,
		password: document.getElementById('exampleInputPassword1').value
	})
		.then(() => {
			window.location = '/login.html'
		})
		.catch(err => console.error(err))
})
