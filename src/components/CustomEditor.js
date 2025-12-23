"use client"; // This directive is crucial

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CustomEditor = ({ data, onChange }) => {
  return (
    <div className="prose text-black max-w-none">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "undo",
            "redo",
          ],
        }}
      />
      <style jsx global>{`
        /* Fix for CKEditor height in Tailwind */
        .ck-editor__editable {
          min-height: 200px;
          max-height: 400px;
        }
      `}</style>
    </div>
  );
};

export default CustomEditor;
