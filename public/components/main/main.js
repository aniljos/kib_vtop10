import React from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import axios from 'axios';
import { EuiFlexGroup } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';
import TopMessages from './topMessages';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    
   

    
    
  }
  render() {
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>
                Visualization
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            {/* <EuiPageContentHeader>
              <EuiTitle>
                <h2>
                  Visualization
                </h2>
              </EuiTitle>
            </EuiPageContentHeader> */}
            <EuiPageContentBody>
              <EuiFlexGroup>
                <EuiFlexItem>
                  <TopMessages/>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
