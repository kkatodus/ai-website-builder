import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";

type PreviewPanelProps = {
  html: string;
  css: string;
};

export default function PreviewPanel(props: PreviewPanelProps) {
  const { css, html } = props;
  const sanitized = sanitizeHtml(html);
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
		  <html>
			<body>${html}</body>
			<style>${css}</style>
		  </html>
		`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css]);

  console.log("sanitized", sanitized);
  console.log(css);
  console.log("type of css", typeof css);
  console.log("type of html", typeof html);
  return (
    <div className="relative w-full h-full flex justify-center item-center">
      <iframe
        title="output"
        sandbox="allow-scripts"
        className="w-full h-full"
        srcDoc={srcDoc}
      />
    </div>
  );
}
