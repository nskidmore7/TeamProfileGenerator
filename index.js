const inquirer = require("inquirer");
const fs = require("fs");
const manager = require("./lib/manager");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const pageTemplate = require("./src/page-template");

const team = [];
function addManager() {
    function managerQuestions () {
        inquirer
        .prompt([
        {
            type: "input",
            message: "What is the Manager's name?",
            name: "managerName",
        },
        {
            type: "input",
            message: "What is the Manager's email?",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "What is the Manager's phone number?",
            name: "managerNumber",
        },
        {
            type: "input",
            message: "What is the Manager's employee ID?",
            name: "managerID",
        }
    ])
    .then(Response => {
        team.push (new manager(Response.managerName, Response.managerid, Response.manageremail, Response.managerNumber))
        addMembers();
    })
}

function addMembers() {
    inquirer
    .prompt([
        {
            type: "list",
        name: "addMemberList",
        message: "Would you like to add an additional member to your team? If so select their role. If not select done.",
        choices: ["engineer", "intern", "done"]
        }
    ])

    .then(function(Response) {
        if(Response.role === "engineer") {
            engineerQuestions();
        }
        else if(Response.role === "intern") {
            internQuestions();
        }
        else if(Response.role === "done") {
            createHTML();
        }
    })
}
function engineerQuestions ()   {
    inquirer
    .prompt([
  {
        type: "input",
        message: "What is the Engineer's name?",
        name: "engineerName",
    },
    {
        type: "input",
        message: "What is the Engineer's email?",
        name: "engineerEmail",
    },
    {
        type: "input",
        message: "What is the Engineer's github username?",
        name: "engineerGithub",
    },
    {
        type: "input",
        message: "What is the Engineer's employee ID?",
        name: "engineerID",
    }
])
.then(Response => {
team.push (new engineer(Response.engineerName, Response.engineerEmail, Response.engineerGithub, Response.engineerID))
addMembers();
})
}


function internQuestions ()   {
    inquirer
    .prompt([
    {
        type: "input",
        message: "What is the Intern's name?",
        name: "internName",
    },
    {
        type: "input",
        message: "What is the Intern's email?",
        name: "internEmail",
    },
    {
        type: "input",
        message: "What is the Intern's school?",
        name: "internSchool",
    },
    {
        type: "input",
        message: "What is the Intern's employee ID?",
        name: "internID",
    },
])
.then(Response => {
    team.push (new intern(Response.internName, Response.internEmail, Response.internGithub, Response.internID))
    addMembers();
    })
    }
  managerQuestions();
}
    

function createHTML() {
    fs.writeFile("team-profile.html", pageTemplate(team), (err) => err ? console.log(err):console.log('complete'))
}

addManager();