import { $ } from "./utils.js";

export const initializeMenu = () => {
  const $btnsShowMenu = $(".header__nav-show-menu");

  $btnsShowMenu.addEventListener("click", function (evt) {
    evt.preventDefault();

    const isExpanded = this.getAttribute("aria-expanded") === "true";
    const expandedValue = isExpanded ? "false" : "true";
    const labelValue = isExpanded ? "Close toggle menu" : "Open toggle menu";

    this.setAttribute("aria-expanded", expandedValue);
    this.setAttribute("aria-label", labelValue);
  });
};
