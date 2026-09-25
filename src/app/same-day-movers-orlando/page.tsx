import { ServiceGuidePage, serviceGuideMetadata } from "@/components/ServiceGuidePage";
import { sameDayMoversPage } from "@/lib/service-guides";

export const metadata = serviceGuideMetadata(sameDayMoversPage);

export default function SameDayMoversOrlandoPage() {
  return <ServiceGuidePage page={sameDayMoversPage} />;
}