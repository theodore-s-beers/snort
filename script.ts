const boxes = document.querySelectorAll(".number-box");

let sorted = false;

for (const box of boxes) {
  const randomNumber = Math.floor(Math.random() * 1_000) + 1;
  box.innerHTML = String(randomNumber);
  sorted = false;
}

const sortButton = document.getElementById("sort-button");

sortButton?.addEventListener("click", async () => {
  if (sorted) {
    return;
  }

  let swaps = 0;

  for (let i = 1; i < boxes.length; i++) {
    for (const box of boxes) {
      box.classList.remove("bg-blue-200");
    }

    for (let n = 0; n < i; n++) {
      boxes[n].classList.add("bg-purple-200");
    }

    boxes[i].classList.add("bg-blue-200");

    let j = i;

    while (
      j > 0 &&
      Number(boxes[j].innerHTML) < Number(boxes[j - 1].innerHTML)
    ) {
      await sleep(250);

      [boxes[j].innerHTML, boxes[j - 1].innerHTML] = [
        boxes[j - 1].innerHTML,
        boxes[j].innerHTML,
      ];

      swaps++;

      boxes[j].classList.remove("bg-blue-200");
      boxes[j].classList.add("bg-purple-200");

      boxes[j - 1].classList.remove("bg-purple-200");
      boxes[j - 1].classList.add("bg-blue-200");

      j--;
    }

    await sleep(250);
  }

  for (const box of boxes) {
    box.classList.remove("bg-blue-200");
    box.classList.remove("bg-purple-200");
    box.classList.add("bg-green-200");
  }

  const swapsCount = document.getElementById("swaps-count") as HTMLSpanElement;
  swapsCount.innerText = String(swaps);

  const swapsReport = document.getElementById(
    "swaps-report"
  ) as HTMLParagraphElement;
  swapsReport.classList.remove("hidden");

  sorted = true;
});

const rerollButton = document.getElementById("reroll-button");

rerollButton?.addEventListener("click", () => {
  for (const box of boxes) {
    const randomNumber = Math.floor(Math.random() * 1_000) + 1;
    box.innerHTML = String(randomNumber);
    sorted = false;
    box.classList.remove("bg-green-200");
    const swapsReport = document.getElementById(
      "swaps-report"
    ) as HTMLParagraphElement;
    swapsReport.classList.add("hidden");
  }
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
