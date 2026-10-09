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

  // Blend subjects from runtime config and siteStatsFallback so newly created courses
  // (such as Computer Networks) appear immediately without requiring a full server restart
  const fallbackSubjects = siteStatsFallback?.coredose?.subjects || {};
  const runtimeSubjects = customStats?.coredose?.subjects || {};
  const mergedSubjects = {
    ...runtimeSubjects,
    ...fallbackSubjects,
  };

  const activeCoursesCount =
    Object.values(mergedSubjects).filter((s) => s && s.topics > 0).length ||
    siteStatsFallback?.coredose?.activeCoursesCount ||
    2;

  const totalTopics =
    Object.values(mergedSubjects).reduce((sum, s) => sum + (s?.topics || 0), 0) ||
    siteStatsFallback?.coredose?.totalTopics ||
    99;

  const totalModules =
    Object.values(mergedSubjects).reduce((sum, s) => sum + (s?.modules || 0), 0) ||
    siteStatsFallback?.coredose?.totalModules ||
    20;

  const coredose = {
    activeCoursesCount,
    totalTopics,
    totalModules,
    subjects: mergedSubjects,
  };

  return {
    totalProblems,
    totalCategories,
    hundredDaysCount,
    visualizerEnginesCount,
    videoPlaylistsCount,
    coredose,
  };
}
