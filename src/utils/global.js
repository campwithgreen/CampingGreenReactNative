import { navigateTo } from "../navigation/utils/RootNavigation";


export function navigateHandler(itemContents) {
    if (itemContents.navigateScreen) {
        if (typeof (itemContents.navigateScreen) == "function") {
            (itemContents.navigateScreen)()
        } else {
            navigateTo(itemContents.navigateScreen)
        }
    } else {
        return
    }
}