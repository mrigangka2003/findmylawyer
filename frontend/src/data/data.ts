import lawyer1 from "./images/lawyer1.jpeg";
import GenLawyer from "./images/lawyer_image_1.jpeg";

type Speciality = {
    specialityName: string;
};

type Lawyer = {
    _id: string;
    name: string;
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    fees: number;
    address: {
        line1: string;
        line2: string;
    };
};

const specialityData: Speciality[] = [
    {
        specialityName: "Criminal Law",
    },
    {
        specialityName: "Family Law",
    },
    {
        specialityName: "Property Law",
    },
    {
        specialityName: "Divorce Law",
    },
    {
        specialityName: "Consumer Law",
    },
    {
        specialityName: "Cyber Crime",
    },
];

const lawyers: Lawyer[] = [
    {
        _id: "lawyer1",
        name: "Adv. Samarjyoti Majumder",
        image: lawyer1,
        speciality: "Criminal Law",
        degree: "BALLB",
        experience: "2 years",
        about: "Mr. Samarjyoti is a dynamic young legal mind with unmatched experience in handling diverse client needs with precision and professionalism.",
        fees: 20,
        address: { line1: "Kolkata", line2: "Tripura" },
    },
    {
        _id: "lawyer2",
        name: "Adv. Priya Sinha",
        image: GenLawyer,
        speciality: "Corporate Law",
        degree: "LLM",
        experience: "3 years",
        about: "Priya specializes in corporate compliance and contract law with a track record of helping startups scale legally.",
        fees: 30,
        address: { line1: "Mumbai", line2: "Maharashtra" },
    },
    {
        _id: "lawyer3",
        name: "Adv. Rahul Sharma",
        image: GenLawyer,
        speciality: "Family Law",
        degree: "BALLB",
        experience: "5 years",
        about: "Rahul is known for his empathetic yet strategic approach to family law cases, ensuring client satisfaction.",
        fees: 25,
        address: { line1: "Delhi", line2: "New Delhi" },
    },
    {
        _id: "lawyer4",
        name: "Adv. Neha Verma",
        image: GenLawyer,
        speciality: "Intellectual Property",
        degree: "LLB",
        experience: "4 years",
        about: "Neha provides expert legal guidance in trademarks, patents, and copyright registration.",
        fees: 35,
        address: { line1: "Bengaluru", line2: "Karnataka" },
    },
    {
        _id: "lawyer5",
        name: "Adv. Arjun Iyer",
        image: GenLawyer,
        speciality: "Civil Litigation",
        degree: "BALLB",
        experience: "6 years",
        about: "Arjun has extensive courtroom experience, having handled numerous high-stakes civil disputes.",
        fees: 40,
        address: { line1: "Chennai", line2: "Tamil Nadu" },
    },
    {
        _id: "lawyer6",
        name: "Adv. Riya Dutta",
        image: GenLawyer,
        speciality: "Environmental Law",
        degree: "LLM",
        experience: "3 years",
        about: "Riya is a passionate advocate for sustainability, representing NGOs and public interest cases.",
        fees: 22,
        address: { line1: "Kolkata", line2: "West Bengal" },
    },
    {
        _id: "lawyer7",
        name: "Adv. Manav Khurana",
        image: GenLawyer,
        speciality: "Tax Law",
        degree: "LLB",
        experience: "4 years",
        about: "Manav simplifies complex tax regulations for clients, ensuring compliance and peace of mind.",
        fees: 28,
        address: { line1: "Ahmedabad", line2: "Gujarat" },
    },
    {
        _id: "lawyer8",
        name: "Adv. Sneha Nair",
        image: GenLawyer,
        speciality: "Cyber Law",
        degree: "BALLB",
        experience: "2 years",
        about: "Sneha is a tech-savvy legal expert helping clients navigate digital legal issues and cyber crimes.",
        fees: 18,
        address: { line1: "Pune", line2: "Maharashtra" },
    },
    {
        _id: "lawyer9",
        name: "Adv. Vikram Raj",
        image: GenLawyer,
        speciality: "Real Estate Law",
        degree: "LLB",
        experience: "5 years",
        about: "Vikram handles land disputes, title verification, and builder litigation with deep expertise.",
        fees: 32,
        address: { line1: "Hyderabad", line2: "Telangana" },
    },
    {
        _id: "lawyer10",
        name: "Adv. Anjali Mukherjee",
        image: GenLawyer,
        speciality: "Constitutional Law",
        degree: "LLM",
        experience: "7 years",
        about: "Anjali has a deep understanding of constitutional rights and represents PILs in High Court.",
        fees: 45,
        address: { line1: "Bhopal", line2: "Madhya Pradesh" },
    },
];

export { 
    specialityData,
    lawyers 
};
