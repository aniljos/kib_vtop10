import React, { PureComponent } from 'react';
import axios from 'axios';
import { EuiFlexGroup } from '@elastic/eui';
import { EuiFlexItem } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { EuiCard } from '@elastic/eui';
import { EuiIcon } from '@elastic/eui';
import { EuiBadge } from '@elastic/eui';
import { EuiFlexGrid } from '@elastic/eui';
import ShowMoreText from 'react-show-more-text';
import { EuiTitle } from '@elastic/eui';
import { EuiTextColor } from '@elastic/eui';
import { EuiSpacer } from '@elastic/eui';
import { EuiButton } from '@elastic/eui';

class TopMessages extends PureComponent {

    state = {
        topMessages: []
    }
    async componentDidMount() {


        try {
            const topMessages = await axios
                .get('../api/visualization_fspl/fetchTopViewedMessages');
            console.log(topMessages);
            this.setState({ topMessages: topMessages.data.indexes });
        } catch (error) {
            console.log(error);
        }
    }

    setContent = (item) => {
        let childPanel;

        if (item.text) {
            childPanel = (
                // <EuiHighlight search={this.state.search} highlightAll={true}>{item.text}</EuiHighlight>
                <EuiText size="s">
                    {item.text ? <ShowMoreText lines={3} more="more" less="less" keepNewLines={true}>{item.text}</ShowMoreText> : null}
                </EuiText>
            );
        }
        else if (item.document) {
            childPanel = (
                <div>
                    <div>
                        <EuiTextColor color="secondary">Document: {item.document.file_name}</EuiTextColor>
                    </div>
                    <EuiSpacer />
                    <EuiButton fill onClick={() => { this.props.openDocument(item) }}>
                        Open
                    </EuiButton>
                    <EuiSpacer />
                    <EuiText size="s">
                        {item.caption ? <ShowMoreText lines={2} more="more" less="less" keepNewLines={true}>{item.caption}</ShowMoreText> : null}
                    </EuiText>
                    

                </div>
            )
        }
        else if (item.audio) {
            childPanel = (
                <div>
                    <div>
                        <EuiTextColor color="secondary">Audio: {item.audio.file_name}</EuiTextColor>
                    </div>
                    <EuiSpacer />
                    <EuiButton hidden={item.media_visible == true} fill onClick={() => { this.props.openAudio(item, this) }}>
                        Open
                    </EuiButton>
                    <EuiSpacer />
                    <audio hidden={item.media_visible == false} controls src={item.mediaLocalPath}></audio>
                    <EuiSpacer />
                    <EuiText size="s">
                        {item.caption ? <ShowMoreText lines={2} more="more" less="less" keepNewLines={true}>{item.caption}</ShowMoreText> : null}
                    </EuiText>

                </div>
            )
        }
        else if (item.video) {
           
            childPanel = (
                <div>
                    <div>
                        <EuiTextColor color="secondary">Video: {item.video.file_name}</EuiTextColor>
                    </div>
                    <EuiSpacer />
                    <EuiButton hidden={item.media_visible == true} fill onClick={() => { this.props.openVideo(item, this) }}>
                        Open
                </EuiButton>
                    <EuiSpacer />
                    <video height="250" width="300" hidden={item.media_visible == false} controls src={item.mediaLocalPath}></video>
                    <EuiSpacer />
                    <EuiText size="s">
                        {item.caption ? <ShowMoreText lines={2} more="more" less="less" keepNewLines={true}>{item.caption}</ShowMoreText> : null}
                    </EuiText>


                </div>
            )
        }
        else if (item.photo) {
            childPanel = (
                <div>
                    <h4>Image</h4>
                    <img id="theImg" src={item.mediaLocalPath} />
                    <EuiSpacer />
                    <EuiText size="s">
                        {item.caption ? <ShowMoreText lines={2} more="more" less="less" keepNewLines={true}>{item.caption}</ShowMoreText> : null}
                    </EuiText>
                </div>
            )
        }

        return childPanel;
    }

    renderMessages = () => {

        console.log("TopMessages", this.state.topMessages);
        if (this.state.topMessages && this.state.topMessages.length > 0) {
            return this.state.topMessages.map((item, index) => {

                let childPanel = this.setContent(item);


                const date = new Date(item.date);
                console.log("Date: " + date);
                return (
                    <EuiFlexItem>
                        <EuiCard
                            layout="horizontal"
                            
                            titleSize="xs"
                            icon={<EuiIcon size="s" type={'documents'} />}
                            title={<EuiText size="m" color="secondary">Telegram Channels via {item.chat.username}</EuiText>}
                            children={<EuiFlexGroup direction="column">
                                <EuiFlexItem>
                                    {/* <EuiText size="s">
                                        {item.text ? <ShowMoreText lines={1} more="more" less="less" keepNewLines={true}>{item.text}</ShowMoreText>:  null}
                                    </EuiText> */}
                                    {childPanel}
                                </EuiFlexItem>
                                <EuiFlexItem>
                                    <EuiFlexGroup justifyContent="spaceBetween">
                                        <EuiFlexItem>

                                        </EuiFlexItem>
                                        <EuiFlexItem grow={false}>
                                            <EuiBadge color="white" iconType="eye">{item.views} {date.toLocaleDateString()} {date.toLocaleTimeString()}</EuiBadge>
                                        </EuiFlexItem>
                                    </EuiFlexGroup>

                                </EuiFlexItem>
                            </EuiFlexGroup>}

                            onClick={() => { }}
                        />
                    </EuiFlexItem>
                )
            });
        }

    }

    render() {
        return (
            <EuiFlexGroup direction="column">
                <EuiFlexItem>
                    <EuiTitle size="m">
                        <h2>
                            VIRALITY: TOP 10 MOST VIEWED MESSAGES
                        </h2>
                    </EuiTitle>
                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiFlexGrid columns={1} >

                        {this.renderMessages()}

                    </EuiFlexGrid>

                </EuiFlexItem>
                <EuiFlexItem>
                    <EuiText size="m" color="subdued" >
                        These messages throw light on what is becoming viral and helps in indicating what should be the counter propaganda messaging, Click here for further intelligence analysis on these viral messages
                    </EuiText>
                </EuiFlexItem>
            </EuiFlexGroup>
        );
    }

}
export default TopMessages;
