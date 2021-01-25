export const THEME_BREAKPOINTS_KEYS = Object.freeze(['xs', 'sm', 'md', 'lg', 'xl']);

export const THEME_BREAKPOINTS_DEFAULT = Object.freeze({
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
});

export const THEME_SPACE_DEFAULT = 8;

export const THEME_SHADOW_BLUR_DEFAULT = 1;
export const THEME_SHADOW_SPREAD_DEFAULT = 1;

// SETTINGS

export type ThemeSettingsBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ThemeSettingsBreakpointAny = ThemeSettingsBreakpoint | number;
export interface ThemeSettingsBreakpoints {
  values?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

export type ThemeSettingsTypographyKey = keyof HTMLElementTagNameMap | 'root' | 'headings' | 'codes' | 'controls';
export interface ThemeSettingsTypographyProps {
  fontFamily?: string
  fontSize?: number | string
  lineHeight?: number | string
}
export type ThemeSettingsTypographyPropsArrayItem = ThemeSettingsTypographyProps | undefined | null;
export type ThemeSettingsTypographyValue = ThemeSettingsTypographyProps | ThemeSettingsTypographyPropsArrayItem[];
export type ThemeSettingsTypography = Partial<Record<ThemeSettingsTypographyKey, ThemeSettingsTypographyValue>>;

export type ThemeSettingsSpace = number;

export interface ThemeSettingsShadow {
  blur?: number
  spread?: number
}

export type ThemeSettingsZIndexes = Record<string, number>;

export interface ThemeSettings {
  breakpoints?: ThemeSettingsBreakpoints
  typography?: ThemeSettingsTypography
  space?: ThemeSettingsSpace
  shadow?: ThemeSettingsShadow
  zIndexes?: ThemeSettingsZIndexes
  [prop: string]: any
}

// SETUP

export interface ThemeSetupBreakpoints {
  values: {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
  }
}

export interface ThemeSetupTypography extends ThemeSettingsTypography {}

export type ThemeSetupSpace = ThemeSettingsSpace;

export interface ThemeSetupShadow {
  blur: number
  spread: number
}

export type ThemeSetupZIndexes = ThemeSettingsZIndexes;

export interface ThemeSetup {
  breakpoints: ThemeSetupBreakpoints
  typography: ThemeSetupTypography
  space: ThemeSetupSpace
  shadow: ThemeSetupShadow
  zIndexes: ThemeSetupZIndexes
  extraFeatures: Record<string, any>
}

// CONSUMER

export interface ThemeBreakpoints {
  keys: readonly string[]
  values: ThemeSetupBreakpoints['values']
  up: (key: ThemeSettingsBreakpointAny) => string
  down: (key: ThemeSettingsBreakpointAny) => string
  only: (key: ThemeSettingsBreakpoint) => string
  between: (start: ThemeSettingsBreakpointAny, end: ThemeSettingsBreakpointAny) => string
}

export type ThemeTypographyKey = ThemeSettingsTypographyKey;
export type ThemeTypographyProps = ThemeSettingsTypographyProps | Partial<Record<string, ThemeSettingsTypographyProps>>;
export type ThemeTypography = Partial<Record<ThemeTypographyKey, ThemeTypographyProps>>;

export type ThemeSpace = (multiplier?: number) => number;

export interface ThemeShadow {
  blur: (multiplier?: number) => number
  spread: (multiplier?: number) => number
}

export type ThemeZIndexes = ThemeSettingsZIndexes;

export interface Theme {
  breakpoints: ThemeBreakpoints
  typography: ThemeTypography
  space: ThemeSpace
  shadow: ThemeShadow
  zIndexes: ThemeZIndexes
  [prop: string]: any
}