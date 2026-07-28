/**
 * Utility helper to format bracketed text and handle spec annotations toggle
 */

export function fmtText(text: string, showAnnotations: boolean): string {
  if (showAnnotations) return text;
  
  if (text.startsWith("[") && text.endsWith("]")) {
    const inner = text.slice(1, -1).trim();
    // Special cases
    if (inner === "!") return "!";
    if (inner === "L1") return "SPA";
    if (inner === "PORTAL_NAV") return "Portal Navigation";
    
    // Replace underscores with spaces
    const withSpaces = inner.replace(/_/g, " ");
    // Convert ALL_CAPS or UPPERCASE words to Capital Case
    return withSpaces
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  return text;
}
