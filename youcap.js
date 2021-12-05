document.addEventListener("DOMContentLoaded", () => {

  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const url = `https://${JSON.parse(`"${params.get("url")}"`)}&fmt=json3`;

  fetch(url)
    .then(res => res.text())
    .then(str => JSON.parse(str))
    .then(data => {
      data.events.forEach(e => {
        if (!!e.segs && e.segs[0].utf8 != "\n") {
          let line = "";
          e.segs.forEach(s => {
            line = line + s.utf8;
          });
          const p = document.createElement("p");
          p.innerText = line;
          document.getElementById("content").appendChild(p);
        }
      });
  });
});