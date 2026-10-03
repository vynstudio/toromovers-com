import { cityMetadata, RebrandCityPage } from "@/components/city/RebrandCityPage";
import { sanfordMovers } from "@/lib/city-rebrand/sanford";

export const metadata = cityMetadata(sanfordMovers);

export default function SanfordMoversPage() {
  return <RebrandCityPage city={sanfordMovers} />;
}
