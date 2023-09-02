window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  let phrases = [];
  let solution;
  let entry = ["","","",""];
  const grid = document.getElementById("grid");
  const title = document.getElementById("title");
  const reveal = document.getElementById("reveal");
  let rowIndex = 0;

  reveal.onclick = (e) => {
    if (!solution || entry.join("").length != 4) return;
    validate();
  }

  // simplified pinyin only!!! soz T_T
  function validate() {
    const sol = solution.split("");
    let check = 0;
    entry.forEach((ch, index) => {
      const cell = document.getElementById(`input-${rowIndex}-${index}`);
      // first check if in correct spot
      if (ch == sol[index]) { cell.parentElement.className = "green"; check++; }
      // then check correct word in wrong spot
      else if (solution.includes(ch)) cell.parentElement.className = "yellow";
      else cell.parentElement.className = "gray"
      cell.readOnly = true;
      if (check == 4) {
        reveal.innerHTML = "🧧";
        reveal.onclick = null;
        return;
      }
      if (rowIndex < 5) document.getElementById(`input-${rowIndex+1}-${index}`).readOnly = false; // disable rows by default, only enable for input when it's the input row
    });
    rowIndex++;
    entry = ["","","",""];
    if (rowIndex < 6) document.getElementById(`input-${rowIndex}-0`).focus();
    if (rowIndex >= 6) {
      reveal.innerHTML = "👹";
      reveal.onclick = null;
      title.innerHTML = solution;
    }
  }

  function onType(input, val, r, c) {
    if (!val || !val.match(/^.*[一-龥]/g)) return;
    if (val.length > 1) val = input.value = val.trim().split("")[0];
    if (c < 3) document.getElementById(`input-${r}-${c+1}`).focus(); // auto-tab to next input element in row
    entry[c] = val;
  }

  function initGrid() {
    for (let row = 0; row < 6; row++) {
      const tr = document.createElement("tr");
      tr.id = `row-${row}`;
      for (let col = 0; col < 4; col++) {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.id = `input-${row}-${col}`;
        td.appendChild(input);
        input.oninput = (ev) => onType(ev.target, ev.target.value, row, col);
        if (row > 0) input.readOnly = true;
        tr.appendChild(td);
      }
      grid.appendChild(tr);
    }
  }

  // amazing chengyu data source -- http://thuocl.thunlp.org/
  fetch("THUOCL_chengyu.txt").then((f) => f.text()).then((r) => {
    phrases = r.split(",");
    if (!phrases) return;
    while (!solution || solution.length != 4) solution = phrases[getRandomInt(0, phrases.length)];
    console.log(solution);
    initGrid();
  });
});