export default class URLBuilderService {
  public static buildBrowseURL(params: URLSearchParams): string {
    let url: string = "/browse";
    let jobId: string | null = null;
    if (params.get("id")) {
      url += `?id=${params.get("id")}`;
      jobId = params.get("id");
      params.delete("id");
    }
    if (
        params.get("search") ||
        params.get("location") ||
        params.get("workTimes") ||
        params.get("workArrangements") ||
        params.get("seniorityLevels") ||
        params.get("educationLevels")
    ) {
      url += `${jobId ? "&" : "?"}${params.toString()}`;
    }
    if (jobId) {
      params.set("id", jobId);
    }
    return url;
  }

  public static buildPostedJobsURL(params: URLSearchParams): string {
    return `/posted-jobs${params.get("id") ? `?id=${params.get("id")}` : ""}`;
  }

  public static buildSavedJobsURL(params: URLSearchParams): string {
    return `/saved-jobs${params.get("id") ? `?id=${params.get("id")}` : ""}`;
  }

  public static buildReportJobURL(params: URLSearchParams, pathname: string): string {
    if (!params.get("id")) {
      throw new Error("Job entry id must exist");
    } else {
      let url: string = `${pathname}/report?id=${params.get("id")}`;
      if (
          pathname === "/browse" && (
            params.get("search") ||
            params.get("location") ||
            params.get("workTimes") ||
            params.get("workArrangements") ||
            params.get("seniorityLevels") ||
            params.get("educationLevels")
          )
      ) {
        url += `&${params.toString()}`;
      }
      return url;
    }
  }
}
