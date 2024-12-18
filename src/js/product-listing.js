import { loadHeaderFooter, getParams } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';

loadHeaderFooter();
const dataSource = new ExternalServices();
const element = document.querySelector('.product-list');
const listing = new ProductList(dataSource, element);

listing.init();
