"use strict"

import removeLinkBalloon from "./methods/removeLinkBalloon.js"
import checkPagePubDeadline from "./methods/checkPagePubDeadline.js"
import checkAssignmentDeadline from "./methods/checkAssignmentDeadline.js"
import createSearchbox from "./methods/createSearchbox.js"

window.addEventListener("DOMContentLoaded", () => {
  const url = window.location.href
  removeLinkBalloon()

  const pageLimitView = document.getElementsByClassName("pagelimitview")[0]
  if (pageLimitView) {
    checkPagePubDeadline(pageLimitView)
  }

  const stdlist = document.getElementsByClassName("stdlist")[0]
  if (stdlist) {
    checkAssignmentDeadline()
  }

  if (url.lastIndexOf("home") === url.length - 4) {
    createSearchbox()
  }
})
