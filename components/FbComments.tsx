import React, { Component } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

export default class Example extends Component {
    render() {
        return (
            <FacebookProvider appId={process.env.NEXT_PUBLIC_FB_APPID}>
                <Comments href={this.props.href} />
            </FacebookProvider>
        );
    }
}