import App from "../../app"
import { createElement } from "../../helpers/domHelper";
import { showModal } from "./modal"

export function showWinnerModal(fighter) {
  let winnerNameElement = createElement({ tagName: 'div', className: 'modal-body' });
  winnerNameElement.innerHTML = fighter.name;
  showModal({ title: "WINNER!", bodyElement: winnerNameElement, onClose: restartGame });
}

function restartGame() {
  root.innerHTML = ''
  App.startApp();
}