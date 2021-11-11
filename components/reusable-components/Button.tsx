import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../constants/Theme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface IButton {
  label: string;
  type: 'roundedBlue' | 'roundedWhite' | 'skinnyBlue' | 'skinnyWhite' | 'borderedWhite' | 'faded';
}

export const CustomButton = styled(TouchableOpacity)<IButton>`
  height: ${hp('6.8%')}px;
  border-radius: ${hp('4.1%')}px;
  margin: ${hp('1.5%')}px;
  background-color: ${(p) => theme.components.button[p.type].background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: ${(p) => theme.components.button[p.type].borderWidth};
  border-color: ${(p) => theme.components.button[p.type].borderColor};
`;

export const CustomText = styled(Text)<IButton>`
  font-family: ${theme.fonts.text};
  font-size: ${hp('2.1%')}px;
  font-weight: bold;
  color: ${(p) => theme.components.button[p.type].color};
`;

const Button: FC<IButton> = ({ label, ...props }) => {
  return (
    <CustomButton {...props} label={label}>
      <CustomText {...props} label={label}>
        {label}
      </CustomText>
    </CustomButton>
  );
};

Button.displayName = 'Button';

export default Button;
