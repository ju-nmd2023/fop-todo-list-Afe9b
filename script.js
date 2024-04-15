const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    let taskText = document.createTextNode(inputBox.value);
    li.appendChild(taskText);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
  }
  inputBox.value = "";
}
listContainer.addEventListener(
  "click",
  function (a) {
    if (a.target.tagName === "LI") {
      a.target.classList.toggle("checked");
    } else if (a.target.tagName === "SPAN") {
      a.target.parentElement.remove();
    }
  },
  false
);
