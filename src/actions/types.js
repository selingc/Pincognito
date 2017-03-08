/*	actions are named here, might need to branch into a
 *	new file when it gets full.
 */
const types = {
	CREATE_BOARD: 'CREATE_BOARD',
	FETCH_BOARDS: 'FETCH_BOARDS',
	DELETE_BOARD: 'DELETE_BOARD',
	STOP_BOARD_FETCH: 'STOP_BOARD_FETCH',
	CREATE_USER: 'CREATE_USER',
	UPDATE_USER_STATE: 'UPDATE_USER_STATE',
	LOGIN_USER: 'LOGIN_USER',
	LOGOFF_USER: 'LOGOFF_USER',
	USER_ERROR: 'USER_ERROR'
};

export default types;