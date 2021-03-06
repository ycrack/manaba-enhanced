"use strict"

const removeLinkBalloon = () => {
  const links = document.getElementsByTagName("a")

  const urlClamp = (url) =>
    url.length > 100 ? `${url.substring(0, 75)}...` : url

  for (const linkEl of links) {
    const link = new URL(linkEl.href)
    if (link.pathname.match(/link_iframe_balloon/)) {
      const linkNewEl = document.createElement("a")
      const url = link.searchParams.get("url")
      linkNewEl.href = url
      linkNewEl.innerHTML = linkEl.innerText.match(
        /^http(s)?:\/\/([\w-]+\.)+[\w-]{2,}\/([/\w-.?%&=]*)?$/
      ) ? urlClamp(url) : linkEl.innerHTML
      linkNewEl.target = "_blank"
      linkNewEl.rel = "noopener noreferrer"

      linkEl.parentElement.insertBefore(linkNewEl, linkEl)
      linkEl.remove()
    }
  }
}

export default removeLinkBalloon
