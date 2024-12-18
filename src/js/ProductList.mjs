import {renderListWithTemplate} from './utils.mjs';


function productCardTemplate(product) {
    return `<li class="product-card">
             <a href="/product_pages/index.html?product=${product.Id}">
    
            <h3 class="card__brand">${product.title}</h3>
            <h2 class="card__name">${product.description}</h2>
            <p class="product-card__price">$${product.location}</p></a>
    </li>`;
}

export default class ProductListing {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
      }

  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    this.products = await this.dataSource.getData();
    console.log(this.products[1].description);
    // render the list
    this.renderList(this.products);
    //set the title to the current category
    document.querySelector('.title').innerHTML = this.category;
    // Add the sort dropdown functionality
    this.addSortListener();
  }

        // renderList(list) {
    //     const htmlStrings = list.map(productCardTemplate);
    //     this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
    // }

    renderList(list) {
        // Clear the existing list to avoid duplication
        this.listElement.innerHTML = '';

        // Render the updated list
        renderListWithTemplate(productCardTemplate, this.listElement, list)
    }


    addSortListener() {
      const sortDropdown = document.getElementById('sort-options');
      sortDropdown.addEventListener('change', (event) => {
        const sortCriteria = event.target.value;
        let sortedList;

        if (sortCriteria === 'name') {
          sortedList = [...(this.products || [])].sort((a, b) =>
            a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
          );
        } else if (sortCriteria === 'price') {
          sortedList = [...(this.products || [])].sort((a, b) => a.FinalPrice - b.FinalPrice);
        } else {
          sortedList = [...(this.products || [])]; // Default: unsorted
        }

        // Render the sorted list
        this.renderList(sortedList);
      });
}
}