import React, { Component } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

interface IRecipeProps {
    href?: string;
}

interface IRecipeState {
}

export default class Example extends Component<IRecipeProps, IRecipeState> {
    render() {
        return (
            <FacebookProvider appId={process.env.NEXT_PUBLIC_FB_APPID}>
                <Comments href={this.props.href} />
            </FacebookProvider>
        );
    }
}