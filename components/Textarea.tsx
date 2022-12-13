import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function TextArea(props: JSX.HTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      /* disabled={!IS_BROWSER || props.disabled} */
      class={`px-3 py-2 bg-white rounded border(gray-500 2) disabled:(opacity-50 cursor-not-allowed) ${
        props.class ?? ""
      }`}
      
    />
  );
}
