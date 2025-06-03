// Author: Dorian Knight
// Date: June 3rd 2025
// Description: Manage interactions on the about me page

// ############ Set cookie to set skill filter in portfolio ############ //
function setSkillCookie(id) {
    // This function takes the id of the skill clicked on and creates a cookie that can
    // later be referenced on the portfolio page where it will be used to automatically select the appripriate filter

    // Make the cookie last longer than it takes to load the portfolio page
    let expiry = new Date();
    let milliToDay = 1000*60*60*24;
    expiry.setTime(expiry.getTime()+1*milliToDay);
    document.cookie = `skill=${id}; expires=${expiry}; path=/`;
}