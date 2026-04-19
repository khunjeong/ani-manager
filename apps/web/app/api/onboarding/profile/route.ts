import { createSampleOnboardingSnapshot, createSampleProfile } from "@ani-manager/ai-core";

export async function POST() {
  return Response.json({
    profile: createSampleProfile(),
    onboarding: createSampleOnboardingSnapshot(),
    createdAt: new Date().toISOString()
  });
}
