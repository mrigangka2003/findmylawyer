import {create} from 'zustand';


import { lawyers as initialLawyers } from '../data/data'; 

type Lawyer = typeof initialLawyers[number];

type LawyerStore = {
    lawyers:Lawyer[];
}

export const useLawyerStore = create<LawyerStore>(()=>(
    {
        lawyers:initialLawyers
    }
))