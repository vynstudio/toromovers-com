import { cityMetadata, RebrandCityPage } from "@/components/city/RebrandCityPage";
import { winterParkMovers } from "@/lib/city-rebrand/winter-park";

export const metadata = cityMetadata(winterParkMovers);

export default function WinterParkMoversPage() {
  return <RebrandCityPage city={winterParkMovers} />;
}
