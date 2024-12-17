import ExternalServices from './ExternalServices.mjs';
import ProductListing from './ProductList.mjs';
import {loadHeaderFooter} from './utils.mjs';

loadHeaderFooter();
const dataSource = new ExternalServices('tents');
const element = document.querySelector('.product-list');
const listing = new ProductListing('Tents', dataSource, element);

listing.init();
