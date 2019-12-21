import ResourceSimpleSelector, {Props as ResourceSimpleSelectorProps} from 'components/ResourceSimpleSelector';

import {ListItem} from 'entity/role';
import {OmitSelf} from 'common/utils';
import React from 'react';
import api from '../api';

export interface Item {
  id: string;
  name: string;
}
type OwnProps = OmitSelf<ResourceSimpleSelectorProps<ListItem>, 'fetch'>;

class Component extends React.PureComponent<OwnProps> {
  fetch(term: string, pageSize: number, pageCurrent: number) {
    return api.searchList({term, pageSize, pageCurrent});
  }

  public render() {
    const {placeholder = '请选择角色', optionRender = 'roleName', ...props} = this.props;
    return <ResourceSimpleSelector<ListItem> {...props} placeholder={placeholder} optionRender={optionRender} fetch={this.fetch} />;
  }
}

export default Component;
