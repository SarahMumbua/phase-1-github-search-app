const form = document.getElementById('github-form');
const search = document.getElementById('search');
const userList = document.getElementById('user-list');
const repoList = document.getElementById('repo-list');
//add event listener to the form
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = search.value;
    const uri = `https://api.github.com/search/users?q=${searchQuery}`;
    fetch(uri)
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items)
        })
        .catch(error => {
            console.log(error);
        })
});