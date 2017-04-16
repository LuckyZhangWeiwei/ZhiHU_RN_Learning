'use strict';
import React, { Component } from 'react';
import { PropTypes } from 'react';
import {requireNativeComponent,View} from'react-native';

class WebView extends React.Component {
    constructor() {
        super();
        this._onChange = this._onChange.bind(this);
    }
    _onChange(event: Event) {
        if (!this.props.onScrollChange) {
            return;
        }
        this.props.onScrollChange({ScrollX:event.nativeEvent.ScrollX,ScrollY:event.nativeEvent.ScrollY});
    }
        render() {
            return <RCTWebView {...this.props} onChange={this._onChange} />;
        }
    }
    WebView.propTypes = {
        url: PropTypes.string,
        html: PropTypes.string,
        onScrollChange: PropTypes.func,
        ...View.propTypes
        };


    var RCTWebView = requireNativeComponent('RCTWebView', WebView,{
        nativeOnly: {onChange: true}
    });
    module.exports = WebView