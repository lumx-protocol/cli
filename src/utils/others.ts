import { AnsweredQuestions } from 'src/main';

async function sleep(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

const splitStringAfterSlash = (str: string) => {
	if (str && str.includes('/')) {
		return str.split('/')[1];
	}

	throw new Error('Invalid string');
};

export type OptionsConfig = Omit<AnsweredQuestions, 'journey'> &
	typeof template & { clientId: string };

const template = {
	language: 'pt',
	addons: ['tokengating'],
} as const;

function createJson(options: Omit<AnsweredQuestions, 'journey'>) {
	const json: OptionsConfig = {
		...template,
		...options,
		clientId: splitStringAfterSlash(options.apiKey),
	};

	return json;
}

export { sleep, createJson };
