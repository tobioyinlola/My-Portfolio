import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { builtProjects } from "@/content/built";
import { ArchDiagram } from "@/components/ui/arch-diagram";

function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-line bg-surface/60 p-5">
      <span className="mb-2 inline-block rounded-full bg-mustard px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-[#16130f]">
        Placeholder
      </span>
      <div className="text-muted [&>*+*]:mt-3">{children}</div>
    </div>
  );
}

function Diagram({ project }: { project: string }) {
  const found = builtProjects.find((p) => p.slug === project);
  if (!found) throw new Error(`<ArchDiagram project="${project}" /> does not match any entry in content/built.ts`);
  return (
    <figure className="rounded-2xl border-2 border-line bg-surface p-4">
      <ArchDiagram project={found} />
      <figcaption className="mt-2 text-center font-mono text-[0.68rem] uppercase tracking-wider text-muted">{found.name} architecture (placeholder)</figcaption>
    </figure>
  );
}

const components = { Placeholder, ArchDiagram: Diagram };

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-site">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }} />
    </div>
  );
}
