import { ServiceGuidePage, serviceGuideMetadata } from "@/components/ServiceGuidePage";
import { podLoadingPage } from "@/lib/service-guides";

export const metadata = serviceGuideMetadata(podLoadingPage);

export default function PodLoadingOrlandoPage() {
  return <ServiceGuidePage page={podLoadingPage} />;
}
