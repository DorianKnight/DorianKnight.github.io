// ############# Project type effects ############# //

// Associative array with ID as key and javascript object as value
// First element is presistent counter of how many buttons are in pressed state
// JavaScript object structure:
// ** Pressed state
// ** HTML element
const list_of_type_selectors = new Object();
const list_of_tag_selectors  = new Object();

list_of_type_selectors["selectors_pressed"] = 0;
list_of_tag_selectors["selectors_pressed"]  = 0;

function create_filter_button_objects() {
    all_type_selectors = document.getElementsByClassName("type_selector");
    all_tag_selectors = document.getElementsByClassName("tag_selector");

    // For loop for type selectors
    for(let i=0; i<all_type_selectors.length; i++) {
        // Get HTML collection
        indv_type_selector = all_type_selectors[i];

        // Generate value
        type_selector_object = new Object();
        type_selector_object.pressed_state = 0; // Not pressed
        type_selector_object.html_element = indv_type_selector;

        // Generate key
        type_selector_id = indv_type_selector.id;

        // Add key value pair to associative array
        list_of_type_selectors[type_selector_id] = type_selector_object;
    }

    // For loop for tag selectors
    for(let i=0; i<all_tag_selectors.length; i++) {
        // Get HTML collection
        indv_tag_selector = all_tag_selectors[i];

        // Generate value
        tag_selector_object = new Object();
        tag_selector_object.pressed_state = 0; // Not pressed
        tag_selector_object.html_element = indv_tag_selector;

        // Generate key
        tag_selector_id = indv_tag_selector.id;

        // Add key value pair to associative array
        list_of_tag_selectors[tag_selector_id] = tag_selector_object;
    }
}

function proj_type_hover_effect(id) {
    proj_type = document.getElementById(id);
    proj_type.style.border = "solid";
    proj_type.style.borderColor = theme_secondary;
    proj_type.style.borderRadius = "3vw";
    proj_type.style.boxShadow = `5px 3px 5px ${light_gray}`;
    document.getElementById(id).style.cursor = "pointer";
}

function undo_proj_type_hover_effect(id) {
    proj_type = document.getElementById(id);
    proj_type.style.borderColor = "transparent";
    proj_type.style.boxShadow = 'none';
    document.getElementById(id).style.cursor = "default";
}

function proj_type_click_effect(id) {
    // Get button object from type selector list
    proj_type_obj = list_of_type_selectors[id];
    proj_type_element = proj_type_obj.html_element;
    if (proj_type_obj.pressed_state == 0) {
        // Change style to pressed
        proj_type_element.style.backgroundColor = theme_secondary;
        proj_type_element.style.border = "solid";
        proj_type_element.style.borderColor = theme_secondary;
        proj_type_element.style.borderRadius = "3vw";
        // Change state to pressed state
        proj_type_obj.pressed_state = 1;

        // Update pressed counter variable
        list_of_type_selectors["selectors_pressed"] += 1;
    }

    else if (proj_type_obj.pressed_state == 1) {
        // Change style to depressed state
        proj_type_element.style.backgroundColor = "transparent";

        // Change state to depressed state
        proj_type_obj.pressed_state = 0;

        // Update pressed counter variable
        list_of_type_selectors["selectors_pressed"] -= 1;
    }
    getAllProjects()
    update_type_clear();
}

// ############# Project tag effects ############# //

function skill_hover_effect(id) {
    skill_tag = document.getElementById(id);
    skill_tag.style.border = "solid";
    skill_tag.style.borderColor = theme_highlight;
    skill_tag.style.borderRadius = "3vw";
    skill_tag.style.boxShadow = `5px 3px 5px ${light_gray}`;
    document.getElementById(id).style.cursor = "pointer";
}

function undo_skill_hover_effect(id) {
    skill_tag = document.getElementById(id);
    skill_tag.style.borderColor = "transparent";
    skill_tag.style.boxShadow = 'none';
    document.getElementById(id).style.cursor = "default";
}

function skill_click_effect(id) {
    // Get button object from tag selector list
    skill_tag_obj = list_of_tag_selectors[id];
    skill_tag_element = skill_tag_obj.html_element;
    if (skill_tag_obj.pressed_state == 0) {
        // Change style to pressed
        skill_tag_element.style.backgroundColor = theme_highlight;
        skill_tag_element.style.border = "solid";
        skill_tag_element.style.borderColor = theme_highlight;
        skill_tag_element.style.borderRadius = "3vw";
        // Change state to pressed state
        skill_tag_obj.pressed_state = 1;

        // Update pressed counter variable
        list_of_tag_selectors["selectors_pressed"] += 1;
    }

    else if (skill_tag_obj.pressed_state == 1) {
        // Change style to depressed state
        skill_tag_element.style.backgroundColor = "transparent";

        // Change state to depressed state
        skill_tag_obj.pressed_state = 0;

        // Update pressed counter variable
        list_of_tag_selectors["selectors_pressed"] -= 1;
    }
    getAllProjects()
    update_tag_clear();
}

// ############# Clear type/tags ############# //

function update_type_clear() {
    // If one or more project types are selected, activate the clear filter button

    clear_type_button = document.getElementById("type_clear");
    clear_type_icon = document.getElementById("type_clear_icon");
    if (list_of_type_selectors["selectors_pressed"] > 0) {
        // More than one tag is pressed, active the clear filter button
        clear_type_button.style.color = "red";
        clear_type_icon.style.backgroundImage = "url(/images/remove_active.png)"
    }

    else {
        // No tags pressed, deactive the clear filter button
        clear_type_button.style.color = light_gray;
        clear_type_icon.style.backgroundImage = "url(/images/remove_inactive.png)";
        clear_type_button.style.backgroundColor = "transparent";
        document.getElementById("type_clear").style.cursor = "default";
    }

    console.debug("Currently have " + list_of_type_selectors["selectors_pressed"] + " project type(s) selected");
}

function update_tag_clear() {
    // If one or more tags are selected, activate the clear filter button

    clear_tag_button = document.getElementById("tag_clear");
    clear_tag_icon = document.getElementById("tag_clear_icon");
    if (list_of_tag_selectors["selectors_pressed"] > 0) {
        // More than one tag is pressed, active the clear filter button
        clear_tag_button.style.color = "red";
        clear_tag_icon.style.backgroundImage = "url(/images/remove_active.png)"
    }

    else {
        // No tags pressed, deactive the clear filter button
        clear_tag_button.style.color = light_gray;
        clear_tag_icon.style.backgroundImage = "url(/images/remove_inactive.png)";
        clear_tag_button.style.backgroundColor = "transparent";
        document.getElementById("tag_clear").style.cursor = "default";
    }

    console.debug("Currently have " + list_of_tag_selectors["selectors_pressed"] + " project tag(s) selected");
}

function type_clear_hover() {
    // Only activate hover effect if button is enabled
    if (list_of_type_selectors["selectors_pressed"] > 0) {
        type_clear = document.getElementById("type_clear");
        type_clear_icon = document.getElementById("type_clear_icon");
        type_clear.style.backgroundColor = "red";
        type_clear.style.color = "white"; // Change text to white to improve readibility
        type_clear_icon.style.backgroundImage = 'url(/images/remove_hover.png)';

        document.getElementById("type_clear").style.cursor = "pointer";
    }
}

function undo_type_clear_hover() {
    type_clear = document.getElementById("type_clear");
    type_clear_icon = document.getElementById("type_clear_icon");
    if (list_of_type_selectors["selectors_pressed"] > 0) {
        type_clear.style.backgroundColor = "transparent";
        type_clear.style.color = "red"; // Change text color back to imrove readibility
        type_clear_icon.style.backgroundImage = 'url(/images/remove_active.png)';
    }
}

function tag_clear_hover() {
    // Only activate hover effect if button is enabled
    if (list_of_tag_selectors["selectors_pressed"] > 0) {
        tag_clear = document.getElementById("tag_clear");
        tag_clear_icon = document.getElementById("tag_clear_icon");
        tag_clear.style.backgroundColor = "red";
        tag_clear.style.color = "white" // Change text to white to improve readibility
        tag_clear_icon.style.backgroundImage = 'url(/images/remove_hover.png)';

        document.getElementById("tag_clear").style.cursor = "pointer";
    }
}

function undo_tag_clear_hover() {
    if (list_of_tag_selectors["selectors_pressed"] > 0) {
        tag_clear = document.getElementById('tag_clear');
        tag_clear.style.backgroundColor = "transparent";
        tag_clear_icon = document.getElementById("tag_clear_icon");
        tag_clear.style.backgroundColor = "transparent";
        tag_clear.style.color = "red"; // Change text color back to imrove readibility
        tag_clear_icon.style.backgroundImage = 'url(/images/remove_active.png)';
    }
}

function clear_all_types() {
    // Only activate if clear filter button is enabled
    // When clear filter under "filter by type" is pushed, deselect all selected tags
    if (list_of_type_selectors["selectors_pressed"] > 0) {
        all_type_selectors = document.getElementsByClassName("type_selector");
        for (let i=0; i<all_type_selectors.length; i++) {
            // Go through and 'manually' unclick all type filter buttons
            type_selector_id = all_type_selectors[i].id;
            type_selector = list_of_type_selectors[type_selector_id];
            if (type_selector.pressed_state == 1) {
                proj_type_click_effect(type_selector_id);
            }
        }
    }
}

function clear_all_tags() {
    // Only activate if clear filter button is enabled
    // When clear filter under "filter by type" is pushed, deselect all selected tags
    if (list_of_tag_selectors["selectors_pressed"] > 0) {
        all_tag_selectors = document.getElementsByClassName("tag_selector");
        for (let i=0; i<all_tag_selectors.length; i++) {
            // Go through and 'manually' unclick all type filter buttons
            tag_selector_id = all_tag_selectors[i].id;
            tag_selector = list_of_tag_selectors[tag_selector_id];
            if (tag_selector.pressed_state == 1) {
                skill_click_effect(tag_selector_id);
            }
        }
    }
}

// ############# Filter title type/tags effects ############# //
function filterDropShadow() {
    scrollableDiv = document.getElementById("filters");
    type_filter_title = document.getElementById("type_header");
    tag_filter_title = document.getElementById("tag_header");

    tag_relative_pos = tag_filter_title.getBoundingClientRect().top - scrollableDiv.getBoundingClientRect().top;

    // Check if tag drop shadow should be rendered first
    if (tag_relative_pos < 40) {
        // Display tag drop shadow
        tag_filter_title.style.boxShadow = `0px 2px 5px ${theme_highlight}`;

        // Turn type title invisible
        type_filter_title.style.opacity = 0;
    }

    else {
        tag_filter_title.style.boxShadow = 'none';
        type_filter_title.style.opacity = 1;
    }

    if (scrollableDiv.scrollTop > 3) {
        // Display type drop shadow
        type_filter_title.style.boxShadow = `0px 5px 5px ${theme_secondary}`;
    }

    else {
        type_filter_title.style.boxShadow = 'none';
    }
    setTimeout(filterDropShadow, 50);
}

// ############# Portfolio Content HTML generation ############# //

function getAllProjects() {
    // Returns all project JSON data stored on server
    var jsonfileLocation = "https://raw.githubusercontent.com/DorianKnight/DorianKnight.github.io/refs/heads/main/json/project_info.json";
    var projectRequest = new XMLHttpRequest();
    projectRequest.open("GET", jsonfileLocation);
    projectRequest.send();
    projectRequest.onload = function() {
        const allProjects = JSON.parse(projectRequest.responseText);

        // Filter projects
        filteredProjects = filterProjectList(allProjects);

        // Update HTML of portfolio content
        projPortfolioHTML = generateProjectHTML(filteredProjects);
        if (projPortfolioHTML == "") {
            projPortfolioHTML = "<style>.no_projects {width: fit-content; margin: 5vw auto; font-size: var(--medium-size);}</style><div class='no_projects'>There are no projects that match the specified tags</div>";
        }

        let portfolioContentDiv = document.getElementById("portfolio_content");
        portfolioContentDiv.innerHTML = projPortfolioHTML;
    }
}

function filterProjectList(allProjects) {
    // Find out which filters are actively selected
    typeFilters = findSelectedFilters(list_of_type_selectors);
    tagFilters = findSelectedFilters(list_of_tag_selectors);

    // Filter project list keeping the filter tags in mind
    filteredProjectList = [];
    for (let i=0; i<allProjects.length; i++) {
        let candidateProject = allProjects[i];

        // Projects need to match all type and tag filters
        // Projects will still pass if they have more than the filters ask for

        typeFilterPass = checkAgainstSelectors(typeFilters, candidateProject, "proj_type");
        tagFilterPass = checkAgainstSelectors(tagFilters, candidateProject, "proj_skills");

        if (typeFilterPass && tagFilterPass) {
            // Project passed filters, add it to the list
            filteredProjectList.push(candidateProject);
        }
    }

    console.debug("Project types selected", typeFilters);
    console.debug("Project skills selected", tagFilters);
    console.debug("After applying filters, ", filteredProjectList.length, " project(s) passed the filter");

    return filteredProjectList;
}


function findSelectedFilters(list_of_selectors) {
    // Iterate through the type filters and return an array containing all the type fitlers that have been selected
    filterKeys = Object.keys(list_of_selectors).slice(1); // Slice from second element until end to skip "selectors_pressed"

    pressed_filters = [];

    for (let i=0; i<filterKeys.length; i++) {
        if (list_of_selectors[filterKeys[i]].pressed_state == 1) {
            // Filter has been selected, add it to pressed type filters list
            pressed_filters.push(filterKeys[i]);
        }
    }

    return pressed_filters;

}

function checkAgainstSelectors(filterArr, candidateProject, selector_list) {
    /* The purpose of this function is to ensure all fillters specified in the filter array
     * are present within the candidate project's JSON description
     *
     * If a required filter is missing for any reason, the project will not pass the filter
     * If a project passes the filter but also has tags that are not specified in the filter array, the project will still pass
     */

    // Assume project passes filter and prove false
    let filterPass = true;

    for (let j=0; j<filterArr.length; j++) {
        selectorToCheckAgainst = filterArr[j];
        let selectorMatch = false;
        for (let k=0; k<candidateProject[selector_list].length; k++) {
            if (candidateProject[selector_list][k] == selectorToCheckAgainst) {
                // Selector found within project json
                selectorMatch = true;
            }
        }

        if (selectorMatch == false) {
            // Desired tag was not found within the project json data; project does not pass filter
            filterPass = false;
            break;
        }
    }

    return filterPass;
}

// ############# Fetches filters from JSON ############# //

function getTypeFilters() {
    // Search project_types.JSON and programmatically generate html structure for the type filter section

    let typeFiltersRequest = new XMLHttpRequest();
    resourceLocation = "https://raw.githubusercontent.com/DorianKnight/DorianKnight.github.io/refs/heads/main/json/project_types.json";
    // Synchronous request
    typeFiltersRequest.open("GET", resourceLocation, false);
    typeFiltersRequest.send();

    typeFilters = JSON.parse(typeFiltersRequest.responseText)[0]['types'];

    // Iterate over types and generate html text
    htmlString = "";
    for(let i=0; i<typeFilters.length; i++) {
        htmlString += `<div class='type_selector' id='${typeFilters[i]}' onmouseenter='proj_type_hover_effect(id)' onmouseleave='undo_proj_type_hover_effect(id)' onclick='proj_type_click_effect(id)'>${typeFilters[i]}</div>`;
    }

    // Render HTML in browser
    typeFilterDiv = document.getElementById("type_filters");
    typeFilterDiv.innerHTML = htmlString;
}

function getTagFilters() {
    // Search skillicon_info.json and programmatically generate html structure for the skill filter section

    let tagFiltersRequest = new XMLHttpRequest();
    resourceLocation = "https://raw.githubusercontent.com/DorianKnight/DorianKnight.github.io/refs/heads/main/json/skillicon_info.json";
    // Synchronous request
    tagFiltersRequest.open("GET", resourceLocation, false);
    tagFiltersRequest.send();

    tagFilters = JSON.parse(tagFiltersRequest.responseText)[0];
    // Extract keys
    skillTags = Object.keys(tagFilters);

    // Iterate over skill tags and generate html text
    htmlString = "";
    for(let i=0; i<skillTags.length; i++) {
        htmlString += `<div class='tag_selector' id='${skillTags[i]}' onmouseenter='skill_hover_effect(id)' onmouseleave='undo_skill_hover_effect(id)' onclick='skill_click_effect(id)'>${skillTags[i]}</div>`;
    }

    tagFilterDiv = document.getElementById("tag_filters");
    tagFilterDiv.innerHTML = htmlString;
}

// ############# Generate skill legend ############# //
function printSkillLegend() {
    allSkills = getSkillImageMap();
    skillKeys = Object.keys(allSkills);
    htmlString = "";
    for(let i=0; i<skillKeys.length; i++) {
        htmlString += "<div class='legend_element'>";
        htmlString +=   `<img class='skill_img' src='${allSkills[skillKeys[i]]}' alt='${skillKeys[i]} icon'>`;
        htmlString +=   `<div class='legend_text'>${skillKeys[i]}</div>`;
        htmlString += "</div>";
    }

    // Fetch div element to render html string
    skill_legend_div = document.getElementById("skill_icon_legend");
    skill_legend_div.innerHTML = htmlString;
}

// ############# Auto apply filter from aboutme page ############# //
function autoApplySkillFilter() {
    // Read saved cookie to find out which skill was clicked
    selectedSkillId = getSkillCookie();

    // Find selected skill and apply filter
    if (selectedSkillId.length != 0) {
        tagKeys = Object.keys(list_of_tag_selectors);
        for (let i=0; i<tagKeys.length; i++) {
            if (tagKeys[i] == selectedSkillId) {
                // Auto click the button
                skill_click_effect(selectedSkillId);
            }
        }
    }
}

function getSkillCookie() {
    let selectedSkill = "";
    let brokenCookie = decodeURIComponent(document.cookie).split('=');
    if (brokenCookie[0] == "skill"){
        selectedSkill = brokenCookie[1];
    }

    // Delete the cookie as it is no longer needed
    oldDate = new Date()
    oldDate.setTime(oldDate.getTime() - 1*1000*60*60*48);
    document.cookie = `skill= ; expires=${oldDate}; path=/`;

    return selectedSkill;
}


getAllProjects();
getTypeFilters();
getTagFilters();
printSkillLegend();
create_filter_button_objects();
filterDropShadow();
autoApplySkillFilter();
