// login variables
const loginContainer = document.getElementById('login-container');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('login-btn');
const loginErrorMsg = document.getElementById('login-error-msg');

// navigation search variables
const navigationBar = document.getElementById('navigation-bar');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// main container variables
const mainContainer = document.getElementById('main-container');
// tab buttons variables
const allTabBtn = document.getElementById('all-tab-btn');
const openTabBtn = document.getElementById('open-tab-btn');
const closedTabBtn = document.getElementById('closed-tab-btn');

// number card variables
const totalIssues = document.getElementById('total-issue');

// card container variables
const cardContainer = document.getElementById('card-container');

// API variables
let allIssuesUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
let singleIssueUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}';
let searchIssueUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}';

// default credentials
const defaultUsername = 'admin';
const defaultPassword = 'admin123';

// variables
let allIssues = [];
let openIssues = [];
let closedIssues = [];
let currentTab = 'all';
let currentSearchText = '';

fetchAllIssues();
// event listeners
loginButton.addEventListener('click', loginAuthentication);

// login authentication function
function loginAuthentication() {
    const enteredUsrname = username.value.trim();
    const enteredPassword = password.value.trim();
    if (enteredPassword === defaultPassword && enteredUsrname === defaultUsername) {
        // alert('Login successful!');
        loginContainer.classList.add('hidden');
        navigationBar.classList.remove('hidden');
        mainContainer.classList.remove('hidden');
        fetchAllIssues();
        updateTotalIssues(currentTab);
        renderIssuesCards(currentTab);
    }
    else {
        loginErrorMsg.classList.remove('hidden');
        alert('Invalid username or password. Please try again.');
    }
}

        // fetchAllIssues().then(() => {
            // updateTotalIssues(currentTab);
            // renderIssuesCards(currentTab);
        // });


// change button color
function changeButtonColor(activeBtn) {
    allTabBtn.classList.remove('btn-primary');
    openTabBtn.classList.remove('btn-primary');
    closedTabBtn.classList.remove('btn-primary');

    activeBtn.classList.add('btn-primary');
}

allTabBtn.addEventListener('click', () => {
    currentTab = 'all';
    changeButtonColor(allTabBtn);
    fetchAllIssues();
    updateTotalIssues(currentTab);
    renderIssuesCards(currentTab);
});

openTabBtn.addEventListener('click', () => {
    currentTab = 'open';
    changeButtonColor(openTabBtn);
    fetchAllIssues();
    updateTotalIssues(currentTab);
    renderIssuesCards(currentTab);
})

closedTabBtn.addEventListener('click', () => {
    currentTab = 'closed';
    changeButtonColor(closedTabBtn);
    fetchAllIssues();
    updateTotalIssues(currentTab);
    renderIssuesCards(currentTab);
})


async function fetchAllIssues() {
    try {
        const response = await fetch(allIssuesUrl);
        if (!response.ok) {
            throw new Error("Error fetching data" + response.status);
        }
        const result = await response.json();
        allIssues = result.data;
        openIssues = allIssues.filter(issue => issue.status === 'open');
        closedIssues = allIssues.filter(issue => issue.status === 'closed');
        console.log(allIssues);
    }
    catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function renderIssuesCards(currentTab) {
    if (currentTab === 'all') {
        cardContainer.innerHTML = '';
        allIssues.forEach(issue => {
            const card = createIssueCard(issue);
            cardContainer.appendChild(card);
        })
    }
    else if (currentTab === 'open') {
        cardContainer.innerHTML = '';
        openIssues.forEach(issue => {
            const card = createIssueCard(issue);
            cardContainer.appendChild(card);
        })
    }
    else if (currentTab === 'closed') {
        cardContainer.innerHTML = '';
        closedIssues.forEach(issue => {
            const card = createIssueCard(issue);
            cardContainer.appendChild(card);
        })
    }   
}

function updateTotalIssues(currentTab) {
    if(currentTab === 'all'){
        totalIssues.textContent = allIssues.length;
    }
    else if(currentTab === 'open') {
        totalIssues.textContent = openIssues.length;
    }
    else if(currentTab === 'closed') {
        totalIssues.textContent = closedIssues.length;
    }
}

function createIssueCard(issue) {
    // variable to put in to the card
    let cardId = issue.id;
    let statusImgSrc = issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png';
    let priority = '';
    if (issue.priority === 'low') {
        priority = 'badge-success';
    }
    else if (issue.priority === 'medium') {
        priority = 'badge-warning';
    }
    else if (issue.priority === 'high') {
        priority = 'badge-error';
    }
    let title = issue.title;
    let description = issue.description;
    let labels = issue.labels;
    let author = issue.author;
    let assignee = issue.assignee;
    let createdAt = new Date(issue.createdAt).toLocaleString();
    let updatedAt = new Date(issue.updatedAt).toLocaleString();

    // create the card 
    let div = document.createElement('div');
    div.classList.add('card', 'bg-white', 'p-4', 'space-y-3', 'rounded-[5px]', 'shadow-md');
    if(issue.status === 'open') {
        div.classList.add( 'border-t-4', 'border-green-500', );
    }
    else if(issue.status === 'closed') {
        div.classList.add( 'border-t-4', 'border-purple-500', );
    }

    // label
    let divLabels = document.createElement('div');
    divLabels.classList.add('space-x-[2px]', 'space-y-[2px]', 'text-[8px]');
    if (labels.includes('bug')) {
        divLabels.innerHTML += `
        <div class="bug badge badge-soft badge-error text-[10px]">
            <i class="fa-solid fa-bug"></i> bug
        </div>
        `
    }
    if (labels.includes('help wanted')) {
        divLabels.innerHTML += `
        <div class="help badge badge-soft badge-primary text-[10px]">
            <i class="fa-solid fa-life-ring"></i> help wanted
        </div>
        `
    }
    if (labels.includes('enhancement')) {
        divLabels.innerHTML += `
        <div class="enhance badge badge-soft badge-success text-[10px]">
            <i class="fa-solid fa-wand-magic-sparkles"></i> enhancement
        </div>
        `
    }
    if (labels.includes('good first issue')) {
        divLabels.innerHTML += `
        <div class="good badge badge-soft badge-accent text-[10px]">
            <i class="fa-solid fa-clover"></i> good first issue
        </div>
        `
    }
    if (labels.includes('documentation')) {
        divLabels.innerHTML += `
        <div class="info badge badge-soft badge-info text-[10px]">
            <i class="fa-regular fa-file-lines"></i> documentation
        </div>
        `
    }

    // create card inner HTML
    div.innerHTML = `
        <!-- status part -->
        <div class="flex justify-between items-center">
            <img class="issue-status h-[25px] w-[25px]" src="${statusImgSrc}" alt="status">
            <div class="priority badge ${priority}">high</div>
        </div>

        <!-- title and descriptio part -->
        <div>
            <h3 class="title text-xl font-bold">${title}</h3>
            <p class="description text-[12px] text-gray-500">${description}</p>
        </div>

        <!-- label part -->
        <div class="space-x-[2px] space-y-[2px]">
            ${divLabels.innerHTML}
            <hr class="my-3">

            <!-- time author & assignee part -->
            <div class="flex justify-center items-center text-gray-400 text-[8px]">
                <div class="flex-1">
                    <p>#<span class="card-id">${cardId}</span> by <span class="author">${author}</span></p>
                    <p>assignee: <span class="assignee">${assignee}</span></p>
                </div>
                <div class="text-right">
                    <p>crtd: <span class="created">${createdAt}</span></p>
                    <p>uptd: <span class="created">${updatedAt}</span></p>
                </div>
            </div>
        </div>
    `
    return div;
}