export interface Post {
    slug: string;
    title: string;
    publishedAt: Date;
    content: string;
    snippet: string;
  }

export async function getPosts(): Promise<Post[]> {
    const files = Deno.readDir("./posts");
    const promises = [];
    for await (const file of files) {
      if(file.name != ".gitkeep") {
        const slug = file.name.replace(".md", "");
        promises.push(getPost(slug));
      }
    }
    const posts = await Promise.all(promises) as Post[];
    posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    return posts;
  }
  
  // Importing two new std lib functions to help with parsing front matter and joining file paths.
  import { extract } from "https://deno.land/std@0.145.0/encoding/front_matter.ts";
  import { join } from "https://deno.land/std@0.167.0/path/mod.ts";
  
  export async function getPost(slug: string): Promise<Post | null> {
    const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
    const { attrs, body } = extract(text);
    return {
      slug,
      title: attrs.title,
      publishedAt: new Date(attrs.published_at),
      content: body,
      snippet: attrs.snippet,
    };
  }