"use client"

import { OccurrenceWithAgent } from "@/app/app/reports/actions";
import { ForwardedRef, forwardRef, MutableRefObject, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import clsx from "clsx";

interface FoundAgentsInfoProps {
    occurrence: OccurrenceWithAgent,
    counts: { [ p: string ]: number },
    setActiveAgentId: (value: (((prevState: number) => number) | number)) => void,
    setActiveAgentIndex: (value: (((prevState: number) => number) | number)) => void,
    isActive: boolean,
}

const FoundAgentsInfo = forwardRef(function FountAgentInfo({
                                                               occurrence,
                                                               counts,
                                                               isActive,
                                                               setActiveAgentId,
                                                               setActiveAgentIndex
                                                           }: FoundAgentsInfoProps, ref: ForwardedRef<HTMLParagraphElement>) {

    // TODO: separate each agent into component which contains state of index of it

    const [ currentOccurIndex, setCurrentOccurIndex ] = useState<number>(0);


    return (
        <div className={clsx(isActive && "ring-2 ring-blue-400", "flex w-full items-center rounded-md px-2 py-4 group cursor-pointer")}
             style={{ backgroundColor: occurrence.color }}
             onClick={() => {
                 setActiveAgentId(occurrence.foreignAgentId);
                 setActiveAgentIndex(currentOccurIndex);
             }}>
            <p className="flex-1 text-left">{occurrence.foreignAgent.name}</p>
            <div className="w-20 text-center relative">
                <button
                    className="absolute left-0 top-1/2 -translate-y-[50%] hidden group-hover:block"
                    onClick={event => {
                        event.stopPropagation();
                        const prev = Math.max(currentOccurIndex - 1, 0);
                        setCurrentOccurIndex(prev);
                        setActiveAgentId(occurrence.foreignAgentId);
                        setActiveAgentIndex(prev);
                    }}>
                    <FaChevronLeft size={12}/>
                </button>
                {isActive && <span>{currentOccurIndex + 1} / </span>}{counts[ occurrence.foreignAgentId ]}
                <button
                    className="absolute right-0 top-1/2 -translate-y-[50%] hidden group-hover:block"
                    onClick={event => {
                        event.stopPropagation();
                        const next = (currentOccurIndex + 1) % counts[ occurrence.foreignAgentId ];
                        setCurrentOccurIndex(next);
                        setActiveAgentId(occurrence.foreignAgentId);
                        setActiveAgentIndex(next);
                    }}>
                    <FaChevronRight size={12}/>
                </button>
            </div>
        </div>
    )
});

export default FoundAgentsInfo;