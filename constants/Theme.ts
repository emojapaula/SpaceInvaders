interface IStyling {
  color?: string;
  background?: string;
  borderColor?: string;
  borderWidth?: string | number;
}
interface IComponents {
  button: {
    roundedWhite: IStyling;
    roundedBlue: IStyling;
    skinnyWhite: IStyling;
    skinnyBlue: IStyling;
    borderedWhite: IStyling;
    faded: IStyling;
  };
}
interface IPalette {
  primary: string;
  lightgrey: string;
  white: string;
  darkgrey: string;
  wildsand: string;
}
interface IFonts {
  heading: string;
  text: string;
}

const colors: IPalette = {
  primary: '#06576C',
  white: '#fff',
  lightgrey: '#EFEFEF',
  darkgrey: '#9A9A9A',
  wildsand: '#F4F4F4',
};
export interface IDefaultTheme {
  palette: IPalette;
  components: IComponents;
  fonts: IFonts;
}

export const theme: IDefaultTheme = {
  palette: colors,

  fonts: {
    heading: 'Patua one',
    text: 'open-sans',
  },

  components: {
    button: {
      roundedBlue: {
        color: colors.white,
        background: colors.primary,
        borderWidth: 0,
        borderColor: 'transparent',
      },
      roundedWhite: {
        color: colors.primary,
        background: colors.white,
        borderWidth: 0,
        borderColor: 'transparent',
      },
      skinnyWhite: {
        color: colors.white,
        background: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
      },

      skinnyBlue: {
        color: colors.primary,
        background: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
      },
      borderedWhite: {
        color: colors.primary,
        background: colors.white,
        borderWidth: '1px',
        borderColor: colors.primary,
      },
      faded: {
        color: colors.white,
        background: colors.lightgrey,
        borderWidth: 0,
        borderColor: 'transparent',
      },
    },
  },
};
