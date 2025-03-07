import PuffLoader from "react-spinners/PuffLoader";

const Loader = () => {
  return (
    <PuffLoader
      loading={true}
      size={150}
      color="#7e22ce"
      aria-label="Loading"
    />
  );
};

export default Loader;