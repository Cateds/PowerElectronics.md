import { type ArticleData } from "./build-html";

function normalizePath(p: string): string {
  return p.replace(/\/+$/, "").replace(/\.html(#|$)/, "$1") || "/";
}

export function rewriteInternalLinks(
  articles: ArticleData[],
  pathPrefix: string,
): ArticleData[] {
  const pathToIndex = new Map<string, number>();
  for (let i = 0; i < articles.length; i++) {
    const p = normalizePath(articles[i].path);
    const pNoLead = p.replace(/^\//, "");
    pathToIndex.set(p, i);
    pathToIndex.set(p + "/", i);
    pathToIndex.set(pathPrefix + pNoLead, i);
    pathToIndex.set(pathPrefix + pNoLead + "/", i);
    pathToIndex.set(pathPrefix + pNoLead + ".html", i);
  }

  for (let i = 0; i < articles.length; i++) {
    let content = articles[i].content;

    content = content.replace(
      /<(h[1-6])\b([^>]*?)\sid="([^"]*)"/gi,
      (_m, tag: string, before: string, id: string) =>
        `<${tag}${before} id="page-${i}--${id}"`,
    );

    content = content.replace(
      /\shref="([^"]*)"/gi,
      (_m, rawHref: string) => {
        const newHref = resolveHref(rawHref, pathPrefix, pathToIndex, i);
        return ` href="${newHref}"`;
      },
    );

    articles[i].content = content;
  }
  return articles;
}

function resolveHref(
  rawHref: string,
  pathPrefix: string,
  pathToIndex: Map<string, number>,
  currentArticleIndex: number,
): string {
  if (
    rawHref.startsWith("http://") ||
    rawHref.startsWith("https://")
  ) {
    const url = new URL(rawHref);
    if (url.hostname === "localhost") {
      rawHref = url.pathname + url.search + url.hash;
    } else {
      return rawHref;
    }
  }
  if (
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("data:") ||
    rawHref.startsWith("#") &&
    !rawHref.startsWith("#page-")
  ) {
    if (rawHref.startsWith("#")) {
      return `#page-${currentArticleIndex}--${rawHref.slice(1)}`;
    }
    return rawHref;
  }

  if (
    /\.(css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|eot|ico|pdf|zip)$/i.test(rawHref)
  ) {
    return rawHref;
  }

  let cleanHref = rawHref;
  if (cleanHref.startsWith(pathPrefix)) {
    cleanHref = cleanHref.slice(pathPrefix.length);
  }
  cleanHref = cleanHref.replace(/^\.\//, "");
  if (!cleanHref.startsWith("/")) {
    cleanHref = "/" + cleanHref;
  }
  cleanHref = normalizePath(cleanHref);

  const fragmentMatch = cleanHref.match(/^([^#]*)#(.*)$/);
  const basePath = fragmentMatch ? fragmentMatch[1] : cleanHref;
  const fragment = fragmentMatch ? fragmentMatch[2] : "";

  const pageIndex = pathToIndex.get(basePath) ?? pathToIndex.get(basePath + "/");
  if (pageIndex !== undefined) {
    if (fragment) {
      return `#page-${pageIndex}--${fragment}`;
    }
    return `#page-${pageIndex}`;
  }

  return rawHref;
}