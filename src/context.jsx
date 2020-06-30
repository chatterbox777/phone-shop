import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

// Provider
// Consumer

export default class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: true,
    modalProduct: detailProduct,
  };
  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(
      {
        products: tempProducts,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  getItem = (id) => {
    const product = this.state.products.find((item) => {
      return item.id === id;
    });
    return product;
  };

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState({
      detailProduct: product,
    });
  };
  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      {
        products: tempProducts,
        cart: [...this.state.cart, product],
      },
      () => {
        console.log(this.state);
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({
      modalProduct: product,
      modalOpen: true,
    });
  };

  closeModal = (id) => {
    this.setState({
      modalOpen: false,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
