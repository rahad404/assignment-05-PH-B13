// login variables
const loginContainer = document.getElementById('login-container');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('login-btn');
const loginErrorMsg = document.getElementById('login-error-msg');

// navigation search variables
const navigationBar =document.getElementById('navigation-bar');
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// main container variables
const mainContainer = document.getElementById('main-container');
// tab buttons variables
const allTabBtn = document.getElementById('all-tab-btn');
const OpenTabBtn = document.getElementById('open-tab-btn');
const closedTabBtn = document.getElementById('closed-tab-btn');

// number card variables
const totalIssues = document.getElementById('total-issues');

// API variables
allIssuesUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';
singleIssueUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}';
searchIssueUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}';

// global variables
let allIssues = [];
let openIssues = [];
let closedIssues = [];
let currentTab = 'all';
let currentSearchText = '';

// default credentials
const defaultUsername = 'admin';
const defaultPassword = 'admin123';

// event listeners
loginButton.addEventListener('click', loginAuthentication);

function loginAuthentication() {
    const enteredUsrname = username.value.trim();
    const enteredPassword = password.value.trim();
    if(enteredPassword === defaultPassword && enteredUsrname === defaultUsername){
        alert('Login successful!');
        loginContainer.classList.add('hidden');
        navigationBar.classList.remove('hidden');
        mainContainer.classList.remove('hidden');
        fetchAllIssues(); // yet to implement
    }
    else{
        loginErrorMsg.classList.remove('hidden');
        alert('Invalid username or password. Please try again.');
    }
}