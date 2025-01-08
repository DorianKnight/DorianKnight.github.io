// Author: Dorian Knight
// Date: December 14th 2024
// Description: Provides the interactive javascript on the skill tree page

function updateInfoBoxPos() {
    const info_box_padding = 50
    // All skills in skill tree: [skill object, skill object information box]
    const skill_objects = [
        ['inquiry'        , 'inquiry_info'],
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

function drawBezierCurves() {
    // Draw the curved connecting arrows
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

    // Initialize canvas
    // console.log("Drawing curves")
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

updateInfoBoxPos()
drawBezierCurves()
