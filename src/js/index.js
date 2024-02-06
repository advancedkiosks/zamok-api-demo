import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import JSONFormatter from 'json-formatter-js';
import '../styles/styles.css';
import convertStringToObject from './utils/convertStringToObject';
import getStateDifference from './utils/getStateDifference';
import { Zamok } from './zamok';
import LockBg from '../../public/assets/lock.jpg';
import InitialLogo from '../../public/assets/zamok-basic-0.png';
import ChangedLogo from '../../public/assets/zamok-basic-1.png';
import SubmittedLogo from '../../public/assets/zamok-basic-2.png';

// ONE ERROR IN THIS SCRIPT CAUSES THE WHOLE UI TO BREAK.

console.log(process.env.NODE_ENV);

const zamok = new Zamok.api({
  topWindowOrigin:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8081/'
      : 'https://advancedkiosks.github.io/zamok-api-demo/',
});

console.log('[zamok-api-demo]', { zamok });

let initialState = {};
let difference = {};
let initEditor = 0;

document.getElementsByTagName('body')[0].style.backgroundImage = `url(${LockBg})`;
const logoElement = document.getElementById('Logo');

logoElement.src = InitialLogo;

// JSON Editor
const state = EditorState.create({
  doc: `{
  type: 'SESSION_RESET'
}`,
  extensions: [
    basicSetup,
    EditorState.tabSize.of(2),
    EditorView.updateListener.of(function (e) {
      initEditor++;

      if (initEditor > 1) {
        logoElement.src = ChangedLogo;
      }
    }),
  ],
});

const codeEditor = new EditorView({
  state,
  parent: document.getElementById('action-payload'),
});

const button = document.getElementById('fire');
const copyButton = document.getElementById('copy');
const copyDifferenceButton = document.getElementById('copy-difference');

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

  console.log('Dispatching action to Zamok...');

  if (zamok) {
    zamok
      .dispatch(action)
      .catch((e) => console.error(e))
      .then((state) => {
        const difference = getStateDifference(initialState, state);
        initialState = state;

        logoElement.src = SubmittedLogo;
        renderStateTree(initialState, 'json-container');
        renderStateTree(difference, 'json-container-2');
      })
      .finally(() => console.log('dispatch promise finished'));
  } else {
    console.warn('Not in zamok');
  }
};

const copyToClipboard = (obj) => {
  navigator.clipboard.writeText(JSON.stringify(obj));
};

button.addEventListener('click', dispatch);
copyButton.addEventListener('click', () => copyToClipboard(initialState));
copyDifferenceButton.addEventListener('click', () => copyToClipboard(difference));

zamok.getState().then((state) => {
  console.log('latest state from the kiosk:', state);
  initialState = state;
  renderStateTree(initialState, 'json-container');
});
