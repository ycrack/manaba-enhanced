"use strict"

import axios from "axios"

import { gooLabAppId } from "../../.env"

const createSearchbox = async () => {
  const titleContainers = Array.from(
    document.getElementsByClassName("courselist-title")
  )

  const titles = titleContainers.map(
    (titleContainer) => titleContainer.innerText
  )

  const params = new URLSearchParams()
  params.append("app_id", gooLabAppId)
  params.append("sentence", titles)
  params.append("output_type", "hiragana")

  const res = await axios.post("https://labs.goo.ne.jp/api/hiragana", params)
  const titlesHiragana = res.data.converted.split(", ")
  console.log(titlesHiragana)
}

export default createSearchbox
