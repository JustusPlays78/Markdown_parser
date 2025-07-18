import sanitizeHtml from "sanitize-html";

export interface MarkdownParserOptions {
    sanitize?: boolean;
    breaks?: boolean;
    gfm?: boolean;
    headerIds?: boolean;
    mangle?: boolean;
    sanitizeOptions?: sanitizeHtml.IOptions;
}