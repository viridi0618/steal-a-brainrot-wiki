import { loadRuntimeData } from "./load-runtime-data.mjs";

export async function loadPublishedManifest() {
  const { published } = await loadRuntimeData();

  return {
    brainrots: published.publishedBrainrots.map((record) => ({
      slug: record.slug,
      href: `/brainrots/${record.slug}`,
      indexable: published.indexableBrainrots.some((item) => item.slug === record.slug),
    })),
    traits: published.publishedTraits.map((record) => ({
      slug: record.slug,
      href: `/traits/${record.slug}`,
      indexable: published.indexableTraits.some((item) => item.slug === record.slug),
    })),
  };
}
