import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Info, IndianRupee } from "lucide-react";

import { useLawyerStore } from "../store/useLawyerStore";
import { RelatedLawyers } from "../components";

const Appointment = () => {
    const { lawyerId } = useParams();
    const lawyers = useLawyerStore((state) => state.lawyers);
    type Lawyer = (typeof lawyers)[number];

    const daysOfWeek: Array<string> = [
        "SUN",
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
    ];

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

    const getAvailableSlots = async () => {
        setLawSlots([]);

        // getting current Date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            //getting date with index ;
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(20, 0, 0, 0);

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                //add slot to array

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                });

                // increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setLawSlots((prev) => [...prev, timeSlots]);
        }
    };

    useEffect(() => {
        fetchLawyerInfo();
    }, [lawyerId, lawyers]);

    useEffect(() => {
        getAvailableSlots();
    }, [lawyerInfo]);

    useEffect(() => {
        console.log(lawSlots);
    }, [lawSlots]);

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
                {/* Booking Slots */}
                <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-white">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 bg-white rounded-full"></div>
                        <p className="text-xl font-semibold tracking-tight">
                            Booking Slots
                        </p>
                    </div>

                    <div className="flex gap-4 items-center w-full overflow-x-scroll mt-4 pb-2 scrollbar-hide">
                        {lawSlots.length &&
                            lawSlots.map((item, index) => (
                                <div
                                    onClick={() => setSlotIndex(index)}
                                    className={`text-center py-5 px-4 min-w-[80px] rounded-2xl cursor-pointer transition-all duration-300 border-2 hover:scale-105 flex-shrink-0 ${
                                        slotIndex === index
                                            ? "bg-white text-black border-white shadow-lg shadow-white/10"
                                            : "border-gray-700 text-white hover:border-gray-500 bg-gray-900/30"
                                    }`}
                                    key={index}
                                >
                                    <p
                                        className={`text-xs font-medium mb-1 ${
                                            slotIndex === index
                                                ? "text-gray-600"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {item[0] &&
                                            daysOfWeek[
                                                item[0].datetime.getDay()
                                            ]}
                                    </p>
                                    <p
                                        className={`text-lg font-bold ${
                                            slotIndex === index
                                                ? "text-black"
                                                : "text-white"
                                        }`}
                                    >
                                        {item[0] && item[0].datetime.getDate()}
                                    </p>
                                </div>
                            ))}
                    </div>

                    <div className="flex items-center gap-3 w-full overflow-x-scroll mt-6 scroll-smooth pb-2 scrollbar-hide">
                        {lawSlots?.[slotIndex]?.map((item: any, index: any) => (
                            <p
                                onClick={() => setSlotTime(item.time)}
                                className={`text-sm font-medium flex-shrink-0 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 border-2 hover:scale-105 ${
                                    item.time === slotTime
                                        ? "bg-white text-black border-white shadow-lg shadow-white/10"
                                        : "text-gray-300 border-gray-700 hover:border-gray-500 bg-gray-900/30 hover:text-white"
                                }`}
                                key={index}
                            >
                                {item.time.toLowerCase()}
                            </p>
                        ))}
                    </div>
                    <button className="bg-white text-black font-semibold px-8 py-4 rounded-xl border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-white/10 tracking-tight mt-8">
                        Book an Appointment
                    </button>
                </div>

                {/* Related Lawyers */}

                {lawyerId && lawyerInfo?.speciality && (
                    <RelatedLawyers
                        lawyerId={lawyerId}
                        speciality={lawyerInfo.speciality}
                    />
                )}
            </div>
        )
    );
};

export default Appointment;
