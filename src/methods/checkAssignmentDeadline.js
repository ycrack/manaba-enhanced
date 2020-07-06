"use strict"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import checkLang from "./checkLang.js"
import evalDiff from "./evalDiff.js"

const checkAssignmentDeadline = () => {
  let notSubmitted, deadlineString, deadlineTh

  const ths = document.querySelectorAll(".stdlist th")
  for (const th of ths) {
    if (th.innerText === "状態" || th.innerText === "Status") {
      if (th.nextElementSibling) {
        const innerText = th.nextElementSibling.innerText
        if (
          innerText.indexOf("提出していません") !== -1 ||
          innerText.indexOf("Not submitted") !== -1
        ) {
          notSubmitted = true
        }
      }
    }
    if (th.innerText === "受付終了日時" || th.innerText === "End") {
      if (th.nextElementSibling) {
        deadlineString = th.nextElementSibling.innerText
        deadlineTh = th
      }
    }
  }

  const validateDeadlineString = (string) => {
    const match = new RegExp("(\\d{4}-+\\d{2}-+\\d{2} \\d{2}:+\\d{2})", "g")
    return match.test(string)
  }

  if (notSubmitted && validateDeadlineString(deadlineString)) {
    const now = dayjs()
    const deadline = dayjs(deadlineString, "YYYY-MM-DD HH:mm")

    const lang = checkLang()

    const createMessage = (text, msgStatus) => {
      const message = document.createElement("span")
      message.innerText = text
      message.style.marginLeft = "1em"
      message.style.padding = ".2em .5em"
      switch (msgStatus) {
        case "normal":
          message.style.backgroundColor = "#d3edb3"
          message.style.color = "#244f24"
          break
        case "caution":
          message.style.backgroundColor = "#fff4d1"
          message.style.color = "#433200"
          break
        case "danger":
          message.style.backgroundColor = "ffdce0"
          message.style.color = "#5f000b"
          break
      }
      deadlineTh.nextElementSibling.appendChild(message)
    }

    const diff = evalDiff(now, deadline, createMessage)

    if (diff.value > 0) {
      switch (diff.unit) {
        case "day":
          switch (lang) {
            case "ja":
              createMessage(
                `あと${diff.value}日`,
                diff.value > 2 ? "normal" : "caution"
              )
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} days remaining`
                  : `${diff.value} day remaining`,
                diff.value > 2 ? "normal" : "caution"
              )
              break
          }
          break
        case "hour":
          switch (lang) {
            case "ja":
              createMessage(`あと${diff.value}時間`, "danger")
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} hours remaining`
                  : `${diff.value} hour remaining`,
                "danger"
              )
              break
          }
          break
        case "minute":
          switch (lang) {
            case "ja":
              createMessage(`あと${diff.value}分`, "danger")
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} minutes remaining`
                  : `${diff.value} minute remaining`,
                "danger"
              )
              break
          }
      }
    } else {
      switch (lang) {
        case "ja":
          createMessage("受付終了", "danger")
          break
        case "en":
          createMessage("Deadline is over", "danger")
          break
      }
    }
  }
}

export default checkAssignmentDeadline
