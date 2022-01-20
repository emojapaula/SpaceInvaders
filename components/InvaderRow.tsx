import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { invaders } from '../assets/assets.icons';

const ImageContainer = styled(View)`
  width: 60%;
  /* height: 30%; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* height: 10%; */

  /* padding-top: ${hp('20%')}px; */
  /* margin-bottom: -5%; */
  /* background-color: blue; */
`;

const StyledImage = styled(View)`
  /* flex: 1; */
  /* height: 100px; */
  height: ${hp('15%')}px;
  width: 60px;
  width: ${wp('18%')}px;
  /* height: 50px; */
`;

export default function InvaderRow() {
  return (
    <ImageContainer>
      <StyledImage>
        <invaders.purpleInvader />
      </StyledImage>
      <StyledImage>
        <invaders.purpleInvader />
      </StyledImage>
      <StyledImage>
        <invaders.purpleInvader />
      </StyledImage>
    </ImageContainer>
  );
}
