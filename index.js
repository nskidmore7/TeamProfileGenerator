const inquirer = require("inquirer");
const fs = require("fs");
const manager = require("./lib/manager");
const engineer = require("./lib/engineer");
const intern = require("./lib/intern");
const pgTemplate = require("./src/page-template");
const { COMPLETIONSTATEMENT_TYPES } = require("@babel/types");
const pageTemplate = require("./src/page-template");

const managerQuestions = [
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
    },
];
const engineerQuestions = [
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
    },
];
const internQuestions = [
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
];

const addMembers = [
    {
        type: "list",
        name: "addMemberList",
        message: "Would you like to add an additional member to your team? If so select their role. If not select done.",
        choices: ["engineer", "intern", "done"],
    },
];

const team = [];
const init = () => {
    inquirer
        .prompt(managerQuestions)
        .then((r) => {
            let newManager = new manager (
                r.managerName,
                r.managerEmail,
                r.managerNumber,
                r.managerID
            );
                team.push(newManager);
        })
        .then(() => {
        addMemInit();
    })
    .catch(() => {
        console.log("Try Again");
    });
};

const addMemInit = () => {
    inquirer
        .prompt(addMembers)
        .then((response) => {
            if (response.addMemSelect === "engineer") {
                inquirer
                .prompt(engineerQuestions)
                .then((r) => {
                    let newEngineer = new engineer (
                        r.engineerName,
                        r.engineerEmail,
                        r.engineerGithub,
                        r.engineerID
                    );
                    team.push(newEngineer);
                    addMemInit();
                })
                .catch();
            }
            if (response.addMemSelect === "intern") {
                inquirer
                .prompt(internQuestions)
                .then((r) => {
                    let newIntern = new intern (
                        r.internName,
                        r.internEmail,
                        r.internSchool,
                        r.internID
                    );
                    team.push(newIntern);
                    addMemInit();
                })
                .catch();
            }
            if (response.addMemSelect === "done") {
                finish(team);
            }
        })
        .catch(() => {
            console.log("Try Again");
        });
};

const finish = (team) => {
    fs.writeFile("./dist/team.html", pageTemplate(team), (err) => {
        if (err) {
            return console.error(err);
        }
    });
};

init();