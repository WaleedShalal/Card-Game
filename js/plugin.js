/* ---------- Get Number Of Cards && Make Array Of Index Number ---------- */
const cardsContainer = document.querySelector("#cards__container");
const cards = Array.from(document.querySelectorAll(".card__img"));
const cardsOrderArr = Array.from(cards.keys());
/* -------------------- Set New Random Order For Cards ------------------- */
const setCardOrder = function (cards) {
  const newCardsOrderArr = getNewOrderArr(cardsOrderArr);
  cards.forEach(function (card, index) {
    card.style.order = newCardsOrderArr[index];
  });
};
/* -------------- Add Event Click For Each Card To Add Claas ------------- */
const addCardClass = function (cards) {
  cardsContainer.addEventListener("click", function (e) {
    const clickedCard = e.target.closest(".card__img");
    if (!clickedCard) return;
    clickedCard.classList.add("is__rotated");
    getRotatedCards(cards);
  });
  setCardOrder(cards);
};
addCardClass(cards);
/* --------------------------- Get Rotated Card -------------------------- */
const getRotatedCards = function (cards) {
  const rotatedCards = cards.filter(function (card) {
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
const handleCardsEvent = function (rotatedCards) {
  if (rotatedCards.length === 2) {
    // Class In CSS File Stop All Card Events
    cardsContainer.classList.add("not__rotated");
    // If Cards Are Same
    if (rotatedCards[0].dataset.marvel === rotatedCards[1].dataset.marvel) {
      // Sound In HTML
      setTimeout(function () {
        document.querySelector("#right__guess").play();
      }, 400);
      // Make Same Cards Unvisible
      setTimeout(function () {
        rotatedCards[0].style.visibility = "hidden";
        rotatedCards[1].style.visibility = "hidden";
      }, 1200);
    }
    // If Cards Are Different
    else {
      // Sound In HTML
      setTimeout(function () {
        document.querySelector("#wrong__guess").play();
      }, 400);
    }
    // If Cards Are Same Or Different
    setTimeout(function () {
      cardsContainer.classList.remove("not__rotated");
      rotatedCards[0].classList.remove("is__rotated");
      rotatedCards[1].classList.remove("is__rotated");
    }, 1100);
  }
};
