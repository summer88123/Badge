import React from 'react';
import { Text, View, StyleProp, ViewStyle } from 'react-native';

export interface Props {
    count: number;
    maxCount: number;
    radius: number;
    bgColor: string;
    outSpace: number;
    outBgColor: string;
    innerVerticalSpace: number;
    style?: StyleProp<ViewStyle>;
}

export default class extends React.PureComponent<Props> {
    static defaultProps = {
        bgColor: '#e15151',
        outSpace: 0,
        outBgColor: 'white',
        innerVerticalSpace: 4,
    };

    render() {
        const {count, outSpace} = this.props;
        const hasCount = !isNaN(count) && count > 0;
        const hasOut = !isNaN(outSpace) && outSpace > 0;
        const innerStyle = hasOut ? undefined : this.props.style;
        const innerView = hasCount ?
            this._renderInnerCount(innerStyle) :
            this._renderInnerNoCount(innerStyle);
        if (hasOut) {
            return this._renderOut(innerView, this.props.style);
        } else {
            return innerView;
        }
    }

    protected _renderOut(innerView, style) {
        const {radius, outSpace, outBgColor} = this.props;
        const viewStyle = {
            padding: outSpace,
            backgroundColor: outBgColor,
            borderRadius: radius + outSpace,
            overflow: 'hidden',
        };
        return (
            <View style={[viewStyle, style]}>
                {innerView}
            </View>
        );
    }

    protected _renderInnerNoCount(style) {
        const {radius, bgColor} = this.props;
        const badgeStyle = {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: bgColor,
            overflow: 'hidden',
        };
        return <View style={[badgeStyle, style]} />;
    }

    protected _renderInnerCount(style) {
        const {count, maxCount, radius, bgColor} = this.props;
        const showCount = count > maxCount ? maxCount + '+' : count;
        const layoutStyle = {
            height: radius * 2,
            minWidth: radius * 2,
            backgroundColor: bgColor,
            borderRadius: radius,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 2,
            overflow: 'hidden',
        };
        const textStyle = {
            fontSize: radius * 2 - this.props.innerVerticalSpace * 2,
            color: 'white',
            backgroundColor: 'transparent',
        };
        return (
            <View style={[layoutStyle, style]}>
                <Text style={[textStyle, textStyle]}>
                    {showCount}
                </Text>
            </View>
        );
    }
}