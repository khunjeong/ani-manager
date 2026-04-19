import { buildRecommendationDigest, buildWatchlist, createSampleProfile } from "@ani-manager/ai-core";
import { buildSeasonLineup } from "@ani-manager/content-ingestion";

export async function GET() {
  const profile = createSampleProfile();
  const catalog = buildSeasonLineup();
  const digest = buildRecommendationDigest({ profile, catalog });

  return Response.json(buildWatchlist({ catalog, digest }));
}
