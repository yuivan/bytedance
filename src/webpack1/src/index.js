import _ from "lodash";
import "./index.css";

const button = document.createElement("button");

button.innerHTML = "123";
button.classList.add("red");
button.onclick = async () => {
  const { user } = await import("./user.js");
  user();
};
document.body.appendChild(button);
