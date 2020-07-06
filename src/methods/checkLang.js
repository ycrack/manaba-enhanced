"use strict"

const checkLang = () => {
  const mylang = document.getElementById("mylang")
  return mylang && mylang.className.replace("my-lang-", "")
}

export default checkLang
