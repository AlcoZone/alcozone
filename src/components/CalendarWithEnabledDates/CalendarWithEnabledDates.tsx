import React, { useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function parseDateString(dateStr: string): Date | null {
    const [day, month, year] = dateStr.split("/").map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
}

interface CalendarWithEnabledDatesProps {
    value: Date[] | null;
    onChange: (value: Date[] | null) => void;
    onClose: () => void;
    enabledDateStrings: string[];
}

const CalendarWithEnabledDates: React.FC<CalendarWithEnabledDatesProps> = ({
                                                                               value,
                                                                               onChange,
                                                                               onClose,
                                                                               enabledDateStrings,
                                                                           }) => {
    const enabledDates = useMemo(
        () =>
            enabledDateStrings
                .map(parseDateString)
                .filter((d): d is Date => d !== null),
        [enabledDateStrings]
    );

    const tileDisabled = ({ date }: { date: Date }) => {
        return !enabledDates.some((d) => isSameDay(d, date));
    };

    const handleChange = (value: Date | Date[] | null) => {
        if (Array.isArray(value) && value.length === 2) {
            onChange(value);
            onClose();
        } else {
            onChange(null);
        }
    };

    const firstEnabledDate = useMemo(() => {
        const dates = enabledDateStrings
            .map(parseDateString)
            .filter((d): d is Date => d !== null)
            .sort((a, b) => a.getTime() - b.getTime());
        return dates[0] ?? new Date();
    }, [enabledDateStrings]);

    return (
        <div className="flex flex-col items-center font-sans">
            <Calendar
                onChange={handleChange}
                value={value}
                tileDisabled={tileDisabled}
                selectRange={true}
                showDoubleView
                minDetail="month"
                activeStartDate={firstEnabledDate}
                className="
          border-none
          shadow-md
          rounded-lg
          p-2.5
          [&_.react-calendar__tile:disabled]:bg-gray-100
          [&_.react-calendar__tile:disabled]:text-gray-400
          [&_.react-calendar__tile:disabled]:cursor-not-allowed
          [&_.react-calendar__tile--active]:bg-blue-500
          [&_.react-calendar__tile--active]:text-white
          [&_.react-calendar__tile--active]:rounded-md
          [&_.react-calendar__tile--rangeStart]:bg-blue-600
          [&_.react-calendar__tile--rangeEnd]:bg-blue-600
          [&_.react-calendar__tile--range]:bg-blue-300
        "
            />
        </div>
    );
};

export default CalendarWithEnabledDates;
