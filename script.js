// login variables
const loginContainer = document.getElementById('login-container');
const username = document.getElementById('username');
const password = document.getElementById('password');
const loginButton = document.getElementById('login-btn');

// navigation search variables
const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

// main container variables
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

