// Core
import { getFullApiUrl, getPostApiID } from 'instruments';

const GROUP_ID = 'ecIqjXayz6K2';
const TOKEN = 'xowo3tw3cn';
const POST_ID = '';

const ROOT_URL = 'https://lab.lectrum.io/react/api';
const MAIN_URL = getFullApiUrl(ROOT_URL, GROUP_ID);
const MAIN_POST = getPostApiID(ROOT_URL, GROUP_ID, POST_ID);

export { GROUP_ID, TOKEN, MAIN_URL, MAIN_POST };
