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

            else if ((skillObjectPos.top + skillObjectInfoPos.height/2) >= window.innerHeight-skillObjectInfoPos.height/2) {
                // Align the top of the information box a fixed distance away from the bottom
                skillObjectInfo.style.top = `${window.innerHeight - skillObjectInfoPos.height - info_box_padding}px`
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

updateInfoBoxPos()