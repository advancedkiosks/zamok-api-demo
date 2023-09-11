import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import JSONFormatter from 'json-formatter-js';
import '../styles/styles.css';
import convertStringToObject from './utils/convertStringToObject';

// JSON Viewer
const dummyState = {
  state0: {
    test: '1234',
    test2: '1234',
  },
  state1: {
    test: '1234',
    test2: '1234',
  },
  state2: {
    test: '1234',
    test2: '1234',
  },
  state3: {
    test: '1234',
    test2: '1234',
    test3: [1, 2, 3, 4],
  },
};

const formatter = new JSONFormatter(dummyState, 1, {
  animateOpen: true,
  animateClose: true,
});

document.getElementById('json-container').appendChild(formatter.render());

document.querySelector('.json-formatter-constructor-name').textContent = 'Initial State';

// JSON Editor
const state = EditorState.create({
  doc: `{
  type: '',
  payload: ''
}`,
  extensions: [basicSetup, EditorState.tabSize.of(2)],
});

const codeEditor = new EditorView({
  state,
  parent: document.querySelector('#action-payload'),
});

const button = document.getElementById('fire');

const dispatch = () => {
  const action = convertStringToObject(codeEditor.state.doc.toString());

  console.log(action);
};

button.addEventListener('click', dispatch);
