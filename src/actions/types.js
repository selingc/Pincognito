/*	actions are named here, might need to branch into a
 *	new file when it gets full.
 */
const types = {
	CREATE_USER: 'CREATE_USER',
	UPDATE_USER_STATE: 'UPDATE_USER_STATE',
	LOGIN_USER: 'LOGIN_USER',
	LOGOFF_USER: 'LOGOFF_USER',
	USER_ERROR: 'USER_ERROR',

	FETCH_USER_BOARDS: 'FETCH_USER_BOARDS',
	CREATE_USER_BOARD: 'CREATE_USER_BOARD',
	STOP_FETCHING_USER_BOARDS: 'STOP_FETCHING_USER_BOARDS',
	DELETE_USER_BOARD: 'DELETE_USER_BOARD',
	EDIT_USER_BOARD: 'EDIT_USER_BOARD',
	FETCH_USER_BOARD_IMAGE: 'FETCH_USER_BOARD_IMAGE',
	FETCH_USER_REMOVED_BOARDS: 'FETCH_USER_REMOVED_BOARDS',

	FETCH_BOARD_PINS: 'FETCH_BOARD_PINS',
	CREATE_BOARD_PIN: 'CREATE_BOARD_PIN',
	STOP_FETCHING_BOARD_PINS: 'STOP_FETCHING_BOARD_PINS',
	FETCH_BOARD_INFO: 'FETCH_BOARD_INFO',
	DELETE_BOARD_PIN: 'DELETE_BOARD_PIN',
	EDIT_BOARD_PIN: 'EDIT_BOARD_PIN',
	FETCH_REMOVED_BOARD_PINS: 'FETCH_REMOVED_BOARD_PINS',

	FETCH_USER_PINS: 'FETCH_USER_PINS',
	FETCH_USER_REMOVED_PINS: 'FETCH_USER_REMOVED_PINS',
	STOP_FETCHING_USER_PINS: 'STOP_FETCHING_USER_PINS',

	FETCH_PINS: 'FETCH_PINS',
	FETCH_REMOVED_PINS: 'FETCH_REMOVED_PINS',
	STOP_FETCHING_PINS: 'STOP_FETCHING_PINS',

	FOLLOW_BOARD: 'FOLLOW_BOARD',
	REPIN_TO_BOARD: 'REPIN_TO_BOARD',

	SAY_HELLO: 'SAY_HELLO',
	RESET_STATE: 'RESET_STATE'
};

export default types;