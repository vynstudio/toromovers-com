import { ServiceGuidePage, serviceGuideMetadata } from "@/components/ServiceGuidePage";
import { packingServicesPage } from "@/lib/service-guides";

export const metadata = serviceGuideMetadata(packingServicesPage);

export default function PackingServicesOrlandoPage() {
  return <ServiceGuidePage page={packingServicesPage} />;
}
