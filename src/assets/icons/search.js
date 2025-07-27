import Svg, {Path} from 'react-native-svg';
import React from 'react';
import {windowWidth, windowHeight} from '@theme/appConstant';
import {useTheme} from '@react-navigation/native';

export function Search(props) {
  const {colors} = useTheme();
  return (
    <Svg
      height={props.height ? props.height : windowHeight(24)}
      width={props.width ? props.width : windowWidth(26)}
      fill="none"
      viewBox="0 0 21 20 ">
      <Path
        d="M10.2081 1.66669C14.6831 1.66669 18.3231 5.30669 18.3231 9.78169C18.3231 11.893 17.5129 13.8186 16.187 15.2638L18.796 17.8673C19.0401 18.1114 19.041 18.5064 18.7968 18.7506C18.6751 18.8739 18.5143 18.9348 18.3543 18.9348C18.1951 18.9348 18.0351 18.8739 17.9126 18.7523L15.2722 16.1192C13.8832 17.2316 12.122 17.8975 10.2081 17.8975C5.73312 17.8975 2.09229 14.2567 2.09229 9.78169C2.09229 5.30669 5.73312 1.66669 10.2081 1.66669ZM10.2081 2.91669C6.42229 2.91669 3.34229 5.99585 3.34229 9.78169C3.34229 13.5675 6.42229 16.6475 10.2081 16.6475C13.9931 16.6475 17.0731 13.5675 17.0731 9.78169C17.0731 5.99585 13.9931 2.91669 10.2081 2.91669Z"
        fill={props.colors ? props.colors : colors.text}
        fillRule="evenodd"
      />
    </Svg>
  );
}
