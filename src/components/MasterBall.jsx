import React from 'react';
import Svg, { Circle, Ellipse, Rect, Path, Text, Defs, RadialGradient, Stop } from 'react-native-svg';

export default function MasterBall({ size }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <RadialGradient id="topShine" cx="35%" cy="30%" r="70%">
          <Stop offset="0%" stopColor="#9B5FCB" />
          <Stop offset="50%" stopColor="#7A3DB5" />
          <Stop offset="100%" stopColor="#6A2FA0" />
        </RadialGradient>
        <RadialGradient id="bottomShine" cx="35%" cy="30%" r="70%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#F5F5F5" />
        </RadialGradient>
        <RadialGradient id="buttonGrad" cx="40%" cy="35%" r="65%">
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#E8E8E8" />
        </RadialGradient>
      </Defs>

      <Circle cx="100" cy="100" r="95" fill="none" stroke="#1B1B1B" strokeWidth="6" />

      <Path d="M 5 100 A 95 95 0 0 1 195 100 Z" fill="url(#topShine)" />

      <Ellipse cx="50" cy="60" rx="14" ry="20" fill="#E85D9C" opacity="0.85" />
      <Ellipse cx="150" cy="60" rx="14" ry="20" fill="#E85D9C" opacity="0.85" />

      <Text
        x="100"
        y="68"
        fontSize="42"
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
        fontFamily="Arial"
      >
        M
      </Text>

      <Rect x="5" y="94" width="190" height="12" fill="#1B1B1B" />

      <Circle cx="100" cy="100" r="26" fill="#1B1B1B" />
      <Circle cx="100" cy="100" r="20" fill="url(#buttonGrad)" />
      <Circle cx="100" cy="100" r="10" fill="#D0D0D0" />

      <Path d="M 5 100 A 95 95 0 0 0 195 100 Z" fill="url(#bottomShine)" />

      <Ellipse cx="72" cy="130" rx="22" ry="12" fill="#FFFFFF" opacity="0.35" />
    </Svg>
  );
}
