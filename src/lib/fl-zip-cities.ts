/**
 * Backup ZIP to city map for Central Florida (Orange, Seminole, Osceola,
 * Lake, Volusia, Polk, Brevard). Used when Mapbox does not answer, so a typed
 * ZIP still fills in its city.
 */
const ZIP_CITY: Record<string, string> = {
  // Orange
  "32703": "Apopka", "32704": "Apopka", "32712": "Apopka",
  "32709": "Christmas", "32733": "Goldenrod", "32751": "Maitland",
  "32776": "Mount Dora", "32789": "Winter Park", "32790": "Winter Park",
  "32792": "Winter Park", "32798": "Zellwood", "32820": "Orlando",
  "32801": "Orlando", "32803": "Orlando", "32804": "Orlando",
  "32805": "Orlando", "32806": "Orlando", "32807": "Orlando",
  "32808": "Orlando", "32809": "Orlando", "32810": "Orlando",
  "32811": "Orlando", "32812": "Orlando", "32814": "Orlando",
  "32817": "Orlando", "32818": "Orlando", "32819": "Orlando",
  "32821": "Orlando", "32822": "Orlando", "32824": "Orlando",
  "32825": "Orlando", "32826": "Orlando", "32827": "Orlando",
  "32828": "Orlando", "32829": "Orlando", "32831": "Orlando",
  "32832": "Orlando", "32833": "Orlando", "32835": "Orlando",
  "32836": "Orlando", "32837": "Orlando", "32839": "Orlando",
  "32830": "Lake Buena Vista", "34734": "Gotha", "34760": "Oakland",
  "34761": "Ocoee", "34786": "Windermere", "34787": "Winter Garden",
  // Seminole
  "32701": "Altamonte Springs", "32714": "Altamonte Springs",
  "32707": "Casselberry", "32708": "Winter Springs",
  "32730": "Casselberry", "32732": "Geneva", "32746": "Lake Mary",
  "32750": "Longwood", "32779": "Longwood", "32765": "Oviedo",
  "32766": "Oviedo", "32771": "Sanford", "32773": "Sanford",
  // Osceola
  "34741": "Kissimmee", "34743": "Kissimmee", "34744": "Kissimmee",
  "34746": "Kissimmee", "34747": "Kissimmee", "34758": "Kissimmee",
  "34759": "Kissimmee", "34739": "Kenansville", "34769": "Saint Cloud",
  "34771": "Saint Cloud", "34772": "Saint Cloud", "34773": "Saint Cloud",
  // Lake
  "32726": "Eustis", "32735": "Grand Island", "32757": "Mount Dora",
  "32778": "Tavares", "34711": "Clermont", "34714": "Clermont",
  "34715": "Clermont", "34736": "Groveland", "34737": "Howey in the Hills",
  "34748": "Leesburg", "34788": "Leesburg", "34753": "Mascotte",
  "34756": "Montverde", "34797": "Yalaha", "32159": "Lady Lake",
  // Volusia
  "32114": "Daytona Beach", "32117": "Daytona Beach",
  "32118": "Daytona Beach", "32119": "Daytona Beach",
  "32124": "Daytona Beach", "32127": "Port Orange", "32128": "Port Orange",
  "32129": "Port Orange", "32168": "New Smyrna Beach",
  "32169": "New Smyrna Beach", "32174": "Ormond Beach",
  "32176": "Ormond Beach", "32713": "DeBary", "32720": "DeLand",
  "32724": "DeLand", "32725": "Deltona", "32738": "Deltona",
  "32744": "Lake Helen", "32763": "Orange City", "32764": "Osteen",
  "32130": "De Leon Springs", "32132": "Edgewater", "32141": "Edgewater",
  // Polk
  "33801": "Lakeland", "33803": "Lakeland", "33805": "Lakeland",
  "33809": "Lakeland", "33810": "Lakeland", "33811": "Lakeland",
  "33812": "Lakeland", "33813": "Lakeland", "33815": "Lakeland",
  "33823": "Auburndale", "33830": "Bartow", "33837": "Davenport",
  "33896": "Davenport", "33897": "Davenport", "33838": "Dundee",
  "33844": "Haines City", "33849": "Kathleen", "33850": "Lake Alfred",
  "33853": "Lake Wales", "33859": "Lake Wales", "33860": "Mulberry",
  "33880": "Winter Haven", "33881": "Winter Haven", "33884": "Winter Haven",
  // Brevard
  "32780": "Titusville", "32796": "Titusville", "32754": "Mims",
  "32901": "Melbourne", "32904": "Melbourne", "32934": "Melbourne",
  "32935": "Melbourne", "32940": "Melbourne", "32903": "Indialantic",
  "32905": "Palm Bay", "32907": "Palm Bay", "32908": "Palm Bay",
  "32909": "Palm Bay", "32920": "Cape Canaveral", "32922": "Cocoa",
  "32926": "Cocoa", "32927": "Cocoa", "32931": "Cocoa Beach",
  "32937": "Satellite Beach", "32950": "Malabar",
  "32951": "Melbourne Beach", "32952": "Merritt Island",
  "32953": "Merritt Island", "32955": "Rockledge", "32976": "Sebastian",
};

/** City for a 5-digit ZIP from the backup map, or "". */
export function cityForZip(zip: string): string {
  const key = (zip.trim().match(/^\d{5}/) || [])[0] || "";
  return key ? ZIP_CITY[key] || "" : "";
}

/** "32789" (or "32789-1234") on its own. */
export function isZipOnly(value: string): boolean {
  return /^\d{5}(?:-\d{4})?$/.test(value.trim());
}

/** "Winter Park, FL 32789" for a known ZIP, or "" when the ZIP is unknown. */
export function zipAreaLine(zip: string): string {
  const key = (zip.trim().match(/^\d{5}/) || [])[0] || "";
  const city = cityForZip(key);
  return city ? `${city}, FL ${key}` : "";
}

/** Backup city suggestions for a typed ZIP or ZIP prefix (3+ digits). */
export function fallbackZipLines(query: string, limit = 6): string[] {
  const q = query.trim();
  if (!/^\d{3,5}$/.test(q)) return [];
  return Object.keys(ZIP_CITY)
    .filter((zip) => /^\d{5}$/.test(zip) && zip.startsWith(q))
    .sort()
    .slice(0, limit)
    .map((zip) => `${ZIP_CITY[zip]}, FL ${zip}`);
}

/**
 * A usable move location: a 5-digit ZIP, a city name, or a street address.
 * Suggestions are helpers, so any of these is accepted as typed.
 */
export function isUsableLocation(value: string): boolean {
  const text = value.trim();
  if (text.length > 200) return false;
  if (/\b\d{5}(?:-\d{4})?\b/.test(text)) return true;
  // City or street: at least two letters in a row.
  return /[a-zA-Z]{2,}/.test(text);
}
