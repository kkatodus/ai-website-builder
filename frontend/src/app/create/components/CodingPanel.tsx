import Editor from "@monaco-editor/react";

type CodingPanelProps = {
  code: string;
  setCode: (code: string) => void;
  language: string;
};

export default function CodingPanel(props: CodingPanelProps) {
  const { code, setCode, language } = props;
  if (language === "html") {
    return (
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        width="50%"
      />
    );
  } else {
    return (
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code}
        onChange={(value) => setCode(value || "")}
        width="50%"
      />
    );
  }
}
