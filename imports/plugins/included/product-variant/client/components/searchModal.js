import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextField, Button, SortableTable } from "/imports/plugins/core/ui/client/components";
import ProductGridContainer from "../containers/productGridContainer";
import { accountsTable, ordersTable } from "../helpers";

class SearchModal extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    handleChange: PropTypes.func,
    handleClick: PropTypes.func,
    handleToggle: PropTypes.func,
    orders: PropTypes.array,
    products: PropTypes.array,
    siteName: PropTypes.string,
    tags: PropTypes.array,
    value: PropTypes.string
  }

  renderSearchInput() {
    return (
      <div className="rui search-modal-input">
        <label data-i18n="search.searchInputLabel">Search {this.props.siteName}</label>
        <i className="fa fa-search search-icon" />
        <TextField
          className="search-input"
          textFieldStyle={{ marginBottom: 0 }}
          onChange={this.props.handleChange}
          value={this.props.value}
        />
        <Button
          className="search-clear"
          i18nKeyLabel="search.clearSearch"
          label="Clear"
          containerStyle={{ fontWeight: "normal" }}
          onClick={this.props.handleClick}
        />
      </div>
    );
  }

  renderSearchTypeToggle() {
    return (
      <div className="rui search-type-toggle">
        <div
          className="search-type-option search-type-active"
          data-i18n="search.searchTypeProducts"
          data-event-action="searchCollection"
          value="products"
          onClick={() => this.props.handleToggle("products")}
        >
          Products
        </div>
        <div
          className="search-type-option"
          data-i18n="search.searchTypeAccounts"
          data-event-action="searchCollection"
          value="accounts"
          onClick={() => this.props.handleToggle("accounts")}
        >
          Accounts
        </div>
        <div
          className="search-type-option"
          data-i18n="search.searchTypeOrders"
          data-event-action="searchCollection"
          value="orders"
          onClick={() => this.props.handleToggle("orders")}
        >
          Orders
        </div>
      </div>
    );
  }

  renderProductSearchTags() {
    return (
      <div className="rui search-modal-tags-container">
        <p className="rui suggested-tags" data-i18n="search.suggestedTags">Suggested tags</p>
        <div className="rui search-tags">
          {this.props.tags.map((tag) => (
            <span className="rui search-tag" key={tag._id}>{tag.name}</span>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="rui search-modal-header">
          {this.renderSearchInput()}
          {this.renderSearchTypeToggle()}
          {this.props.tags.length > 0 && this.renderProductSearchTags()}
        </div>
        <div className="rui search-modal-results-container">
          <div className="rui search-modal-results">
            {this.props.products.length > 0 && <ProductGridContainer products={this.props.products} isSearch={true} />}
            {this.props.accounts.length > 0 &&
              <div className="data-table">
                <div className="table-responsive">
                  <SortableTable data={this.props.accounts} columns={accountsTable()} onRowClick={this.props.handleAccountClick} />
                </div>
              </div>
            }
            {this.props.orders.length > 0 &&
              <div className="data-table">
                <div className="table-responsive">
                  <SortableTable data={this.props.orders} columns={ordersTable()} onRowClick={this.props.handleOrderClick}/>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SearchModal;