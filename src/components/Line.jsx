// eslint-disable-next-line react/prop-types
const Line = ({ center }) => {
  return (
    <>
      <hr
        className={
          center
            ? `mt-8 w-[8rem] border-2 border-[#48A928] !important mx-auto`
            : `mt-8 w-[8rem] border-2 border-[#48A928]`
        }
      />
    </>
  );
};

export default Line;
