

async function searchUser(username) {
    const user = await fetch(`https://api.github.com/users/${username}`);

    const repos = await fetch(`https://api.github.com/users/${username}/repos`);

    const userJson = await user.json();
    const reposJson = await repos.json();

    //Construir un objeto con los datos de user y repos
    const userData = {
        user: userJson,
        repos: reposJson
    };
    
    console.log(userData);
    return userData;

}


async function showUser(username) {
    const userInfo = await searchUser(username);
   
    const user = userInfo.user;

    const userElement = document.getElementById('user-container');

    let popularRepos = userInfo.repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5);

    userElement.innerHTML = `
        <div class="center">
            <img id="profile-img" src="${user.avatar_url}" alt="${user.name}" />
            <h1>${user.name}</h1>
        </div>
        <p id="user-bio" class="center">
            ${ user.bio ? user.bio : 'No bio available'} 
        </p>
        
        <hr>

        <div id="repos-container" class="">
            <h2>Popular repositories</h2>
            <div id="popular-repos">
        
                ${popularRepos.map(repo => `
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a> 
                `).join('')}
               
            </div>
            <p>Public repos: ${user.public_repos}</p>
        </div>

        <hr>

        <div id="social-links" class="center">
            <a href="${user.html_url}" target="_blank">
                github.com/${user.login}
            </a>
            <a href="${user.blog}" target="_blank">
                Website
            </a>
            <a href="mailto:${user.email}" target="_blank">
                ${user.email ? user.email : 'No email available'}
            </a>
        </div>

    `;

}

let input = document.getElementById('search-input').addEventListener('keyup', (e) => {
    if(e.keyCode === 13) {
        showUser(e.target.value);
    }
});
        

showUser('adriib38');