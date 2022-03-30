import "dotenv/config";

function logEnvVar(envVar: string): void {
	if (envVar in process.env) {
		const tmp = process.env[envVar];

		return console.log(`${envVar}: ${tmp}`);
	}

	console.log(`'${envVar}' is not defined in process.env`);
}

logEnvVar("VTEX_ACCOUNT");
logEnvVar("VTEX_ACCOUNT_NAME");
