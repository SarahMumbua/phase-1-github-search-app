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
            console.log(data);
            console.log(data.items);
            displayUsers(data.items)
        })
        .catch(error => {
            console.log(error);
        })
});
//display search results
function displayUsers(users){
    userList.innerHTML ='';
    users.forEach(user => {
        const li = document.createElement("li");
        const userName =document.createElement("span");
        const avatar = document.createElement("img");
        const profileLink = document.createElement("a");
        userName.innerText = user.login;
        avatar.src = user.avatar_url;
        profileLink.href =user.html_url;
        profileLink.innerText ="view Profile";

        li.appendChild(userName);
        li.appendChild(avatar);
        li.appendChild(profileLink);
        userList.appendChild(li);

        li.addEventListener('click',()=>{
          displayRepos(user.repos_url)
        })
    });
}
//display list of repositories for the user
function displayRepos(reposUrl) {
    fetch(reposUrl)
      .then(response => response.json())
      .then(data => {
        reposList.innerHTML = '';
        
        data.forEach(repo => {
          const li = document.createElement('li');
          const repoName = document.createElement('span');
          const repoLink = document.createElement('a');
  
          repoName.innerText = repo.name;
          repoLink.href = repo.html_url;
          repoLink.innerText = 'View Repo';
  
          li.appendChild(repoName);
          li.appendChild(repoLink);
  
          reposList.appendChild(li);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }