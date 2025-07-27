import Svg, {Path} from 'react-native-svg';
import React from 'react';
import {windowWidth, windowHeight} from '@theme/appConstant';
import {useTheme} from '@react-navigation/native';

export function Profile(props) {
  const {colors} = useTheme();
  return (
    <Svg
      width={props.width ? props.width : windowWidth(22)}
      height={props.height ? props.height : windowHeight(20)}
      viewBox="0 0 17 21"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.44 16.8068C16.44 20.2277 11.7488 20.6231 8.22106 20.6231L7.96861 20.6229C5.72102 20.6174 0 20.4755 0 16.7861C0 13.435 4.5027 12.9872 8.00361 12.9703L8.4735 12.97C10.721 12.9755 16.44 13.1174 16.44 16.8068ZM8.22106 14.5266C3.79865 14.5266 1.55682 15.2863 1.55682 16.7861C1.55682 18.2993 3.79865 19.0663 8.22106 19.0663C12.6424 19.0663 14.8832 18.3066 14.8832 16.8068C14.8832 15.2936 12.6424 14.5266 8.22106 14.5266ZM8.22106 0C11.26 0 13.7312 2.47223 13.7312 5.51115C13.7312 8.55007 11.26 11.0213 8.22106 11.0213H8.18785C5.15516 11.0119 2.69849 8.53865 2.70884 5.50804C2.70884 2.47223 5.18111 0 8.22106 0ZM8.22106 1.4821C5.99896 1.4821 4.19094 3.28905 4.19094 5.51115C4.1837 7.72599 5.9782 9.53191 8.19096 9.54021L8.22106 10.2813V9.54021C10.4421 9.54021 12.2491 7.73222 12.2491 5.51115C12.2491 3.28905 10.4421 1.4821 8.22106 1.4821Z"
        fill={props.color ? props.color : colors.text}
      />
    </Svg>
  );
}
