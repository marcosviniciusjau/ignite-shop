import { globalCss } from ".";

export const globalStyles= globalCss({
    body: {
        backgroundColor: "$gray900",
        color: "$gray100",
        "-webkit-font-smoothing": "antialiased",
    },

    "body, input, textarea, button": {
        fontFamily: "Roboto",
        fontWeight: 400,
    },
})