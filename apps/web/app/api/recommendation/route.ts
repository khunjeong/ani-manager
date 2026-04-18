import { buildRecommendationDigest, createSampleProfile } from "@ani-manager/ai-core";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";

export async function GET() {
  const response = buildRecommendationDigest({
    profile: createSampleProfile(),
    catalog: buildSeasonLineup()
  });

  return Response.json(response);
}
