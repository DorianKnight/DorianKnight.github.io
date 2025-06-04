// Author: Dorian Knight
// Date: June 3rd 2025
// Description: Javascript to manage interactive events on main page

/* ############# Dynamically load highlighted html projects ############# */
const projects_to_highlight = ["Traffic light PCB", "Project 2"]

function getProjectJSON() {
    // Input: projects to highlight as array of strings
    // Output: Array of Project JSON from github pages

    projectJSON = [];
    allProjectsRequest = new XMLHttpRequest();
    let resourceLocation = "https://raw.githubusercontent.com/DorianKnight/DorianKnight.github.io/refs/heads/main/json/project_info.json";
    allProjectsRequest.open("GET", resourceLocation, false);
    allProjectsRequest.send();
    allProjectsJSON = JSON.parse(allProjectsRequest.responseText);

    for (let i=0; i<projects_to_highlight.length; i++) {
        let project_to_find = projects_to_highlight[i];
        for (let j=0; j<allProjectsJSON.length; j++) {
            if (project_to_find == allProjectsJSON[j]["proj_title"]){
                projectJSON.push(allProjectsJSON[j]);
            }
        }
    }

    // Error handling
    if (projectJSON.length < projects_to_highlight.length) {
        console.debug("Not all highlighted projects were found");
    }

    return projectJSON;
}

function displayHighlightedProjects() {
    JSONInfo = getProjectJSON();
    htmlString = generateProjectHTML(JSONInfo);

    displayDiv = document.getElementById("highlighted_content_div");
    if (htmlString == "") {
        displayDiv.innerHTML = "There are currently no projects to highlight"
    }

    else {
        displayDiv.innerHTML = htmlString;
    }
}

displayHighlightedProjects();
