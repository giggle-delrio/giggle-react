import superagent from 'superagent';
import SocketIOClient from 'socket.io-client';
import * as convoAction from './convo-action.js';
import * as convoActions from './convo-action.js';

export const socketSet = socket => ({
  type: 'SOCKET_SET',
  payload: socket
});

export const socketDelete = () => ({
  type: 'SOCKET_DELETE'
});

export const connectSocket = profile => (dispatch, getState) => {
  let userName = profile.userName;
  let {socket} = getState();
  if(!socket && profile) {
    let socket = SocketIOClient(__API_URL__);
    socket.on(`updateConvos-${userName}`, () => {
      convoActions.requestConvos();
    })
    dispatch(socketSet(socket));
  }
}
