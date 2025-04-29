import { v4 as uuidv4 } from "uuid";
import { setCache } from "./redis-service.js";

type Session = {
	uuid: string;
	expiresIn: number;
};

const getSession = async (userId: string): Promise<Session> => {
	const uuid = uuidv4();
	const expiresIn = 900;

	await setCache({
		key: `session:${uuid}`,
		value: userId,
		ttl: expiresIn,
	});

	return {
		uuid,
		expiresIn,
	};
};

export { getSession };
