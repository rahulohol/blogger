import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const config = {
  toolbarButtonSize: 'middle',
  buttons: [
    'bold',
    'italic',
    'link',
    'unlink',
    'underline',
    'source',
    'copyformat',
    '|',
    'strikethrough',
    'symbol',
  ],
  style: {
    // background: '#27272E',
    // color: 'rgba(255,255,255,0.5)',
    color: 'black',
    textAlign: 'left',
  },
  height: 250,
  removeButtons: ['image', 'brush', 'fontsize', 'eraser'],

  defaultActionOnPaste: 'insert_as_html',
  defaultActionOnPasteFromWord: 'insert_as_html',
  askBeforePasteFromWord: false,
  askBeforePasteHTML: false,
};

const RichTextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={newContent => getValue(newContent)}
    />
  );
};

export default RichTextEditor;
