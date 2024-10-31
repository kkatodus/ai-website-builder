import Editor from "@monaco-editor/react";

type CodingPanelProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  language: string;
};

export default function CodingPanel(props: CodingPanelProps) {
  const { code, setCode, language } = props;
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={code}
      onChange={(value) => setCode(value ?? "")}
      width="50%"
    />
  );
}
