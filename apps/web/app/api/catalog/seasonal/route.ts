import { buildSeasonLineup } from "@ani-manager/content-ingestion";

export async function GET() {
  return Response.json(buildSeasonLineup());
}
