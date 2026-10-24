import { site } from "@/config/site";
import { Button } from "@/components/ui/button";

export function SubscribeLink({ className }: { className?: string }) {
  return (
    <Button href={`${site.links.youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer" variant="terracotta" size="sm" className={className}>
      Subscribe on YouTube <span aria-hidden>↗</span>
    </Button>
  );
}
