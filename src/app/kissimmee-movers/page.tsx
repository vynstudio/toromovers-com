import { cityMetadata, RebrandCityPage } from "@/components/city/RebrandCityPage";
import { kissimmeeMovers } from "@/lib/city-rebrand/kissimmee";

export const metadata = cityMetadata(kissimmeeMovers);

export default function KissimmeeMoversPage() {
  return <RebrandCityPage city={kissimmeeMovers} />;
}
