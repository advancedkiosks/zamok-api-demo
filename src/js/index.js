import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import JSONFormatter from 'json-formatter-js';
import '../styles/styles.css';
import convertStringToObject from './utils/convertStringToObject';
import getStateDifference from './utils/getStateDifference';
import { Zamok } from './zamok';

const zamok = new Zamok.api({
  topWindowOrigin: 'http://localhost:8081/?zamok=16.2.0',
});

let initialState = {};

// JSON Editor
const state = EditorState.create({
  doc: `{
  type: 'OPEN_GUEST_POPUP',
  payload: ''
}`,
  extensions: [basicSetup, EditorState.tabSize.of(2)],
});

const codeEditor = new EditorView({
  state,
  parent: document.querySelector('#action-payload'),
});

const button = document.getElementById('fire');

const renderStateTree = (state, parentId) => {
  const parent = document.getElementById(parentId);

  // Get the old child if it exists
  const oldChild = parent.querySelector('.json-formatter-row');

  const tree = new JSONFormatter(state, 1, {
    animateOpen: true,
    animateClose: true,
  });

  if (oldChild) {
    // Remove the old child if it exists
    parent.removeChild(oldChild);
  }

  // Append the new tree element
  parent.appendChild(tree.render());
};

const dispatch = () => {
  const action = convertStringToObject(codeEditor.state.doc.toString());

  zamok.dispatch(action).then((state) => {
    const difference = getStateDifference(initialState, state);
    initialState = state;

    renderStateTree(initialState, 'json-container');
    renderStateTree(difference, 'json-container-2');
  });
};

button.addEventListener('click', dispatch);

// zamok
//   .waitForAction('OPEN_GUEST_POPUP')
//   .then(({ action, state }) => console.log('OPEN_GUEST_POPUP received', state, action)); // TODO replace SOME_ACTION with a valid API Action
zamok.getState().then((state) => {
  console.log('latest state from the kiosk:', state);
  initialState = state;
  renderStateTree(initialState, 'json-container');
});
