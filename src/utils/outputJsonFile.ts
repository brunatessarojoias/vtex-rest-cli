import fs from "fs-extra";
import path from "path";
import debugUtils from "./debug";

const debug = debugUtils.extend("outputJsonFile");

type Parameters = {
	fileName: string;
	pathName: string;
	data: Record<string, unknown> | Array<unknown>;
	format?: boolean;
};

/**
 * Description
 * @returns {string} It returns the file path as a string
 */
export default async function outputJsonFile({
	fileName,
	pathName,
	data,
	format = true,
}: Parameters) {
	try {
		const fileNameWithExt = fileName.endsWith(".json")
			? fileName
			: `${fileName}.json`;

		const filePath = path.normalize(`${pathName}/${fileNameWithExt}`);

		debug(
			`Saving JSON file '${fileNameWithExt}' in directory '${pathName}'.`
		);

		const options = {
			...(format && { spaces: "  " }),
		};

		await fs.outputJson(filePath, data, options);

		debug(`File '${fileNameWithExt}' saved successfully.`);

		return filePath;
	} catch (err) {
		debug(`An error occurred saving the file ${fileName}: %O`, err);
	}
}
