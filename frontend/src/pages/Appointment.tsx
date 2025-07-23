import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Info, IndianRupee } from "lucide-react";

import { useLawyerStore } from "../store/useLawyerStore";

const Appointment = () => {
    const { lawyerId } = useParams();
    const lawyers = useLawyerStore((state) => state.lawyers);
    type Lawyer = (typeof lawyers)[number];

    const [lawyerInfo, setLawyerInfo] = useState<Lawyer | null>(null);
    const [lawSlots, setLawSlots] = useState<Array<any>>([]);
    const [slotIndex, setSlotIndex] = useState<number>(0);
    const [slotTime, setSlotTime] = useState<string>("");

    const fetchLawyerInfo = () => {
        if (lawyerId) {
            const lawyerInfo =
                lawyers.find((law) => law._id === lawyerId) || null;
            setLawyerInfo(lawyerInfo);
        }
    };

    const getAvailableSlots = async() => {
      setLawSlots([]);

      //getting current data
      let today = new Date();
      
      for(let i = 0 ; i<7 ; i++){
        let  currentDate = new Date(today);
        currentDate.setDate(today.getDate()+i);
        

        //setting end time of the date with index
        let endTime = new Date();
        endTime.setDate(today.getDate()+1);
        endTime.setHours(21,0,0,0);

        //settig hours

        if(today.getDate()===currentDate.getDate()){

        }
      }
    };

    useEffect(() => {
        fetchLawyerInfo();
    }, [lawyerId, lawyers]);

    useEffect(() => {
        getAvailableSlots();
    }, [lawyerInfo]);


    return (
        lawyerInfo && (
            <div className="px-4 sm:px-10 py-10 bg-black min-h-screen text-white">
                <div className="flex flex-col sm:flex-row gap-6 max-w-6xl mx-auto">
                    {/* Lawyer Image */}
                    <div className="w-full sm:max-w-xs">
                        <img
                            className="w-full rounded-xl shadow-lg border border-zinc-700"
                            src={lawyerInfo.image}
                            alt={lawyerInfo.name}
                        />
                    </div>

                    {/* Lawyer Info Card */}
                    <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-6 sm:p-8 shadow-md">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
                            {lawyerInfo.name}
                        </h2>

                        <p className="text-zinc-300 text-lg mb-4">
                            <span className="font-medium text-white">
                                {lawyerInfo.degree}
                            </span>{" "}
                            &middot; {lawyerInfo.speciality}
                        </p>

                        <div className="mb-6">
                            <span className="inline-block bg-green-600 text-white text-sm px-4 py-1.5 rounded-full">
                                {lawyerInfo.experience} Years Experience
                            </span>
                        </div>

                        {/* About Section */}
                        <div className="mt-6">
                            <div className="flex items-center gap-2 text-lg font-medium text-white mb-2">
                                <Info className="w-5 h-5 text-blue-500" />
                                About
                            </div>
                            <p className="text-zinc-400 leading-relaxed">
                                {lawyerInfo.about}
                            </p>
                        </div>
                        <p className="flex mt-4">
                            Appointment fee:{" "}
                            <span className="flex">
                                <IndianRupee className="h-5" />
                                {lawyerInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        )
    );
};

export default Appointment;
