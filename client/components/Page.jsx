import React, { Component, PropTypes } from 'react';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

class Page extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    const {
      page,
      perPage,
      items,
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
    return (
      <div>
        <div className={pageItemsClassName}>
          {curItems.map((item, index) => {
            return renderItem(item, index);
          })}
          {pageArr}
        </div>
        <Toolbar className={pageBarClassName} style={{
          overflow: 'hidden',
          backgroundColor: 'transparent'
        }}>
          <ToolbarGroup>
            {
              page > 0 &&
              <FloatingActionButton
                mini={true}
                secondary={true}
                onTouchTap={() => {
                  changePage(Math.max(page - 1, 0));
                }}
                zDepth={0}
                style={{ float: 'right' }}
              >
                <HardwareKeyboardArrowLeft />
              </FloatingActionButton>
            }
          </ToolbarGroup>
          <ToolbarGroup>
            <Subheader>
              {page + 1}/{pageNum}
            </Subheader>
          </ToolbarGroup>
          <ToolbarGroup>
            {
              page < pageNum - 1 &&
              <FloatingActionButton
                mini={true}
                secondary={true}
                onTouchTap={() => {
                  changePage(Math.min(page + 1, pageNum - 1));
                }}
                zDepth={0}
                style={{ float: 'right' }}
              >
                <HardwareKeyboardArrowRight />
              </FloatingActionButton>
            }
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
};

Page.PropTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  items: PropTypes.array,
  pageItemsClassName: PropTypes.string,
  pageBarClassName: PropTypes.string,
  pageClassName: PropTypes.string,
  renderItem: PropTypes.func,
  changePage: PropTypes.func
};

Page.defaultProps = {
  page: 0,
  perPage: 5,
  items: []
};

export default Page;
