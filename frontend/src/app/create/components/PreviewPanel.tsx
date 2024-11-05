import { useEffect, useState } from "react";

type PreviewPanelProps = {
  html: string;
  css: string;
};

export default function PreviewPanel(props: PreviewPanelProps) {
  const { css, html } = props;
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

  return (
    <div className="relative w-full h-full flex justify-center item-center">
      {html && (
        <iframe
          title="output"
          sandbox="allow-scripts"
          className="w-full h-full"
          srcDoc={srcDoc}
        />
      )}
    </div>
  );
}
