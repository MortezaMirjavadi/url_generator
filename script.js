const paramTemplate = '<input class="q-input" placeholder="Param Key" />';
const queryTemplate =
  '<input class="q-input" placeholder="Query Key" /><input class="q-input" placeholder="Query Value" />';
const baseUrl = "https://website.ir";

function createBox({ containerName, pattern }) {
  const container = document.querySelector(`#${containerName}`);
  const div = document.createElement("div");
  div.classList.add("keyValue-box");
  div.innerHTML = pattern;
  container.appendChild(div);
}
const addNewParam = () => {
  createBox({ containerName: "params-container", pattern: paramTemplate });
};
const addNewQuery = () => {
  createBox({ containerName: "queries-container", pattern: queryTemplate });
};
const generateURL = () => {
  let params = "",
    queries = "";
  document
    .querySelector("#params-container")
    .querySelectorAll(".q-input")
    .forEach((el) => {
      if (el.value) {
        params += `/${el.value}`;
      }
    });
  const _q = document
    .querySelector("#queries-container")
    .querySelectorAll(".keyValue-box");
  const _array = Array.from(_q).filter(
    (query) => query.children[0].value !== "" && query.children[1].value !== ""
  );
  _array.forEach((query, index) => {
    const _key = query.children[0].value;
    const _value = query.children[1].value;
    queries += `${_key}=${_value}${index < _array.length - 1 ? "&" : ""}`;
  });
  renderUrl(
    `${baseUrl}${params.length > 0 ? params : ""}${
      queries.length > 0 ? "?" + queries : ""
    }`
  );
};

const renderUrl = (url) => {
  const el = document.getElementById("url-container");
  el.innerHTML = `<p>${url}</p>`;
};

document.getElementById("param-submit").addEventListener("click", addNewParam);
document.getElementById("query-submit").addEventListener("click", addNewQuery);
document.getElementById("generate").addEventListener("click", generateURL);
