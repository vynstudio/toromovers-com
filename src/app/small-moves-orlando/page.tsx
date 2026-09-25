import { ServiceGuidePage, serviceGuideMetadata } from "@/components/ServiceGuidePage";
import { smallMovesPage } from "@/lib/service-guides";

export const metadata = serviceGuideMetadata(smallMovesPage);

export default function SmallMovesOrlandoPage() {
  return <ServiceGuidePage page={smallMovesPage} />;
}
