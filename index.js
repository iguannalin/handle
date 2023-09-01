window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  let phrases = [];
  let solution;
  let entry = "";
  const grid = document.getElementById("grid");
  let rowIndex = 0;

  document.getElementById("reveal").onclick = (e) => {
    if (!solution) return;
    e.target.innerHTML = "⚉";
    e.target.style.color = "#f9faffde";
    document.getElementById(`row-${row}`);
    console.log({solution, entry})
    // validate(col, td.innerText);
  }

  function validate(col, ch) {
    console.log({col, ch});
    console.log({entry, solution});
    rowIndex++;
    if (rowIndex > 6) alert("failed");
  }

  function initGrid() {
    for (let row = 0; row < 6; row++) {
      const tr = document.createElement("tr");
      tr.id = `row-${row}`;
      for (let col = 0; col < 4; col++) {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.id = `td-${row}-${col}'`;
        td.appendChild(input);
        input.onchange = (val) => {
          console.log(val);
          entry = tr.innerText;
        }
        tr.appendChild(td);
      }
      grid.appendChild(tr);
    }
  }

  // amazing chengyu data source -- http://thuocl.thunlp.org/
  fetch("THUOCL_chengyu.txt").then((f) => f.text()).then((r) => {
    phrases = r.split(",");
    solution = phrases[getRandomInt(0, phrases.length)];
    initGrid();
  });
});