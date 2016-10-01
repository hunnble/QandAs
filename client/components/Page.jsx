import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

class Page extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    const {
      page,
      perPage,
      items,
      divider,
      pageItemsClassName,
      pageBarClassName,
      pageClassName,
      renderItem,
      changePage
    } = this.props;
    if (!items) {
      return null;
    }
    const curItems = items.slice(page * perPage, Math.min(items.length, (page + 1) * perPage));
    let pageNum = Math.ceil(items.length / perPage);
    const pageArr = [];
    if (pageNum === 0) {
      pageNum = 1;
    }
    // for (let i = 1; i <= pageNum; ++i) {
    //   pageArr.push(
    //     <span key={i} pageBarClassName={pageClassName}>{i}</span>
    //   );
    // }
    return (
      <div>
        <div className={pageItemsClassName}>
          {curItems.map((item, index) => {
            return renderItem(item, index);
          })}
          {pageArr}
        </div>
        {
          divider &&
          <Divider />
        }
        <div className={pageBarClassName}>
          <div>
            第{page + 1}页/共{pageNum}页
          </div>
          {
            page > 0 &&
            <RaisedButton primary={true} label='上一页' onTouchTap={() => {
              changePage(Math.max(page - 1, 0));
            }} />
          }
          {
            page < pageNum - 1 &&
            <RaisedButton primary={true} label='下一页' onTouchTap={() => {
              changePage(Math.min(page + 1, pageNum - 1));
            }} />
          }
        </div>
      </div>
    );
  }
};

Page.PropTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  items: PropTypes.array,
  divider: PropTypes.boolean,
  pageItemsClassName: PropTypes.string,
  pageBarClassName: PropTypes.string,
  pageClassName: PropTypes.string,
  renderItem: PropTypes.func,
  changePage: PropTypes.func
};

Page.defaultProps = {
  page: 0,
  perPage: 5,
  items: [],
  divider: false
};

export default Page;
