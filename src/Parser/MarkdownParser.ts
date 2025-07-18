export class MarkdownParser {

    /**
     * Parsed the incoming text
     * @param markdown as string with all content
     * @returns a string with the parsed lines
     */
    static parse(markdown: string): string {
        const lines = markdown.split("\n");
        const htmlLines = lines.map(line => {
            // Headlines
            if (/^#{1,6} /.test(line)) {
                const level = line.match(/^#+/)![0].length;
                const content = line.slice(level + 1);
                return `<h${level}>${content}</h${level}>`;
            }

            // Bold
            line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

            // Italic
            line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");
            line = line.replace(/_(.+?)_/g, "<em>$1</em>");

            // Inline code
            line = line.replace(/`(.+?)`/g, "<code>$1</code>");

            // Blockquote
            if (/^> /.test(line)) {
                return `<blockquote>${line.replace(/^> /, "")}</blockquote>`;
            }

            // Unordered List
            if (/^[-*] /.test(line)) {
                return `<ul><li>${line.replace(/^[-*] /, "")}</li></ul>`;
            }

            // Paragraph
            if (line.trim() !== "") {
                return `<p>${line}</p>`;
            }

            return "";
        });

        // Merge adjacent <ul>...<ul> into one
        const merged = htmlLines.join("\n")
            .replace(/<\/ul>\s*<ul>/g, "")
            .replace(/<\/blockquote>\s*<blockquote>/g, "<br>");

        return merged;
    }
}
