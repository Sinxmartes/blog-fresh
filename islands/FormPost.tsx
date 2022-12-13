import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";
import { TextArea } from "../components/Textarea.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { savePost } from "../utils/posts.ts";

interface FormProps {
  open: boolean;
}

interface FormData {
  title: string;
  snippet: string;
  datetime: Date;
  text: string;
}

/* export const handler: Handlers<FormData> = {
  GET(req, ctx) {
    const title: string = ;
    const snippet: string = ;
    const datetime: Date = ;
    const text: string = ;
    const query = url.searchParams.get("q") || "";
    const results = NAMES.filter((name) => name.includes(query));
    return ctx.render({ results, query });
  },
}; */



export default function FormPost(props: FormProps) {
  const [title, setTitle] = useState("");
  const [snippet, setSnippet] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(props.open);
  
  
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  async function save() {
    if(title && snippet && text) {
      const URL = window.location.toString();
      await fetch(`${URL}api/saveFile`, {
        method: "POST",
        "headers": {
          "content-type": "application/json"
        },
        "body": `{"title": "${title}", "snippet": "${snippet}", "text": "${text}"}`
      });
      alert("Salvo");
      setOpen(false);
      setTitle("");
      setSnippet("");
      setText("");
    } else {
      alert("Preencha os campos");
    }
  }

  return (
    <div class={`mt-8 flex flex-col space-y-5 border-solid border-2 border-sky-500 p-5 ${!open && "hidden"}`}>
      <div class="text-2xl  ml-1 font-bold">
        Insert Title
      </div>
      <Input name="title" placeholder="Title" onChange={(e) => setTitle(e.srcElement.value)} value={title} />
      <div class="text-2xl  ml-1 font-bold">
        Insert Snippet
      </div>
      <Input name="snippet" placeholder="Snippet" onChange={(e) => setSnippet(e.srcElement.value)} value={snippet} />
      <div class="text-2xl  ml-1 font-bold">
        Insert Text
      </div>
      <TextArea name="text" placeholder="Text" onChange={(e) => setText(e.srcElement.value)} value={text} />
      <Button class="px-3 py-2 bg-white rounded border(gray-500 2) hover:bg-gray-200" onClick={save}>Save</Button>
    </div>
  );
}
