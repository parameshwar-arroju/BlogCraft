import ReactQuill from 'react-quill';
export function Editor({ value, onChange }) {
    const modules = {
        toolbar: [
            [{ header: [3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link'],
            ['clean'],
        ],
    };
    return (<>
        <div className="content">
            <ReactQuill
                value={value}
                theme={'snow'}
                onChange={onChange}
                modules={modules} 
                style={{height: '18rem', marginBottom: '3rem'}}/>
        </div>
    </>);
}