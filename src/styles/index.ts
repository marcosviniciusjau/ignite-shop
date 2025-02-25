import { createStitches } from "@stitches/react"

export const {
    config,
    styled,
    css,
    globalCss,
    keyframes,
    getCssText,
    theme,
    createTheme
} = createStitches({
    theme: {
        colors: {
            white: "#fff",

            gray900: "#121214",
            gray800: "#202024",
            gray300: "#c4c4cc",
            gray100: "#e1e1e6",

            red500: "#ab222e",
            red300: "#f75a68",
            red700: "#970809",
            green300: "#00b37e",
        },
        fontSizes: {
            md: '1.125rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '2.25rem',
        }
    }
})
