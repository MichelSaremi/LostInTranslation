
function TranslationList(props) {
  
  const {index,line} = props
  
  return (
    <div>{index+"."} - {line}</div>
  );
}

export default TranslationList;