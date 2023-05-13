const myElement = document.getElementsByClassName("block-checkbox-item_title")

const myList = [...myElement].map(name => name.innerText)

console.log(myList)