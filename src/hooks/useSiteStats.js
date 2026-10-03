import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import siteStatsFallback from "@site/src/data/siteStats.json";

/**
 * Universal hook for site-wide dynamic statistics.
 * Reads runtime stats from Docusaurus config customFields with an automated
 * fallback to precomputed `siteStats.json`.
 *
 * Guaranteed to never return undefined or NaN values.
 */
export default function useSiteStats() {
  const { siteConfig } = useDocusaurusContext();
  const customStats = siteConfig.customFields?.stats;

  const totalProblems =
    customStats?.totalProblems ?? siteStatsFallback?.totalProblems ?? 391;
  const totalCategories =
    customStats?.totalCategories ?? siteStatsFallback?.totalCategories ?? 16;
  const hundredDaysCount =
    customStats?.hundredDaysCount ?? siteStatsFallback?.hundredDaysCount ?? 64;
  const visualizerEnginesCount =
    customStats?.visualizerEnginesCount ??
    siteStatsFallback?.visualizerEnginesCount ??
    4;
  const videoPlaylistsCount =
    customStats?.videoPlaylistsCount ??
    siteStatsFallback?.videoPlaylistsCount ??
    4;

  const coredose =
    customStats?.coredose?.subjects
      ? customStats.coredose
      : (siteStatsFallback?.coredose || {
          activeCoursesCount: 2,
          totalTopics: 99,
          totalModules: 20,
          subjects: {
            os: { modules: 10, topics: 51 },
            dbms: { modules: 10, topics: 48 },
          },
        });

  return {
    totalProblems,
    totalCategories,
    hundredDaysCount,
    visualizerEnginesCount,
    videoPlaylistsCount,
    coredose,
  };
}
