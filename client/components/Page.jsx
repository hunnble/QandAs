import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Page extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    const {
      page,
      perPage,
      items,
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
    for (let i = 1; i <= pageNum; ++i) {
      pageArr.push(
        <span key={i}>{i}</span>
      );
    }
    return (
      <div>
        {curItems.map((item, index) => {
          return renderItem(item, index);
        })}
        {pageArr}
        <div>
          第{page + 1}页/共{pageNum}页
        </div>
        <RaisedButton label='上一页' />
        <RaisedButton label='下一页' />
      </div>
    );
  }
};

Page.PropTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  items: PropTypes.array,
  renderItem: PropTypes.func,
  changePage: PropTypes.func
};

export default Page;
