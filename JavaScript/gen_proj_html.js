// Author: Dorian Knight
// Date: June 4th 2025
// Description: JavaScript file containing utility functions to get and generate html project strings

function generateProjectHTML(projects) {
    // Input: List of project associative arrays
    // Output: HTML structure to display projects

    var htmlString = "";
    let i=0;
    for(i; i<projects.length; i++) {
        indv_project = projects[i];
        // Start row
        if (i%2 == 0){
            htmlString += "<div class='row'>"
        }

        // Individual project data
        htmlString += "<div class='indv_project'>";

        // Project title
        htmlString +=   "<div class='project_title'>";
        htmlString +=       `${indv_project.proj_title}`;
        htmlString +=       `<img src='${indv_project.proj_icon}' alt='${indv_project.proj_title} icon' class='proj_title_icon'>`;
        htmlString +=   "</div>";

        // Project description
        htmlString +=   "<div class='project_description'>";
        htmlString +=       "<div class='text'>";
        htmlString +=           `${indv_project.proj_desc}`;
        htmlString +=       "</div>";
        htmlString +=       "<div>";
        htmlString +=           `<img src='${indv_project.proj_img}' alt='${indv_project.proj_title} image' class='project_img'>`;
        htmlString +=       "</div>";
        htmlString +=   "</div>";

        // Project skill images
        let imageMap = getSkillImageMap();
        htmlString +=   "<div class='project_skill_images'>";
        for (let j=0; j<indv_project.proj_skills.length; j++) {
            // Iterate through skills list and load in skill icons
            // Get skill icon image path from the image map variable
            htmlString +=   `<div><img src='${imageMap[indv_project.proj_skills[j]]}' alt='${indv_project.proj_skills[j]} icon' class='skill_img'></div>`;
        }
        htmlString +=   "</div>";

        // Read more
        htmlString +=   "<div class='readmore'>";
        htmlString +=       "<a href=''>"; // TODO: Come back and link back to project page documentation
        htmlString +=           "Read more";
        htmlString +=           "<img src='/images/readmore.png' alt='Read more arrow' class='readmore_arrow'>";
        htmlString +=       "</a>";
        htmlString +=   "</div>";

        // Close individual project div
        htmlString += "</div>";

        // End row
        if (i%2 == 1) {
            htmlString += "</div>";
        }
    }

    if (i%2 == 1) {
        // For loop cycled through an odd number of projects and therefore we still need to end the row
        htmlString += "</div>";
    }

    return htmlString;
}

function getSkillImageMap() {
    let skillImgRequest = new XMLHttpRequest();
    resourceLocation = "https://raw.githubusercontent.com/DorianKnight/DorianKnight.github.io/refs/heads/main/json/skillicon_info.json";
    // Synchronous request to ensure photos are present when generating html string
    skillImgRequest.open("GET", resourceLocation, false);
    skillImgRequest.send();
    let imageMap = JSON.parse(skillImgRequest.responseText)[0];
    return imageMap;
}