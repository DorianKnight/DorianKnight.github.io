// Author: Dorian Knight
// Date: May 6th 2025
// Description: Handle the transition effects on the main index.html page

// ############# CSS variables ############# //

// Colours
const theme_primary = "#486CFC";
const theme_secondary =  "#DBE5F3";
const them_highlight = "#AFF4C6";
const bash_green = "#5C8E27";
const bash_blue = "#345E91";
const light_gray = "#BEBEBE";

// Text weights/strengths
const text_bold = 600;
const text_regular = 400;
const text_light = 200;


// ############# Navigation bar hover effects ############# //
function navButtonEffect(id, navLinkChild) {
     // Add blue background and bolded white text
    console.log("Added effects");
    const navButtonElement = document.getElementById(id)
    const navTextElement = document.getElementById(navLinkChild)
    navButtonElement.style.backgroundColor = theme_primary;
    navButtonElement.style.boxShadow = `5px 3px 5px ${light_gray}`;
    navTextElement.style.color = 'white';
    navTextElement.style.fontWeight = text_bold;
}

function undoNavButtonEffect(id, navLinkChild) {
    // Returns nav button to white background and regular black text
    console.log("Removed effects");
    const navButtonElement = document.getElementById(id);
    const navTextElement = document.getElementById(navLinkChild);
    navButtonElement.style.backgroundColor = 'white';
    navButtonElement.style.boxShadow = 'none';
    navTextElement.style.color = 'black';
    navTextElement.style.fontWeight = text_regular;
}
