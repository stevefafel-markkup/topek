import { Platform } from "react-native"

const Color = {
    text: "#000",
    background: "white",
    backgroundFields: "rgb(248, 247, 250)",
    tint: "#EC5C5B", //"rgb(52, 133, 202)",
    tintInactive: "#999",
    separator: "rgba(225, 225, 225, 255)",
    subtle: "#999",
    tintNavbar: "#fff",
    white: "rgb(255, 255, 255)",
    red: "rgb(255, 59, 48)",
    orange: "rgb(255, 149, 0)",
    yellow: "rgb(255, 204, 0)",
    green: "rgb(76, 217, 100)",
    teal: "rgb(90, 200, 250)",
    blue: "rgb(0, 122, 255)",
    purple: "rgb(88, 86, 214)",
    pink: "rgb(255, 45, 85)",
}

const Dims = {
    horzPadding: 14,
    navbarHeight: 64
}

const TextSize = {
    tiny: 12,
    small: 14,
    normal: Platform.OS === "ios" ? 18 : 16,
    large: 18
}

export { Color, Dims, TextSize }