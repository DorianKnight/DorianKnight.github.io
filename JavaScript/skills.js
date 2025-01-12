// Author: Dorian Knight
// Date: December 14th 2024
// Description: Provides the interactive javascript on the skill tree page

// All skills in skill tree: [skill object, skill object information box]
const skill_objects = [
    ['inquiry'        , 'inquiry_info', ],
    ['data_structures', 'datastr_info'],
    ['cellbio'        , 'cellbio_info'],
    ['clang'          , 'clang_info'],
    ['signal_analysis', 'signals_info'],
    ['orgchem'        , 'orgchem_info'],
    ['stats'          , 'stats_info'],
    ['critap'         , 'critap_info'],
    ['geneticeng'     , 'geneticeng_info'],
    ['anatphys'       , 'anatphys_info'],
    ['research'       , 'research_info'],
    ['electrochem'    , 'electrochem_info'],
    ['vectorcalc'     , 'vectorcalc_info'],
    ['diffeqns'       , 'diffeqns_info'],
    ['linalg'         , 'linalg_info'],
    ['datasql'        , 'datasql_info'],
    ['embdesign'      , 'embdesign_info'],
    ['pcbdesign'      , 'pcbdesign_info'],
    ['python'         , 'python_info'],
    ['webdev'         , 'webdev_info'],
    ['devops'         , 'devops_info'],
    ['docker'         , 'docker_info'],
    ['jenkins'        , 'jenkins_info'],
    ['electromag'     , 'electromag_info'],
    ['compdyn'        , 'compdyn_info'],
    ['statics'        , 'statics_info'],
]

function updateInfoBoxPos() {
    const info_box_padding = 50

    // Iterate over every skill object in skill tree
    for (let i=0; i<skill_objects.length; i++) {
        // Check for opacity before running calculation
        if (window.getComputedStyle(document.getElementById(skill_objects[i][1])).getPropertyValue("opacity") > 0) {
            // Get the elements of interest
            const skillObject = document.getElementById(skill_objects[i][0])
            const skillObjectInfo = document.getElementById(skill_objects[i][1])

            // Get the bounding rectangles of interest
            const skillObjectPos = skillObject.getBoundingClientRect()
            const skillObjectInfoPos = skillObjectInfo.getBoundingClientRect()

            // Align the information box dependant on where the skill object is in the viewport
            if ((skillObjectPos.top - skillObjectInfoPos.height/2) <= 0 ) {
                // Align the top of the information box a fixed distance away from the top
                skillObjectInfo.style.top = `${info_box_padding}px`
            }

            // If the bottom of the information box would intersect with the padding zone at the bottom of the view port
            else if ((skillObjectPos.top + skillObjectInfoPos.height/2 + skillObjectPos.height/2) >= window.innerHeight-info_box_padding) {
                // Align the top of the information box a fixed distance away from the bottom
                skillObjectInfo.style.top = `${window.innerHeight - skillObjectInfoPos.height - info_box_padding/2}px`
            }

            else {
                // Align middle of info box to middle of hovered item
                skillObjectInfo.style.top = `${skillObjectPos.top + skillObjectPos.height/2 - skillObjectInfoPos.height/2}px`
            }

        }
    }

    // Update every 10 milliseconds
    setTimeout(updateInfoBoxPos, 10)
}

const required_connections = [
    // Root to left and right
    ["root", "inquiry",         "left", "different"],
    ["root", "cellbio",         "left", "sameRht"],
    ["root", "orgchem",         "left", "different"],

    ["root", "vectorcalc",      "right", "different"],
    ["root", "diffeqns",        "right", "different"],
    ["root", "linalg",          "right", "different"],
    ["root", "clang",           "right", "different"],
    ["root", "embdesign",       "right", "sameLft"],
    ["root", "signal_analysis", "right", "different"],
    ["root", "data_structures", "right", "different"],
    ["root", "python",          "right", "different"],
    ["root", "webdev",          "right", "different"],
    ["root", "datasql",         "right", "different"],
    ["root", "devops",          "right", "different"],
    ["root", "electromag",      "right", "different"],
    ["root", "compdyn",         "right", "different"],
    ["root", "statics",         "right", "different"],

    // Biomedical Eng
    ["inquiry", "critap",     "left", "sameRht"],
    ["inquiry", "stats",      "left", "different"],
    ["cellbio", "geneticeng", "left", "sameRht"],
    ["cellbio", "anatphys",   "left", "different"],
    ["stats", "research",     "left", "sameRht"],

    // Chem
    ["orgchem", "electrochem", "left", "sameRht"],

    // Math

    // Embedded systems
    ["embdesign", "pcbdesign", "right", "sameRht"],

    // Software
    ["devops", "docker",  "right", "sameLft"],
    ["devops", "jenkins", "right", "different"],
]

function drawBezierCurves() {
    // Draw the curved connecting arrows

    // Initialize canvas
    const canvas = document.getElementById("connecting_arrows")
    const ctx = canvas.getContext("2d")

    skillTree = document.getElementById("skill_tree_grid_container")
    skillTreePos = skillTree.getBoundingClientRect()

    websiteBody - document.getElementById("websiteBody")
    websiteBodyPos = websiteBody.getBoundingClientRect()

    canvas.width = websiteBodyPos.width
    canvas.height = websiteBodyPos.height

    // Draw all arrows to connect each pair of elements in the list

    for (let i=0; i<required_connections.length; i++) {
        // Get objects
        let connection = required_connections[i]

        start_skillObject = document.getElementById(connection[0])
        start_skillObjectPos = start_skillObject.getBoundingClientRect()

        end_skillObject = document.getElementById(connection[1])
        end_skillObjectPos = end_skillObject.getBoundingClientRect()

        let direction = connection[2]
        let heightDiff = connection[3]

        if (direction == "left" && heightDiff == "different") {
            // Make the arrow come from the left of the start object and end at the right of the end object
            // The elements are at different heights

            // Start point
            x0 = start_skillObjectPos.left + scrollX
            y0 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2

            // Control point 1
            x1 = end_skillObjectPos.right + scrollX
            y1 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2

            // Control point 2
            x2 = start_skillObjectPos.left + scrollX
            y2 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2

            // End point
            x3 = end_skillObjectPos.right + scrollX
            y3 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2
        }

        else if (direction == "left" && heightDiff == "sameRht") {
            // Make the arrow come from the left of the start object and end at the right of the end object
            // The elements are at the same heights

             // Start point
             x0 = start_skillObjectPos.left + scrollX
             y0 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2

             // Control point 1
             x1 = x0
             y1 = y0

             // Control point 2
             x2 = x0
             y2 = y0

             // End point
             x3 = end_skillObjectPos.right + scrollX
             y3 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2
        }

        else if (direction == "left" && heightDiff == "sameLft") {
            // Make the arrow come from the left of the start object and end at the right of the end object
            // The elements are at the same heights

             // Start point
             x0 = start_skillObjectPos.left + scrollX
             y0 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2

             // Control point 1
             x1 = x0
             y1 = y0

             // Control point 2
             x2 = x0
             y2 = y0

             // End point
             x3 = end_skillObjectPos.right + scrollX
             y3 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2
        }

        else if (direction == "right" && heightDiff == "different") {
            // Make the arrow come from the right of the start object and end at the left of the end object
            // The elements are at the different heights

            // Start point
            x0 = start_skillObjectPos.right + scrollX
            y0 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2

            // Control point 1
            x1 = end_skillObjectPos.left + scrollX
            y1 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2

            // Control point 2
            x2 = start_skillObjectPos.right + scrollX
            y2 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2

            // End point
            x3 = end_skillObjectPos.left + scrollX
            y3 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2
        }

        else if (direction == "right" && heightDiff == "sameRht") {
            // Make the arrow come from the right of the start object and end at the left of the end object
            // The elements are at the same heights

            // Start point
            x0 = start_skillObjectPos.right + scrollX
            y0 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2

            // Control point 1
            x1 = x0
            y1 = y0

            // Control point 2
            x2 = x0
            y2 = y0

            // End point
            x3 = end_skillObjectPos.left + scrollX
            y3 = end_skillObjectPos.top + scrollY + end_skillObjectPos.height/2
        }

        else if (direction == "right" && heightDiff == "sameLft") {
            // Make the arrow come from the right of the start object and end at the left of the end object
            // The elements are at the same heights

            // Start point
            x0 = start_skillObjectPos.right + scrollX
            y0 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2

            // Control point 1
            x1 = x0
            y1 = y0

            // Control point 2
            x2 = x0
            y2 = y0

            // End point
            x3 = end_skillObjectPos.left + scrollX
            y3 = start_skillObjectPos.top + scrollY + start_skillObjectPos.height/2
        }

        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3)
        ctx.stroke()
    }

    // Update every 10 milliseconds
    setTimeout(drawBezierCurves, 10)
}

const objectInfoBox = {
    "inquiry": "inquiry_info",
    "data_structures": "datastr_info",
    "cellbio": "cellbio_info",
    "clang": "clang_info",
    "signal_analysis": "signals_info",
    "orgchem": "orgchem_info",
    "stats": "stats_info",
    "critap": "critap_info",
    "geneticeng": "geneticeng_info",
    "anatphys": "anatphys_info",
    "research": "research_info",
    "electrochem": "electrochem_info",
    "vectorcalc": "vectorcalc_info",
    "diffeqns": "diffeqns_info",
    "linalg": "linalg_info",
    "datasql": "datasql_info",
    "embdesign": "embdesign_info",
    "pcbdesign": "pcbdesign_info",
    "python": "python_info",
    "webdev": "webdev_info",
    "devops": "devops_info",
    "docker": "docker_info",
    "jenkins": "jenkins_info",
    "electromag": "electromag_info",
    "compdyn": "compdyn_info",
    "statics": "statics_info",
}

let grid_item_width = "200"

function skillObjEnableHoverEffects(objectId) {
    if (!lockingActive) {
        // Enable hover effects and make info box visible
        skillObjectInfoId = objectInfoBox[objectId]

        // Get objects
        skillObject = document.getElementById(objectId)
        skillObjectInfo = document.getElementById(skillObjectInfoId)

        // Make info box visible
        skillObjectInfo.style.visibility = "visible"
        skillObjectInfo.style.opacity = 1

        // Enable drop shadow effect
        skillObject.style.boxShadow = "0px 0px 30px"
        skillObject.style.width = `${grid_item_width * 1.20}px`
    }
}


function skillObjectDisableHoverEffects(objectId) {
    if (!lockingActive) {
        // Disable hover effects and make info box hidden
        skillObjectInfoId = objectInfoBox[objectId]

        // Get objects
        skillObject = document.getElementById(objectId)
        skillObjectInfo = document.getElementById(skillObjectInfoId)

        // Make info box visible
        skillObjectInfo.style.visibility = "hidden"
        skillObjectInfo.style.opacity = 0

        // Enable drop shadow effect
        skillObject.style.boxShadow = "0px 0px 0px"
        skillObject.style.width = `${grid_item_width}px`
    }
}

infoBoxLocked = {
    // Info box id  locked status
    "inquiry_info"    : 0,
    "datastr_info"    : 0,
    "cellbio_info"    : 0,
    "clang_info"      : 0,
    "signals_info"    : 0,
    "orgchem_info"    : 0,
    "stats_info"      : 0,
    "critap_info"     : 0,
    "geneticeng_info" : 0,
    "anatphys_info"   : 0,
    "research_info"   : 0,
    "electrochem_info": 0,
    "vectorcalc_info" : 0,
    "diffeqns_info"   : 0,
    "linalg_info"     : 0,
    "datasql_info"    : 0,
    "embdesign_info"  : 0,
    "pcbdesign_info"  : 0,
    "python_info"     : 0,
    "webdev_info"     : 0,
    "devops_info"     : 0,
    "docker_info"     : 0,
    "jenkins_info"    : 0,
    "electromag_info" : 0,
    "compdyn_info"    : 0,
    "statics_info"    : 0,
}

let lockingActive = 0 // Allows other functions to know if locking is in effect

function lockSkillObject(objectId) {
    // When skill object is clicked, toggle info box visibility keep information box visible even when skill object is moused off
    skillObjectInfoId = objectInfoBox[objectId]
    lockedStatus = infoBoxLocked[skillObjectInfoId]

    // Get objects
    skillObject = document.getElementById(objectId)
    skillObjectInfoBox = document.getElementById(skillObjectInfoId)

    if (lockedStatus == 1) {
        // Unlock informataion box
        lockingActive = 0

        // Change border colour back to black
        skillObject.style.border = "1px solid black"
        infoBoxLocked[skillObjectInfoId] = 0 // Update locked status
    }

    else if (lockingActive == 0) {
        // Lock information box if no other boxes are locked
        skillObjectInfoBox.style.visibility = 'visible'
        skillObjectInfoBox.style.opacity = 1

        // Lock drop shadow effect
        skillObject.style.boxShadow = "0px 0px 30px"
        skillObject.style.width = `${grid_item_width * 1.20}px`

        // Change border to be red to indicate that locking has occured
        skillObject.style.border = "5px solid red"

        lockingActive = 1
        infoBoxLocked[skillObjectInfoId] = 1 // Update locked status
    }
}

updateInfoBoxPos()
drawBezierCurves()
