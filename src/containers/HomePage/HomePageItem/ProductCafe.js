import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/appActions";
import "./ProductCafe.scss";
import ModalAddCart from "./ModalAddCart";
import { Link } from "react-router-dom";

class ProductCafe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      isOpenModal: false,
      imgBase64: "",
      listCafeCurrent: [],
    };
  }
  componentDidMount() {
    this.setState({
      listCafeCurrent: this.props.listCafe,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.listCafe !== prevProps.listCafe) {
      this.setState({
        listCafeCurrent: this.props.listCafe,
      });
    }
  }
  AddProduct = (currentItem) => {
    this.setState({
      item: currentItem,
      isOpenModal: !this.state.isOpenModal,
    });
  };
  handleFormModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  renderListCafe = (listCafe) => {
    let result = [];

    if (listCafe && listCafe.length > 0) {
      result = listCafe.map((item, index) => {
        let imgBase64 = "";
        if (item.img) {
          imgBase64 = new Buffer.from(item.img, "base64").toString("binary");
        }
        return (
          <li className="product-cafe-item col-sm-2" key={index}>
            <div className="card">
              <Link to={`/home/inforproduct/${item.id}`}>
                <img src={imgBase64} alt="" className="card-img-top" />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-price">{item.price} VND</p>
                <button
                  className="btn product-cafe-btn"
                  onClick={() => this.AddProduct(item)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </li>
        );
      });
    }
    return result;
  };

  render() {
    return (
      <div className="product-cafe col-sm-12">
        <ul className="product-cafe-items d-flex">
          {this.renderListCafe(this.state.listCafeCurrent)}
        </ul>
        <ModalAddCart
          item={this.state.item}
          isOpen={this.state.isOpenModal}
          handleFormModal={this.handleFormModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    listCafe: state.admin.listCafe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCafe);
