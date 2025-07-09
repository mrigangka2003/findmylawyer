import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLawyerStore } from "../store/useLawyerStore";

const Appointment = () => {
  const { lawyerId } = useParams();
  const lawyers = useLawyerStore((state) => state.lawyers);
  type Lawyer = typeof lawyers[number];

  const [lawyerInfo, setLawyerInfo] = useState<Lawyer | null>(null);

  const fetchLawyerInfo =()=>{
    if (lawyerId) {
      const lawyerInfo = lawyers.find((law) => law._id === lawyerId) || null;
      setLawyerInfo(lawyerInfo);
    }
  }


  useEffect(() => {
    fetchLawyerInfo();
  }, [lawyerId, lawyers]);

  return (
    <div>
      <div>
        <div>
          <img src={lawyerInfo?.image} alt="" />
        </div>
        <div>
          <p>{lawyerInfo?.name}</p>
          <p>{lawyerInfo?.degree}</p>-<p>{lawyerInfo?.speciality}</p>
          <p>{lawyerInfo?.experience}</p>
          <p>{lawyerInfo?.about}</p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
