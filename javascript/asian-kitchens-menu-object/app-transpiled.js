import { menu } from "./menu.js";
const section = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");
const form = document.querySelector(".search-form");
const input = form.querySelector(".form-control");

// get unique categories
const categories = menu.reduce((values, item) => {
  if (!values.includes(item.category)) {
    values.push(item.category);
  }
  return values;
}, ["All"]);

// create category buttons
const categoryList = () => {
  const categoryBtns = categories.map(category => {
    return `<button class="btn btn-outline-dark btn-item" data-id=${category}>${category}</button>`;
  }).join("");
  btnContainer.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll(".btn-item");

  // filter menu with category buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(menuItem => {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "All") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
};

// display menu items
const displayMenuItems = menuItems => {
  let displayMenu = menuItems.map(item => {
    return `<div class="menu-items col-lg-6 col-sm-12">
            <img
              src=${item.img}
              alt=${item.title}
              class="photo"
            />
            <div class="menu-info">
              <div class="menu-title">
                <h4>${highlightSearch(item.title)}</h4>
                <h4 class="price">${item.price}</h4>
              </div>
              <div class="menu-text">
                ${highlightSearch(item.desc)}
              </div>
            </div>
          </div>
    `;
  });
  displayMenu = displayMenu.join("");
  section.innerHTML = displayMenu;
};

// highlight search text
const highlightSearch = text => {
  const searchValue = input.value.toLowerCase().trim();
  if (searchValue !== "") {
    const regex = new RegExp(searchValue, "gi");
    text = text.replace(regex, match => `<span class="highlight">${match}</span>`);
  }
  return text;
};

// filter menu with search input
input.addEventListener("keyup", () => {
  const searchValue = input.value.toLowerCase().trim();
  const filteredMenu = menu.filter(item => {
    if (item.title.toLowerCase().includes(searchValue) || item.desc.toLowerCase().includes(searchValue)) {
      return item;
    }
  });
  displayMenuItems(filteredMenu);
});

// initial display of menu items
displayMenuItems(menu);
categoryList();
