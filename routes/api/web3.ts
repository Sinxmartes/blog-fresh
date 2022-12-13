import { HandlerContext } from "$fresh/server.ts";
import Web3 from 'https://deno.land/x/web3/mod.ts'

export const handler = async (_req: Request): Promise<Response> => {
  const body = JSON.parse(await _req.text());

    const _web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/2b2405f60c5b46da859de25138287e17"));
    const message: string = Deno.env.get("MESSAGE");
    const wallet_address = _web3.eth.accounts.recover(
        message,
        body.sign,
    );
    if(wallet_address == Deno.env.get("ADDRESS")) {
      return new Response("true", {
        status: 200,
        headers: {
          "content-type": "text/html",
        },
      });
    } else {
      return new Response("false", {
        status: 401,
        headers: {
          "content-type": "text/html",
        },
      });
    }
};