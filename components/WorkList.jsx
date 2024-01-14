import "@styles/WorkList.scss";
import WorkCard from "./WorkCard";

const WorkList = ({ data }) => {
  return (
    <div className="work-list">
      {data.map((work) => {
        return <WorkCard key={work._id} work={work} />;
      })}
    </div>
  );
};

export default WorkList;
