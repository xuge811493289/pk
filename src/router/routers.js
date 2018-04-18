import base from "../page/base/router.js";
import desktop from "../page/desktop/router.js";
import pk from "../page/pk/router.js";

export default [
	...base,
	...desktop,
	...pk
]