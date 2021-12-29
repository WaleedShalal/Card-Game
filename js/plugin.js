// // // 1# Get Number Of Cards && Make Array Of Index Number // // //
var cardsContainer = document.querySelector("#cards__container");
var cards = Array.from(cardsContainer.children);
var cardsOrderArr = Array.from(cards.keys());
// // // 1# Get Number Of Cards && Make Array Of Index Number// // //

// // // 2# Add Event On Window Instead Of Function Self Invoke// // //
window.addEventListener("load", function () {
  addCardClass(cards);
});
// // // 2# Add Event On Window Instead Of Function Self Invoke// // //

// // // 3# Add Event Click For Each Card To Add Claas // // //
function addCardClass(cards) {
  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.add("is__rotated");
      getRotatedCards(cards);
    });
  });
  setCardOrder(cards);
}
// // // 3# Add Event Click For Each Card To Add Claas // // //

// // // 4# Get Rotated Card // // //
function getRotatedCards(cards) {
  var rotatedCards = cards.filter(function (card) {
    return card.classList.contains("is__rotated");
  });
  handleCardsEvent(rotatedCards);
}
// // // 4# Get Rotated Card // // //

// // // 5# Set New Random Order For Cards // // //
function setCardOrder(cards) {
  var newCardsOrderArr = getNewOrderArr(cardsOrderArr);
  cards.forEach(function (card, index) {
    card.style.order = newCardsOrderArr[index];
  });
}
// // // 5# Set New Random Order For Cards // // //

// // // 6# Make New Random Order Array For Cards // // //
function getNewOrderArr(cardsOrderArr) {
  var length = cardsOrderArr.length,
    randomIndex,
    saveCardValue;
  while (length) {
    // Get Last Card In Array
    randomIndex = Math.floor(Math.random() * length--);
    saveCardValue = cardsOrderArr[length];
    cardsOrderArr[length] = cardsOrderArr[randomIndex];
    cardsOrderArr[randomIndex] = saveCardValue;
  }
  return cardsOrderArr;
}
// // // 6# Make New Random Order Array For Cards // // //

// // // 7# Check How Many Cards Is__Rotated && If It's Same Or Not // // //
function handleCardsEvent(rotatedCards) {
  if (rotatedCards.length === 2) {
    // Class In CSS File Stop All Card Events
    cardsContainer.classList.add("not__rotated");
    // If Cards Are Same
    if (rotatedCards[0].dataset.marvel === rotatedCards[1].dataset.marvel) {
      // Sound In HTML
      // document.getElementById("right__guess").play();
      setTimeout(function () {
        document.getElementById("right__guess").play();
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
        document.getElementById("wrong__guess").play();
      }, 400);
    }
    // If Cards Are Same Or Different Will Do This
    setTimeout(function () {
      cardsContainer.classList.remove("not__rotated");
      rotatedCards[0].classList.remove("is__rotated");
      rotatedCards[1].classList.remove("is__rotated");
    }, 1100);
  }
}
// // // 7# Check How Many Cards Is__Rotated && If It's Same Or Not // // //
