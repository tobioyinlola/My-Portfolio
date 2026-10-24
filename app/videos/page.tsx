import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { VideoShelf } from "@/components/sections/video-shelf";

export const metadata: Metadata = pageMetadata({
  title: "Videos",
  description: "Case study walkthroughs, product teardowns, how-tos and building in public.",
  path: "/videos",
  kicker: "Videos",
});

export default function VideosPage() {
  return <VideoShelf full />;
}
