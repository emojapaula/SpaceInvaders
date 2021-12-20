import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import { theme } from '../../constants/Theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BUTTON_TYPE } from '../../constants/Constants';

interface IButton {
  label?: string;
  type: BUTTON_TYPE;
  onPress: () => any;
  backgroundColor?: string;
  color?: string;
  width?: string;
  icon?: object;
}

export const CustomButton = styled(TouchableOpacity)<IButton>`
  min-height: ${hp('6.8%')}px;
  max-height: ${hp('6.8%')}px;
  max-width: ${(p) => (p.width ? `${wp(p.width)}px` : `${wp('100%')}px`)};
  border-radius: ${hp('4.1%')}px;
  margin: ${hp('1.2%')}px;
  background-color: ${(p) => (p.backgroundColor ? p.backgroundColor : theme.components.button[p.type].background)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: ${(p) => theme.components.button[p.type].borderWidth};
  border-color: ${(p) => (p.color ? p.color : theme.components.button[p.type].color)};
  flex-grow: 1;
`;

export const CustomText = styled(Text)<IButton>`
  font-family: ${theme.fonts.openBold};
  font-size: ${hp('2.1%')}px;
  color: ${(p) => (p.color ? p.color : theme.components.button[p.type].color)};
`;

const Button: FC<IButton> = ({ label, icon, ...props }) => {
  return (
    <CustomButton {...props} label={label}>
      <CustomText {...props} label={label}>
        {label}
        {icon}
      </CustomText>
    </CustomButton>
  );
};

Button.displayName = 'Button';

export default Button;
