/** @format */
import { Platform } from "react-native";

let constNumbers = {
    paddingHorizontalMain: 13,
    paddingHorizontalCard: 16,
    textInputPadding: 16,
    inputsMarginBottom: 16,

    borderRadiusMain: 8,
    borderRadiusSecond: 20,
    borderRadiusThird: 4,
    borderRadius100: 100,
    borderRadius1000: 1000,

    footerHeight: Platform.OS === 'ios' ? 75 : 65,
    headerHeight: 56,
    headerHeightSecond: 48,
    headerPaddingHeight: Platform.OS === 'ios' ? 40 : 0,
}

export default constNumbers;
