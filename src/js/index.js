import '../styles/styles.css';
import JSONFormatter from 'json-formatter-js';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';

// import

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

const formatter = new JSONFormatter(dummyState, {
  animateOpen: true,
  animateClose: true,
});

document.getElementById('json-container').appendChild(formatter.render());

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
  try {
    const plainText = JSON.stringify(codeEditor.state.doc.toString().replace(/\n/g, ''));
    const noSpaces = plainText.replace(/\s/g, '');
    const trim = noSpaces.trim();
    console.log(JSON.parse(trim));
    // console.log(codeEditor);
  } catch (error) {
    console.log(error);
    alert('Invalid payload');
  }
};

button.addEventListener('click', dispatch);
