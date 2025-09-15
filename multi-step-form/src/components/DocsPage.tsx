import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DocsPage = ({ markdownContent }) => {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        color: "white",
      }}
    >
      <style>{`
        .markdown-body h1 { font-size: 2em; border-bottom: 1px solid #444; padding-bottom: .3em; margin-bottom: 1em; }
        .markdown-body h2 { font-size: 1.5em; border-bottom: 1px solid #444; padding-bottom: .3em; margin-bottom: 1em; }
        .markdown-body h3 { font-size: 1.25em; margin-bottom: 1em; }
        .markdown-body p { line-height: 1.6; }
        .markdown-body a { color: #8b5cf6; text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body code { background-color: #2a2a2a; padding: .2em .4em; margin: 0; font-size: 85%; border-radius: 6px; }
        .markdown-body pre { background-color: #2a2a2a; padding: 16px; overflow: auto; line-height: 1.45; border-radius: 6px; }
        .markdown-body pre code { padding: 0; margin: 0; font-size: 100%; }
        .markdown-body ul, .markdown-body ol { padding-left: 2em; }
        .markdown-body li { margin-bottom: .5em; }
        .markdown-body blockquote { padding: 0 1em; color: #999; border-left: .25em solid #444; margin-left: 0; }
        .markdown-body table { border-collapse: collapse; }
        .markdown-body th, .markdown-body td { border: 1px solid #444; padding: 6px 13px; }
      `}</style>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DocsPage;
