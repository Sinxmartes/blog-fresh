import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import IconSquarePlus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/square-plus.tsx"
import FormPost from "./FormPost.tsx";

export default function Header() {
  const [open, setOpen] = useState(false);

  async function openModal() {
    if(window.ethereum) {
      let status: number;
      if(!open) {
        const URL = window.location.toString();
        const message = 'Welcome to Mars';
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        const sign = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, accounts[0], 'Random text'],
        });
        const retRequest = await fetch(`${URL}api/web3`, {
          method: "POST",
          "headers": {
            "content-type": "application/json"
          },
          "body": `{"sign": "${sign}"}`
        }); 
        status = retRequest.status;
        if(status == 200) {
          setOpen(true);
        } else {
          alert("Não autorizado");
        }
      } else {
        setOpen(false);
      }
    } else {
      alert("Precisa logar com a Metamask");
    }
  }

  return (
    <div>
      <div class="flex flex-row justify-between">
        <h1 class="text-5xl font-bold ">The Martian blog</h1>
        <Button class="border-none" onClick={() => openModal()}><IconSquarePlus /></Button>
      </div>
      <FormPost open={open} />
    </div>
  );
}
