export default function NetworkError(props) {
  const { error } = props;
  return (
    alert(`${error}. Sorry, there was an error connecting to the network! Please check your internet connection and try again.`)
  );
}
