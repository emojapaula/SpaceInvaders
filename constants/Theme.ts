interface IStyling {
  color?: string;
  background?: string;
  borderColor?: string;
  borderWidth?: string | number;
  fontSize?: string;
}
interface IComponents {
  button: {
    primary: IStyling;
    secondary: IStyling;
    ternary: IStyling;
  };
  networkRectangle: {
    noNodes: IStyling;
    allNodes: IStyling;
    someNodes: IStyling;
  };
  input: {
    label: IStyling;
    info: IStyling;
  };
}
interface IPalette {
  primary: string;
  lightgrey: string;
  white: string;
  darkgrey: string;
  wildsand: string;
  lightBlue: string;
  red: string;
  green: string;
  anothergrey: string;
  linegrey: string;
  tundora: string;
  seaweed: string;
  grey: string;
  dirtywhite: string;
  black: string;
  ash: string;
  eerieBlack: string;
  brick: string;
  marigold: string;
  blackOlive: string;
  porsche: string;
  chinaRose: string;
  champagne: string;
}
export interface IFonts {
  text: string;
  interSemiBold: string;
  interRegular: string;
  robotoBold: string;
  openSemi: string;
  latoBold: string;
  openBold: string;
  interBold: string;
  robotoMedium: string;
}

const colors: IPalette = {
  primary: '#0089C6',
  white: '#fff',
  lightgrey: '#EFEFEF',
  darkgrey: '#9A9A9A',
  grey: '#828282',
  wildsand: '#F4F4F4',
  lightBlue: '#5BC0DE',
  red: '#D34747',
  green: '#5CB85C',
  anothergrey: '#828282',
  linegrey: '#E8E8E8',
  tundora: '#4E4E4E',
  seaweed: '#18839E',
  dirtywhite: '#d8d8d8',
  black: '#202020',
  ash: '#484848',
  eerieBlack: '#1d1d1d',
  brick: '#C22D2D',
  marigold: '#C2872D',
  blackOlive: '#3A3A3A',
  porsche: '#E6B263',
  chinaRose: '#B74F6F',
  champagne: '#EFD5C3',
};
export interface IDefaultTheme {
  palette: IPalette;
  components: IComponents;
  fonts: IFonts;
}

export const theme: IDefaultTheme = {
  palette: colors,

  fonts: {
    text: 'open-sans',
    interSemiBold: 'inter-semiBold',
    interRegular: 'inter-regular',
    robotoBold: 'roboto-bold',
    openSemi: 'open-semi-bold',
    latoBold: 'lato-bold',
    openBold: 'open-sans-bold',
    interBold: 'inter-font-bold',
    robotoMedium: 'roboto-medium',
  },

  components: {
    button: {
      primary: {
        color: colors.white,
        background: colors.primary,
        borderWidth: 0,
        borderColor: 'transparent',
      },
      secondary: {
        color: colors.primary,
        background: 'transparent',
        borderWidth: '1px',
        borderColor: colors.primary,
      },
      ternary: {
        color: colors.primary,
        background: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
      },
    },
    input: {
      label: {
        color: colors.anothergrey,
        fontSize: '9px',
      },
      info: {
        color: colors.marigold,
        fontSize: '9px',
      },
    },
    networkRectangle: {
      noNodes: {
        background: colors.lightBlue,
      },
      someNodes: {
        background: colors.red,
      },
      allNodes: {
        background: colors.green,
      },
    },
  },
};
