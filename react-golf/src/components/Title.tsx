import "../styles/title.scss";

function getModifiedText(text: string) {
  // Replace <outline> tags with <span> and </span> tags with </span>
  const modifiedText = text
    .replace(/<outline>/g, '<span class="title-outlined">')
    .replace(/<\/outline>/g, "</span>");

  // Replace <modified> tags with <span> and </modified> tags with </span>
  const finalText = modifiedText
    .replace(/<modified>/g, '<span class="title-outlined">')
    .replace(/<\/modified>/g, "</span>");

  return finalText;
}

interface TitleProps {
  text: string;
}
function Title({ text }: TitleProps) {
  const modifiedText = getModifiedText(text);

  return (
    <h1 className="title" dangerouslySetInnerHTML={{ __html: modifiedText }} />
  );
}

export default Title;
