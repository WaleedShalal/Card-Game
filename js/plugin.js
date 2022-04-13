/* ---------- Get Number Of Cards && Make Array Of Index Number ---------- */
const cardsContainer = document.querySelector("#cards__container");
const cards = [...document.querySelectorAll(".card__img")];
const cardsOrderArr = [...cards.keys()];
/* -------------------- Set New Random Order For Cards ------------------- */
const setCardOrder = (cards) => {
  const newCardsOrderArr = getNewOrderArr(cardsOrderArr);
  cards.forEach((card, index) => {
    card.style.order = newCardsOrderArr[index];
  });
};
/* -------------- Add Event Click For Each Card To Add Claas ------------- */
const addCardClass = (cards) => {
  cardsContainer.addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".card__img");
    if (!clickedCard) return;
    clickedCard.classList.add("is__rotated");
    getRotatedCards(cards);
  });
  setCardOrder(cards);
};
addCardClass(cards);
/* --------------------------- Get Rotated Card -------------------------- */
const getRotatedCards = (cards) => {
  const rotatedCards = cards.filter((card) => {
    return card.classList.contains("is__rotated");
  });
  handleCardsEvent(rotatedCards);
};
/* ---------------- Make New Random Order Array For Cards ---------------- */
function getNewOrderArr(cardsOrderArr) {
  let length = cardsOrderArr.length,
    randomIndex;
  while (length) {
    // Get Last Card In Array
    randomIndex = Math.floor(Math.random() * length--);
    [cardsOrderArr[length], cardsOrderArr[randomIndex]] = [
      cardsOrderArr[randomIndex],
      cardsOrderArr[length],
    ];
  }
  return cardsOrderArr;
}
/* ------- Check How Many Cards Is__Rotated && If It's Same Or Not ------- */
const handleCardsEvent = (rotatedCards) => {
  if (rotatedCards.length === 2) {
    // Class In CSS File Stop All Card Events
    cardsContainer.classList.add("not__rotated");
    // If Cards Are Same
    if (rotatedCards[0].dataset.marvel === rotatedCards[1].dataset.marvel) {
      // Sound In HTML
      setTimeout(() => {
        document.querySelector("#right__guess").play();
      }, 400);
      // Make Same Cards Unvisible
      setTimeout(() => {
        rotatedCards[0].style.visibility = "hidden";
        rotatedCards[1].style.visibility = "hidden";
      }, 1200);
    }
    // If Cards Are Different
    else {
      // Sound In HTML
      setTimeout(() => {
        document.querySelector("#wrong__guess").play();
      }, 400);
    }
    // If Cards Are Same Or Different
    setTimeout(() => {
      cardsContainer.classList.remove("not__rotated");
      rotatedCards[0].classList.remove("is__rotated");
      rotatedCards[1].classList.remove("is__rotated");
    }, 1100);
  }
};
