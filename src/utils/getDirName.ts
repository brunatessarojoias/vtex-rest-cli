import { fileURLToPath } from "url";
import { dirname } from "path";

/**
 * Description
 * @param {ImportMeta["url"]} importUrl - Use 'import.meta.url' to get current module directory.
 */
export default function getDirName(importUrl: string) {
	return dirname(fileURLToPath(importUrl));
}
