import EnvironmentList from "../../components/ViewEnvironments/EnvironmentList";

const Environments = ({ popup = null }: { popup?: JSX.Element | null }) => {
  return (
    <>
      <EnvironmentList popup={popup} />
    </>
  );
};

export default Environments;
