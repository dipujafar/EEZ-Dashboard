import dynamic from 'next/dynamic';
import { useRef } from 'react';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// @ts-ignore
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: [
      ['image'],
      [{
        'size': ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '72px']
      }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [
        { 'list': 'ordered' },   // 1. 2. 3.
        { 'list': 'bullet' },    // • bullet
        { 'list': 'check' },     // ☑ checklist
      ],
      [{ 'indent': '-1' }, { 'indent': '+1' }],  // indented sub-lists
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'blockquote', 'code-block'],
      ['clean']
    ],
  };

  const formats = [
    'image', 'size', 'bold', 'italic', 'underline',
    'list', 'bullet', 'indent', 'link'
  ];

  return (
    <div className="bg-white rounded-lg border">
      <ReactQuill
        // @ts-ignore
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: '300px', marginBottom: '42px', overflow: 'auto' }}
        className='scroll-hide'
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(RichTextEditor), {
  ssr: false,
});
