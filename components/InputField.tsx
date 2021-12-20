import React, { FC } from 'react';
import { View, TextInput, ViewStyle, NativeSyntheticEvent, TextInputEndEditingEventData } from 'react-native';
import styled from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { theme } from '../constants/Theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import Text from '../reusable-components/Text';
import { Text } from './reusable-components/Text';

interface IInputFieldProps extends Partial<ViewStyle> {
  value: string;
  onChange: (value: string) => void;
  onChangeEnd: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
  icon?: string;
  placeholder?: string;
  label?: string;
  info?: string;
  editable?: boolean;
  keyboardType?: string;
  classId?: boolean;
}

const Input = styled(TextInput)`
  flex: 1;
  color: ${theme.palette.tundora};
  font-family: ${theme.fonts.interRegular};
  font-size: ${hp('7%')}px;
  text-align: center;
`;

const Icon = styled(Feather)`
  color: ${theme.palette.darkgrey};
  font-size: ${hp('1.9%')}px;
  margin-right: ${wp('3.8%')}px;
`;

const InputContainer = styled(View)<Partial<ViewStyle>>`
  width: ${wp('60%')}px;
  height: ${hp('10.55%')}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.palette.wildsand};
  border-radius: 6px;
  padding-left: ${wp('5.9%')}px;
  padding-right: ${wp('5.9%')}px;
`;

const Container = styled(View)`
  margin: ${wp('2%')}px auto;
`;

const LabelContainer = styled(View)`
  flex-direction: row;
`;

const InputNameLabel = styled(Text)`
  font-family: ${theme.fonts.openSemi};
  font-size: ${theme.components.input.label.fontSize};
  color: ${theme.components.input.label.color};
  padding-left: ${wp('2%')}px;
`;

const InputInfoLabel = styled(Text)`
  font-family: ${theme.fonts.openSemi};
  font-size: ${theme.components.input.info.fontSize};
  color: ${theme.components.input.info.color};
  padding-right: ${wp('2%')}px;
  margin-left: auto;
`;

export const InputField: FC<IInputFieldProps> = ({
  value,
  onChange,
  onChangeEnd,
  icon,
  placeholder,
  label,
  info,
  editable,
  classId,
  ...props
}) => {
  return (
    <Container>
      <LabelContainer>
        {label && <InputNameLabel>{label}</InputNameLabel>}
        {info && <InputInfoLabel>{info}</InputInfoLabel>}
      </LabelContainer>
      <InputContainer style={{ ...props }}>
        {icon ? <Icon name={icon} /> : null}
        {classId ? (
          <Input
            placeholder={placeholder}
            placeholderTextColor="#9a9a9a"
            autoCorrect={false}
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onEndEditing={onChangeEnd}
            editable={editable}
            maxLength={6}
            keyboardType="numeric"
          />
        ) : (
          <Input
            placeholder={placeholder}
            placeholderTextColor="#9a9a9a"
            autoCorrect={false}
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
            onEndEditing={onChangeEnd}
            editable={editable}
          />
        )}
      </InputContainer>
    </Container>
  );
};

/*HOW TO USE -> 
    on the screen that uses searchbar, define   

    const [searchTerm, setSearchTerm] = useState("");

    and then call the searchbar like this: 

    <InputField
        icon={'search'}
        value={setSearchTerm}
        onChange={setTerm}
        onChangeEnd={() => searchApi(term)}
        borderRadius={25}
      />

*/
