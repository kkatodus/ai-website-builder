import parse from "html-react-parser";

type PreviewPanelProps = {
  html: string;
  css: string;
};

export default function PreviewPanel(props: PreviewPanelProps) {
  const { css, html } = props;
  const reactified = parse(html);
  return (
    <div className={"h-full w-full flex items-center justify-center"}>
      {reactified}
    </div>
  );
}
