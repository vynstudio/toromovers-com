import { ServiceGuidePage, serviceGuideMetadata } from "@/components/ServiceGuidePage";
import { officeMoversPage } from "@/lib/service-guides";

export const metadata = serviceGuideMetadata(officeMoversPage);

export default function OfficeMoversOrlandoPage() {
  return <ServiceGuidePage page={officeMoversPage} />;
}
