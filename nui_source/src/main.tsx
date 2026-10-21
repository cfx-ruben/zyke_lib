import ReactDOM from "react-dom/client";
import App from "./App";

import "./styling/index.css"
import "./styling/base_defaults.css"
import "./styling/codeblock.css"
import "./styling/kbd.css"
import "./styling/inputs.css"
import "./styling/select.css"
import "./styling/checkbox.css"
import "./styling/slider.css"
import "./styling/tooltip.css"
import { isEnvBrowser } from "./utils/misc";

// In the production build, this block is removed.
if (isEnvBrowser()) {
	import("./dev/mock").then((m) => m.isInBrowser());
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);
