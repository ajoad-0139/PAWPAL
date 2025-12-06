import { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Dropcursor from '@tiptap/extension-dropcursor';
import { Blockquote } from '@tiptap/extension-blockquote';
import Italic from '@tiptap/extension-italic';
import Image from '@tiptap/extension-image';
import Bold from '@tiptap/extension-bold';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Styles.scss';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { blogs, saveBlogPost, setIsShowBlogTypeModal, updateBlogPost } from '@/Store/Blog';
import { setBlogs } from '@/Store/Blog';

const CustomImage = Image.extend({
  renderHTML({ HTMLAttributes }) {
    return ['img', {
      ...HTMLAttributes,
      style: 'width: 100%; height:500px; object-fit: cover; object-position: top;',
    }];
  },
});

const extensions = [
  Document,
  Paragraph,
  Text,
  Blockquote,
  Heading.configure({ levels: [1, 2, 3, 4] }),
  CustomImage,
  Dropcursor,
  Bold,
  Italic,
];


const Tiptap = ({setBlogContent, editorContent, editBlogId}) => {
  const content = editorContent?editorContent:'<h4>Hola! wanna express your thoughts? Start writing now...</h4>';
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions,
    content,
  });

  const addImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        editor?.chain().focus().setImage({ src: reader.result }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const dispatch = useDispatch();
  const postBlog = () => {
    const contentJson = editor.getJSON();
    setBlogContent({...contentJson})
    dispatch(setIsShowBlogTypeModal(true));

    // dispatch(saveBlogPost({contentJson,type}));
    // dispatch(setBlogs(contentJson));
  };
  
  const currentBlogs = useSelector(blogs)
  const editBlog =()=>{
    const targetBlog = currentBlogs.find((item)=>item._id===editBlogId);
    dispatch(updateBlogPost({oldContentJson:targetBlog.content, newContentJson:editor.getJSON(), blogId:editBlogId}));
  }
  useEffect(() => {
    if (editor && editorContent) {
      editor.commands.setContent(editorContent);
    }
  }, [editorContent, editor]);
  return (
    <div className='flex w-full h-full gap-3.5 flex-col justify-center items-center'>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        accept='image/*'
        onChange={addImage}
      />

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className='px-[10px] w-[190px] h-[40px] bg-white rounded-xl text-black flex justify-between items-center'>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active font-mono text-3xl text-blue-500 font-extralight italic' : 'font-mono text-3xl font-extralight italic'}>
              &#119894;
            </button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive('blockquote') ? 'is-active font-mono text-3xl text-blue-500 font-extralight italic' : 'font-mono text-3xl font-extralight italic'}>
              &#8220;
            </button>
            <button onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active font-mono text-3xl text-blue-500 font-extralight italic' : 'font-mono text-3xl font-extralight italic'}>
              &#120433;
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`font-mono text-3xl font-extralight mr-[-15px] italic ${editor.isActive('heading', { level: 3 }) ? 'is-active text-blue-500' : ''}`}>
              &#119827;
            </button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
              className={`font-mono text-2xl font-extralight italic ${editor.isActive('heading', { level: 4 }) ? 'is-active text-blue-500' : ''}`}>
              &#119827;
            </button>
          </div>
        </BubbleMenu>
      )}
      <section className=' w-[70px] h-[150px]  rounded-md fixed top-[120px] right-[20px] gap-[20px] flex flex-col justify-start py-4 items-center'>
        <button
          onClick={() => fileInputRef.current?.click()}
          className='cursor-pointer group relative'
        >
          <div className='absolute group-hover:flex hidden top-[80%] right-[100%] w-[100px] h-[25px] bg-neutral-300 text-black rounded-sm justify-center items-center'>Add Image</div>
          <FontAwesomeIcon icon="fa-regular fa-image" className='text-3xl' />
        </button>
        <button onClick={editBlogId?editBlog:postBlog} className='cursor-pointer relative group'>
          <div className='absolute group-hover:flex hidden top-[80%] right-[100%] w-[100px] h-[25px] bg-neutral-300 text-black rounded-sm justify-center items-center'>{editBlogId?'Edit Post':'Save Post'}</div>
          <FontAwesomeIcon icon="fa-regular fa-floppy-disk"  className='text-3xl' />
        </button>
      </section>
      <EditorContent editor={editor} className='w-full border-[1px] border-neutral-700 p-4 flex justify-center ' />
    </div>
  );
};

export default Tiptap;