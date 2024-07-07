function byid(elmid) {
    return document.getElementById(elmid);
}
function onecss(elmcss) {
    return document.querySelector(elmcss);
}
/*

repo
    name
    one line desc
    github link
    core
    plans
        type (dev, bug, enhancement, question)
        description
        details

*/

class Repo {
    constructor(name, oneLineDesc, githubLink, core) {
        this.name = name;
        this.oneLineDesc = oneLineDesc;
        this.githubLink = githubLink;
        this.core = core;
        this.plans = [];
    }
}

let repos = JSON.parse(localStorage.getItem("repos") || "[]");

function addPlan(repo, ptype, desc, details) {
    repo.plans.push({
        ptype: ptype,
        desc: desc,
        details: details,
    });
}

function saveRepos() {
    localStorage.setItem("repos", JSON.stringify(repos));
}

function countPlanType(repo, ptype) {
    return repo.plans.filter((p) => p.ptype == ptype).length;
}
